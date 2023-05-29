import { useCallback, useRef, useState } from "react";
import axios from "axios";
import ConfigurarConexion from "./ConfigurarConexion";
import SubmenuAdministrarSolicitud from "../Vista/SubmenuAdministrarSolicitud";

const SubmenuAdministrarSolicitudControlador = ({
  SubmenuAdministrarSolicitudControladorSolicitudSeleccionada,
  SubmenuAdministrarSolicitudControladorObtenerSolicitudEspecifica,
}) => {
  //Variables de estado
  const [progresoEstatus, setProgresoEstatus] = useState({
    1: 0,
    2: 20,
    3: 15,
    4: 40,
    5: 50,
    6: 75,
    7: 55,
    8: 65,
    9: 55,
    10: 75,
    11: 80,
    12: 100,
  });
  const [estatusLexico, setEstatusLexico] = useState({
    1: "Solicitud iniciado",
    2: "Documentos subidos en formato digital",
    3: "Documentos rechazados en formato digital",
    4: "Documentos aceptados en formato digital",
    5: "Documentos recibidos en persona",
    6: "Solicitud enviada a la aseguradora por FEDEX",
    7: "Solicitud rechazada por la aseguradora",
    8: "Nuevos documentos recibidos en formato digital",
    9: "Nuevos documentos rechazados",
    10: "Solicitud reenviada a la aseguradora por FEDEX",
    11: "Finiquito en espera de firma en persona",
    12: "Solicitud terminado",
  });
  const [estatusRetroalimentacion, setEstatusRetroalimentacion] = useState({
    1: " ",
    2: " ",
    3: " ",
    4: " ",
    5: " ",
    6: " ",
    7: " ",
    8: " ",
    9: " ",
    10: " ",
    11: " ",
    12: " ",
  });

  //Alertas
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

  const obtenerDescripciones = useCallback(async () => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/tramites/descripciones";

    const descripciones = await axios.get(funcion);

    if (descripciones.status === 200) {
      setEstatusLexico({
        1: descripciones.data[0].texto,
        2: descripciones.data[1].texto,
        3: descripciones.data[2].texto,
        4: descripciones.data[3].texto,
        5: descripciones.data[4].texto,
        6: descripciones.data[5].texto,
        7: descripciones.data[6].texto,
        8: descripciones.data[7].texto,
        9: descripciones.data[8].texto,
        10: descripciones.data[9].texto,
        11: descripciones.data[10].texto,
        12: descripciones.data[11].texto,
      });
      setProgresoEstatus({
        1: descripciones.data[0].barraEstatus,
        2: descripciones.data[1].barraEstatus,
        3: descripciones.data[2].barraEstatus,
        4: descripciones.data[3].barraEstatus,
        5: descripciones.data[4].barraEstatus,
        6: descripciones.data[5].barraEstatus,
        7: descripciones.data[6].barraEstatus,
        8: descripciones.data[7].barraEstatus,
        9: descripciones.data[8].barraEstatus,
        10: descripciones.data[9].barraEstatus,
        11: descripciones.data[10].barraEstatus,
        12: descripciones.data[11].barraEstatus,
      });
      setEstatusRetroalimentacion({
        1: descripciones.data[0].retroalimentaciones,
        2: descripciones.data[1].retroalimentaciones,
        3: descripciones.data[2].retroalimentaciones,
        4: descripciones.data[3].retroalimentaciones,
        5: descripciones.data[4].retroalimentaciones,
        6: descripciones.data[5].retroalimentaciones,
        7: descripciones.data[6].retroalimentaciones,
        8: descripciones.data[7].retroalimentaciones,
        9: descripciones.data[8].retroalimentaciones,
        10: descripciones.data[9].retroalimentaciones,
        11: descripciones.data[10].retroalimentaciones,
        12: descripciones.data[11].retroalimentaciones,
      });
    }
  }, []);

  const obtenerDocumentoSolicitud = async (IDDocumento, NombreDocumento) => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/solicitudes/descarga";

    try {
      const documentoDescargar = await axios({
        url: funcion,
        method: "GET",
        responseType: "blob",
        params: { id_Documento: IDDocumento },
      });

      if (documentoDescargar.status === 200) {
        const href = URL.createObjectURL(documentoDescargar.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", NombreDocumento);
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(href);
        document.body.removeChild(link);
      } else {
        showToast(
          "error",
          "Descarga de documento",
          "Error al descargar el documento seleccionado, contacte al administrador."
        );
      }
    } catch (error) {
      showToast(
        "error",
        "Descarga de documento",
        "Error al descargar el documento seleccionado, contacte al administrador."
      );
    }
  };

  const solicitarSeguimiento = async (ID_Solicitud) => {
    if (ID_Solicitud) {
      const servidor = new ConfigurarConexion();
      const funcion = servidor.obtenerServidor() + "/solicitudes/seguimiento";

      const seguimientoEnviado = await axios.get(funcion, {
        params: {
          id_Solicitud: ID_Solicitud,
        },
      });

      if (seguimientoEnviado.status === 200) {
        showToast(
          "success",
          "Solicitud de seguimiento",
          "Solicitud de seguimiento enviada a la aseguradora."
        );
      } else {
        showToast(
          "error",
          "Solicitud de seguimiento",
          "No fue posible solicitar seguimiento, contacte al administrador."
        );
      }
    } else {
      showToast(
        "warn",
        "Solicitud de seguimiento",
        "Esta solicitud aun no tiene un folio asignado, por lo que no podemos solicitar seguimiento a la aseguradora."
      );
    }
  };

  const actualizarSolicitud = async (
    ID_Solicitud,
    NuevoEstatus,
    RetroalimentacionActual,
    FolioSolicitud
  ) => {
    try {
      const servidor = new ConfigurarConexion();
      const funcion = servidor.obtenerServidor() + "/solicitudes/actualizar";

      const solicitudActualizada = await axios.put(funcion, {
        id_Solicitud: ID_Solicitud,
        estatus_Actual: NuevoEstatus,
        retroalimentacion_Actual: RetroalimentacionActual,
        folio_Solicitud: FolioSolicitud,
      });

      switch (solicitudActualizada.status) {
        case 200:
          showToast("success", "Solicitud", "Solicitud actualizada con exito");
          SubmenuAdministrarSolicitudControladorObtenerSolicitudEspecifica(
            ID_Solicitud,
            false
          );
          break;
        case 400:
          showToast(
            "error",
            "Solicitud",
            "No fue posible actualizar la solicitud, contacte al administrador"
          );
          break;
        case 404:
          showToast(
            "error",
            "Solicitud",
            "Solicitud no encontrada, intentelo mas tarde."
          );
          break;
        default:
          showToast(
            "error",
            "Servidor",
            "Error de servidor, contacte al administrador"
          );
          break;
      }
    } catch (error) {
      switch (error.response.status) {
        case 400:
          showToast(
            "error",
            "Solicitud",
            "No fue posible actualizar la solicitud, contacte al administrador"
          );
          break;
        case 404:
          showToast(
            "error",
            "Solicitud",
            "Solicitud no encontrada, intentelo mas tarde."
          );
          break;
        default:
          showToast(
            "error",
            "Servidor",
            "Error de servidor, contacte al administrador"
          );
          break;
      }
    }
  };

  return (
    <SubmenuAdministrarSolicitud
      SubmenuAdministrarSolicitudTostado={toast}
      SubmenuAdministrarSolicitudSolicitudSeleccionada={
        SubmenuAdministrarSolicitudControladorSolicitudSeleccionada
      }
      SubmenuAdministrarSolicitudProgresoEstatus={progresoEstatus}
      SubmenuAdministrarSolicitudEstatusLexico={estatusLexico}
      SubmenuAdministrarSolicitudObtenerDescripciones={obtenerDescripciones}
      SubmenuAdministrarSolicitudObtenerDocumentoSolicitud={
        obtenerDocumentoSolicitud
      }
      SubmenuAdministrarSolicitudSolicitarSeguimiento={solicitarSeguimiento}
      SubmenuAdministrarSolicitudActualizarSolicitud={actualizarSolicitud}
      SubmenuAdministrarSolicitudEstatusRetroalimentacion={
        estatusRetroalimentacion
      }
    />
  );
};

export default SubmenuAdministrarSolicitudControlador;
