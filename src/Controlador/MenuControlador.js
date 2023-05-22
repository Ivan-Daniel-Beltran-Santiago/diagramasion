import SubmenuBienvenidaUsuarioControlador from "./SubmenuBienvenidaUsuarioControlador";
import SubmenuSolicitarTramiteControlador from "./SubmenuSolicitarTramiteControlador";
import SubmenuSolicitudEstudianteControlador from "./SubmenuSolicitudEstudianteControlador";
import SubmenuInformacionUsuarioControlador from "./SubmenuInformacionUsuarioController";
import SubmenuAdministracionUsuariosControlador from "./SubmenuAdministracionUsuariosController";

//Reemplazar despues
import EdicionCorreos from "../Menus/Submodulos/edicionCorreos";
import AdministracionTramites from "../Menus/Submodulos/administracionTramites";
import AdministrarSolicitudes from "../Menus/Submodulos/administrarSolicitudes";
import AdministrarSolicitud from "../Menus/Submodulos/administrarSolicitud";
import AdministracionGeneral from "../Menus/Submodulos/administracionGeneral";

const MenuControlador = ({
  SubmenuIndex,
  SubmenuUsuario,
  SubmenuSetUsuarioActivo,
}) => {
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
      return <AdministrarSolicitudes />;
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
