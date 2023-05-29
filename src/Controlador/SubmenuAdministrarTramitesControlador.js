import { useCallback, useRef, useState } from "react";
import axios from "axios";
import ConfigurarConexion from "./ConfigurarConexion";
import SubmenuAdministrarTramites from "../Vista/SubmenuAdministrarTramites";

const SubmenuAdministrarTramitesControlador = () => {
  //Variables de estado
  const [listaTramites, setListaTramites] = useState([]);
  const [listaMetadataTramite, setListaMetadataTramite] = useState([]);
  const [campoMetadataVacio, setCampoMetadataVacio] = useState(true);

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

  //Obtener la lista de todos los tramites que existen en el sistema.
  const obtenerListaTramites = useCallback(async () => {
    try {
      const servidor = new ConfigurarConexion();
      const funcion = servidor.obtenerServidor() + "/tramites/lista";

      const obtenerLista = await axios.get(funcion);

      switch (obtenerLista.status) {
        case 200:
          setListaTramites(obtenerLista.data);
          break;
        case 404:
          showToast(
            "error",
            "Tramites",
            "No fue posible obtener la informacion del trámite, contacte con el administrador"
          );
          break;
        default:
          showToast(
            "error",
            "Servidor",
            "Error de servidor, contacte con el administrador"
          );
          break;
      }
    } catch (error) {
      switch (error.response.status) {
        case 404:
          showToast(
            "error",
            "Tramites",
            "No fue posible obtener la informacion del trámite, contacte con el administrador"
          );
          break;
        default:
          showToast(
            "error",
            "Servidor",
            "Error de servidor, contacte con el administrador"
          );
          break;
      }
    }
  }, []);

  //Cargar la lista de toda la metadata del trámite seleccionado en una lista.
  const obtenerListaMetadata = async (ID_Tramite) => {
    if (
      ID_Tramite !== "" &&
      ID_Tramite !== "Seleccionar" &&
      ID_Tramite !== "Fallo"
    ) {
      try {
        const servidor = new ConfigurarConexion();
        const funcion = servidor.obtenerServidor() + "/tramites/consulta";

        const metadataTramite = await axios.get(funcion, {
          params: { id_Tramite: Number(ID_Tramite) },
        });

        switch (metadataTramite.status) {
          case 200:
            setListaMetadataTramite(metadataTramite.data.Tramite_Ms);
            break;
          case 404:
            showToast(
              "error",
              "Metadata",
              "No fue posible obtener la informacion de la metadata del trámite, contacte con el administrador"
            );
            break;
          default:
            showToast(
              "error",
              "Servidor",
              "Error de servidor, contacte con el administrador"
            );
            break;
        }
      } catch (error) {
        switch (error.response.status) {
          case 404:
            showToast(
              "error",
              "Metadata",
              "No fue posible obtener la informacion de la metadata del trámite, contacte con el administrador"
            );
            break;
          default:
            showToast(
              "error",
              "Servidor",
              "Error de servidor, contacte con el administrador"
            );
            break;
        }
        setListaMetadataTramite([]);
      }
    } else {
      setListaMetadataTramite([]);
    }
  };

  const obtenerMetadata = (ID_Tramite_Ms) => {
    if (
      ID_Tramite_Ms !== "" &&
      ID_Tramite_Ms !== "Seleccionar" &&
      ID_Tramite_Ms !== "Fallo"
    ) {
      document.getElementById("contenidoMetadata").value =
        listaMetadataTramite[(ID_Tramite_Ms-1)].texto;
      setCampoMetadataVacio(false);
    } else {
      document.getElementById("contenidoMetadata").value = "";
      setCampoMetadataVacio(true);
    }
  };

  const actualizarMetadata = async (ID_Tramite_Ms) => {
    try {
      const servidor = new ConfigurarConexion();
      const funcion = servidor.obtenerServidor() + "/tramites/actualizar";

      const actualizarMetadataTramite = await axios.post(funcion, {
        Tramite_M: {
          id_Tramite_M: ID_Tramite_Ms,
          texto: document.getElementById("contenidoMetadata").value,
        },
      });

      switch (actualizarMetadataTramite.status) {
        case 200:
          showToast("success", "Metadata", "Datos actualizados");
          document.getElementById("seleccionTramites").selectedIndex = 0;
          document.getElementById("seleccionMetadata").selectedIndex = 0;
          document.getElementById("contenidoMetadata").value = "";
          setListaMetadataTramite([]);
          break;
        case 400:
          showToast(
            "error",
            "Metadata",
            "No fue posible actualizar la informacion de la metadata del trámite, contacte con el administrador"
          );
          break;
        case 404:
          showToast(
            "error",
            "Metadata",
            "No fue posible obtener la informacion de la metadata del trámite, contacte con el administrador"
          );
          break;
        default:
          showToast(
            "error",
            "Servidor",
            "Error de servidor, contacte con el administrador"
          );
          break;
      }
    } catch (error) {
      switch (error.response.status) {
        case 400:
          showToast(
            "error",
            "Metadata",
            "No fue posible actualizar la informacion de la metadata del trámite, contacte con el administrador"
          );
          break;
        case 404:
          showToast(
            "error",
            "Metadata",
            "No fue posible obtener la informacion de la metadata del trámite, contacte con el administrador"
          );
          break;
        default:
          showToast(
            "error",
            "Servidor",
            "Error de servidor, contacte con el administrador"
          );
          break;
      }
    }
  };

  return (
    <SubmenuAdministrarTramites
      SubmenuAdministrarTramitesTostado={toast}
      SubmenuAdministrarTramitesObtenerListaTramites={obtenerListaTramites}
      SubmenuAdministrarTramitesListaTramites={listaTramites}
      SubmenuAdministrarTramitesObtenerListaMetadata={obtenerListaMetadata}
      SubmenuAdministrarTramitesObtenerMetadata={obtenerMetadata}
      SubmenuAdministrarTramitesListaMetadataTramite={listaMetadataTramite}
      SubmenuAdministrarTramitesActualizarMetadata={actualizarMetadata}
      SubmenuAdministrarTramitesCampoMetadataVacio={campoMetadataVacio}
    />
  );
};

export default SubmenuAdministrarTramitesControlador;
