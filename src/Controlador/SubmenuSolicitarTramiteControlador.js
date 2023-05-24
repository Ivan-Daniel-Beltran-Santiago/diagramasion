import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import ConfigurarConexion from "./ConfigurarConexion";
import SubmenuSolicitarTramite from "../Vista/SubmenuSolicitarTramite";

const SubmenuSolicitarTramiteControlador = ({
  SubmenuSolicitarTramiteControladorUsuarioActivo,
}) => {
  //Variables de estado.
  const [listaTramites, setListaTramites] = useState([]);
  const [listaTramitesInformacion, setListaTramitesInformacion] = useState([
    [],
  ]);
  const [listaTramitesRequisitos, setListaTramitesRequisitos] = useState([[]]);
  const [tramiteVisible, setTramiteVisible] = useState(false);

  //Alertas.
  const toast = useRef(null);

  const showToast = (severityValue, summaryValue, detailValue) => {
    toast.current.show({
      closable: false,
      life: 5000,
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  };

  const obtenerListaTramites = useCallback(async () => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/tramites/lista";

    const ListaTramites = await axios.get(funcion);
    if (ListaTramites.data.length > 0) {
      setListaTramites(ListaTramites.data);
    }
  }, []);

  const prepararListaTramitesMetadata = useCallback(() => {
    const listaTramiteInformacionTemp = [];
    const listaTramiteRequisitosTemp = [];

    const listaTramitesInformacionTemp = [];
    const listaTramitesRequisitosTemp = [];

    for (var indice = 0; indice < listaTramites.length; indice++) {
      for (
        var metadataIndice = 0;
        metadataIndice < listaTramites[indice].Tramite_Ms.length;
        metadataIndice++
      ) {
        listaTramites[indice].Tramite_Ms[metadataIndice].tipo === 0
          ? listaTramiteInformacionTemp.push(
              listaTramites[indice].Tramite_Ms[metadataIndice]
            )
          : listaTramiteRequisitosTemp.push(
              listaTramites[indice].Tramite_Ms[metadataIndice]
            );
      }

      listaTramitesInformacionTemp.push(listaTramiteInformacionTemp);
      listaTramitesRequisitosTemp.push(listaTramiteRequisitosTemp);
    }

    setListaTramitesInformacion(listaTramitesInformacionTemp);
    setListaTramitesRequisitos(listaTramitesRequisitosTemp);
  }, [listaTramites]);

  const handleSolicitarTramite = async (idTramite) => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/solicitudes/consulta";

    const solicitudesUsuario = await axios.get(funcion, {
      params: {
        matricula: SubmenuSolicitarTramiteControladorUsuarioActivo.matricula,
      },
    });

    switch (solicitudesUsuario.status) {
      case 200:
        if (solicitudesUsuario.data.length === 0) {
          showToast(
            "info",
            "Solicitud",
            "Se esta procesando su solicitud, espere un momento."
          );
          setTimeout(() => {
            empezarSolicitud(idTramite);
          }, 100);
        } else {
          for (
            var indice = 0;
            indice < solicitudesUsuario.data.length;
            indice++
          ) {
            if (solicitudesUsuario.data[indice].estatus_Actual === 12) {
              var ahora = new Date();
              var año_cliente = ahora.toISOString().getFullYear();
              var año_solicitud = new Date(
                solicitudesUsuario.data[indice].fecha_Actualizacion
              ).getFullYear();
              if (año_cliente - año_solicitud >= 1) {
                showToast(
                  "info",
                  "Solicitud",
                  "Se esta procesando su solicitud, espere un momento."
                );
                setTimeout(() => {
                  empezarSolicitud(idTramite);
                }, 100);
              } else {
                showToast(
                  "error",
                  "Solicitud",
                  "Por politicas de la aseguradora, no puede iniciar una nueva solicitud si ya termino una el mismo año."
                );
                setTimeout(() => {
                  showToast(
                    "error",
                    "Solicitud",
                    "Si lo cree necesario, favor de acudir presencialmente a Servicios Escolares."
                  );
                }, 100);
                break;
              }
            } else {
              showToast(
                "error",
                "Solicitud",
                "Usted ya tiene una solicitud en progreso, si cree que es necesario una segunda solicitud, presentese con Servicios Escolares."
              );
              break;
            }
          }
        }
        break;
      default:
        showToast(
          "error",
          "Error de servidor",
          "Contacte con el administrador del sistema"
        );
        break;
    }
  };

  const empezarSolicitud = async (idTramite) => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/solicitudes/nueva";

    const nuevaSolicitud = await axios.post(funcion, {
      matricula: SubmenuSolicitarTramiteControladorUsuarioActivo.matricula,
      Tramite: { id_Tramite: idTramite },
    });

    if (nuevaSolicitud.status === 200) {
      showToast(
        "success",
        "Solicitud creada.",
        "Ha iniciado su solicitud con exito, en un momento recibira un correo electronico con mas detalles."
      );
      setTimeout(() => {
        enviarRequisitos();
      }, 100);
    } else {
      showToast(
        "error",
        "Error de servidor",
        "Contacte con el administrador del sistema"
      );
    }
  };

  const enviarRequisitos = async () => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/solicitudes/correo";

    const correoEnviado = await axios.get(funcion, {
      params:{matricula: SubmenuSolicitarTramiteControladorUsuarioActivo.matricula,}
    });

    if (correoEnviado.status === 200) {
      showToast(
        "success",
        "Correo enviado.",
        "Se le ha enviado un correo electronico con los detalles de su solicitud a : " +
          SubmenuSolicitarTramiteControladorUsuarioActivo.correo_e +
          "."
      );
    } else {
      showToast(
        "error",
        "Correo no enviado.",
        "No se ha podido enviar el correo con los detalles de la solicitud a : " +
          SubmenuSolicitarTramiteControladorUsuarioActivo.correo_e +
          ". Intente mas tarde."
      );
    }
  };

  useEffect(() => {
    obtenerListaTramites();
  }, []);

  useEffect(() => {
    prepararListaTramitesMetadata();
  }, [prepararListaTramitesMetadata]);

  return (
    <SubmenuSolicitarTramite
      SubmenuSolicitarTramiteListaTramites={listaTramites}
      SubmenuSolicitarTramiteListaTramitesInformacion={listaTramitesInformacion}
      SubmenuSolicitarTramiteListaTramitesRequisitos={listaTramitesRequisitos}
      SubmenuSolicitarTramiteTramiteVisible={tramiteVisible}
      SubmenuSolicitarTramiteSetTramiteVisible={setTramiteVisible}
      SubmenuSolicitarTramiteSolicitar={handleSolicitarTramite}
      SubmenuSolicitarTramiteTostado={toast}
    />
  );
};

export default SubmenuSolicitarTramiteControlador;
