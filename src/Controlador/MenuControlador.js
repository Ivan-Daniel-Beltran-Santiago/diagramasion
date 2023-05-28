import { useCallback, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ConfigurarConexion from "./ConfigurarConexion";

import SubmenuBienvenidaUsuarioControlador from "./SubmenuBienvenidaUsuarioControlador";
import SubmenuSolicitarTramiteControlador from "./SubmenuSolicitarTramiteControlador";
import SubmenuSolicitudEstudianteControlador from "./SubmenuSolicitudEstudianteControlador";
import SubmenuInformacionUsuarioControlador from "./SubmenuInformacionUsuarioController";
import SubmenuAdministrarSolicitudesControlador from "./SubmenuAdministrarSolicitudesControlador";
import SubmenuAdministrarSolicitudControlador from "./SubmenuAdministrarSolicitudControlador";
import SubmenuAdministrarReportesControlador from "./SubmenuAdministrarReportesControlador";
import SubmenuAdministrarTramitesControlador from "./SubmenuAdministrarTramitesControlador";
import SubmenuAdministrarCorreosControlador from "./SubmenuAdministrarCorreosControlador";
import SubmenuAdministrarUsuariosControlador from "./SubmenuAdministrarUsuariosController";

const MenuControlador = ({
  SubmenuIndex,
  SubmenuUsuario,
  SubmenuSetUsuarioActivo,
}) => {
  //Variables de estado
  const [registroSolicitud, setRegistroSolicitud] = useState(null);
  const [listaSolicitudes, setListaSolicitudes] = useState([]);

  //Recibir información del menú anterior, que es el de login
  const location = useLocation();

  //Alertas
  const toast = useRef(null);

  const showToast = (severityValue, summaryValue, detailValue) => {
    toast.current.show({
      closable: false,
      life: 8000,
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  };

  //Obtener una solicitud en particular
  const obtenerSolicitudEspecifica = async (
    IDSolicitud,
    isMenuAdministrarSolicitudes
  ) => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/solicitudes/consultar";

    const solicitudEncontrada = await axios.get(funcion, {
      params: { id_Solicitud: IDSolicitud },
    });

    if (solicitudEncontrada.status === 200) {
      if (isMenuAdministrarSolicitudes)
        showToast(
          "success",
          "Solicitud seleccionada",
          "Ahora puede cambiar a la pestaña Administrar Solicitud Individual para ver los detalles de la solicitud selecciionada."
        );
      setRegistroSolicitud(solicitudEncontrada.data);
    } else {
      showToast(
        "error",
        "Solicitud seleccionada",
        "La solicitud no pudo ser consultada, contacte con el administrador del sistema."
      );
    }
  };

  //Obtener todas las solicitudes del estudiante logueado
  const obtenerSolicitudes = useCallback(async () => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/solicitudes/consulta";

    const solicitudesUsuario =
      location.state.matricula.length > 7
        ? await axios.get(funcion, {
            params: {
              matricula: location.state.matricula,
            },
          })
        : null;
    setListaSolicitudes(
      solicitudesUsuario && solicitudesUsuario.status === 200
        ? solicitudesUsuario.data
        : []
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (SubmenuIndex) {
    case 2:
      return (
        <SubmenuSolicitarTramiteControlador
          SubmenuSolicitarTramiteControladorUsuarioActivo={SubmenuUsuario}
          SubmenuSolicitarTramiteControladorObtenerSolicitudes={
            obtenerSolicitudes
          }
        />
      );
    case 3:
      return (
        <SubmenuSolicitudEstudianteControlador
          SubmenuSolicitudEstudianteControladorUsuarioActivo={SubmenuUsuario}
        />
      );
    case 4:
    case 12:
      return (
        <SubmenuInformacionUsuarioControlador
          SubmenuSolicitarTramiteControladorUsuarioActivo={SubmenuUsuario}
          SubmenuInformacionUsuarioControladorSetUsuarioActivo={
            SubmenuSetUsuarioActivo
          }
        />
      );
    case 6:
      return (
        <SubmenuAdministrarSolicitudesControlador
          SubmenuAdministrarSolicitudesControladorObtenerSolicitudSeleccionada={
            obtenerSolicitudEspecifica
          }
          SubmenuAdministrarSolicitudesControladorTostado={toast}
        />
      );
    case 7:
      return (
        <SubmenuAdministrarSolicitudControlador
          SubmenuAdministrarSolicitudControladorSolicitudSeleccionada={
            registroSolicitud
          }
          SubmenuAdministrarSolicitudControladorObtenerSolicitudEspecifica={
            obtenerSolicitudEspecifica
          }
        />
      );
    case 8:
      return <SubmenuAdministrarReportesControlador />;
    case 9:
      return <SubmenuAdministrarUsuariosControlador />;
    case 10:
      return <SubmenuAdministrarTramitesControlador />;
    case 11:
      return <SubmenuAdministrarCorreosControlador />;
    default:
      return (
        <SubmenuBienvenidaUsuarioControlador
          SubmenuBienvenidaUsuarioControladorUsuarioActual={SubmenuUsuario}
          SubmenuBienvenidaUsuarioControladorObtenerSolicitudes={
            obtenerSolicitudes
          }
          SubmenuBienvenidaUsuarioControladorListaSolicitudes={listaSolicitudes}
        />
      );
  }
};

export default MenuControlador;
