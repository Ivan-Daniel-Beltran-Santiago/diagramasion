import BienvenidaEncargada from "../Menus/Submodulos/bienvenidaEncargada";
import AdmnistrarSolicitudes from "../Menus/Submodulos/administrarSolicitudes";
import AdministracionGeneral from "../Menus/Submodulos/administracionGeneral";
import BienvenidaEstudiante from "../Menus/Submodulos/bienvenidaEstudiante";
import SolicitarTramite from "../Menus/Submodulos/solicitarTramite";
import SolicitudEstudiante from "../Menus/Submodulos/solicitudEstudiante";
import InformacionUsuario from "../Menus/Submodulos/informacionUsuario";
import AdministrarSolicitud from "../Menus/Submodulos/administrarSolicitud";

const CambiarVistaController = ({
  VistaIndex,
  currentUser,
  userHasApp,
  openSingleApplication,
}) => {
  switch (VistaIndex) {
    case 2:
      return <AdmnistrarSolicitudes openSingleApp={openSingleApplication} />;
    case 3:
      return <AdministrarSolicitud />;
    case 5:
      return <AdministracionGeneral />;
    case 6:
    case 10:
      return <InformacionUsuario currentUser={currentUser} />;
    case 8:
      return <SolicitarTramite CurretActiveUser={currentUser} />;
    case 9:
      return <SolicitudEstudiante currentUserInformation={currentUser} />;
    default:
      if (VistaIndex < 7) {
        return <BienvenidaEncargada />;
      } else {
        return <BienvenidaEstudiante />;
      }
  }
};

export default CambiarVistaController;
