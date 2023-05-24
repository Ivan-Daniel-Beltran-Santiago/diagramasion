import { useCallback, useRef, useState } from "react";
import axios from "axios";
import ConfigurarConexion from "./ConfigurarConexion";
import SubmenuAdministrarSolicitudes from "../Vista/SubmenuAdministrarSolicitudes";

const SubmenuAdministrarSolicitudesControlador = ({
  SubmenuAdministrarSolicitudesControladorObtenerSolicitudSeleccionada,
  SubmenuAdministrarSolicitudesControladorTostado,
}) => {
  //Variables de estado
  const [estatusSolicitud, setEstatusSolicitud] = useState(1);
  const [listaSolicitudesEstatus, setListaSolicitudesEstatus] = useState([]);
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

  const showToast = (severityValue, summaryValue, detailValue) => {
    SubmenuAdministrarSolicitudesControladorTostado.current.show({
      closable: false,
      life: 8000,
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  };

  //Actualizar descripciones de los estatus
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
    }
  }, []);

  //Obtener una lista de solicitudes en base a un estatus seleccionado
  const obtenerListaSolicitudes = async (EstatusSolicitud) => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/solicitudes/lista";

    const listaSolicitudesEncontradas = await axios.get(funcion, {
      params: { estatus_Actual: EstatusSolicitud },
    });

    if (listaSolicitudesEncontradas.status === 200) {
      setListaSolicitudesEstatus(listaSolicitudesEncontradas.data);
    } else {
      setListaSolicitudesEstatus([]);
      showToast(
        "error",
        "Solicitudes",
        "No se proceso la busqueda correctamente, contacte al administrador."
      );
    }
  };

  return (
    <SubmenuAdministrarSolicitudes
      SubmenuAdministrarSolicitudesObtenerDescripciones={obtenerDescripciones}
      SubmenuAdministrarSolicitudesEstatusLexico={estatusLexico}
      SubmenuAdministrarSolicitudesEstatusSeleccionado={estatusSolicitud}
      SubmenuAdministrarSolicitudesSetEstatusSeleccionado={setEstatusSolicitud}
      SubmenuAdministrarSolicitudesObtenerListaSolicitudes={
        obtenerListaSolicitudes
      }
      SubmenuAdministrarSolicitudesListaSolicitudes={listaSolicitudesEstatus}
      SubmenuAdministrarSolicitudesObtenerSolicitudSeleccionada={
        SubmenuAdministrarSolicitudesControladorObtenerSolicitudSeleccionada
      }
      SubmenuAdministrarSolicitudesTostado={
        SubmenuAdministrarSolicitudesControladorTostado
      }
    />
  );
};

export default SubmenuAdministrarSolicitudesControlador;
