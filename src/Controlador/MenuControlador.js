import { useRef, useState } from "react";

import ConfigurarConexion from "./ConfigurarConexion";
import axios from "axios";

import SubmenuBienvenidaUsuarioControlador from "./SubmenuBienvenidaUsuarioControlador";
import SubmenuSolicitarTramiteControlador from "./SubmenuSolicitarTramiteControlador";
import SubmenuSolicitudEstudianteControlador from "./SubmenuSolicitudEstudianteControlador";
import SubmenuInformacionUsuarioControlador from "./SubmenuInformacionUsuarioController";
import SubmenuAdministrarSolicitudesControlador from "./SubmenuAdministrarSolicitudesControlador";
import SubmenuAdministracionUsuariosControlador from "./SubmenuAdministracionUsuariosController";

//Reemplazar despues
import EdicionCorreos from "../Menus/Submodulos/edicionCorreos";
import AdministracionTramites from "../Menus/Submodulos/administracionTramites";
import AdministrarSolicitud from "../Menus/Submodulos/administrarSolicitud";
import AdministracionGeneral from "../Menus/Submodulos/administracionGeneral";

const MenuControlador = ({
  SubmenuIndex,
  SubmenuUsuario,
  SubmenuSetUsuarioActivo,
}) => {
  //Variables de estado
  const [registroSolicitud, setRegistroSolicitud] = useState(null);

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
  const obtenerSolicitudEspecifica = async (IDSolicitud) => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/solicitudes/consultar";

    const solicitudEncontrada = await axios.get(funcion, {
      params: { id_Solicitud: IDSolicitud },
    });

    if (solicitudEncontrada.status === 200) {
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

  switch (SubmenuIndex) {
    case 2:
      return (
        <SubmenuSolicitarTramiteControlador
          SubmenuSolicitarTramiteControladorUsuarioActivo={SubmenuUsuario}
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
      return <AdministrarSolicitud />;
    case 8:
      return <AdministracionGeneral />;
    case 9:
      return <SubmenuAdministracionUsuariosControlador />;
    case 10:
      return <AdministracionTramites />;
    case 11:
      return <EdicionCorreos />;
    default:
      return (
        <SubmenuBienvenidaUsuarioControlador
          SubmenuBienvenidaUsuarioControladorUsuarioActual={SubmenuUsuario}
        />
      );
  }
};

export default MenuControlador;
