import BienvenidaEncargada from "../Menus/Submodulos/bienvenidaEncargada";
import AdmnistrarSolicitudes from "../Menus/Submodulos/administrarSolicitudes";
import AdministracionGeneral from "../Menus/Submodulos/administracionGeneral";
import BienvenidaEstudiante from "../Menus/Submodulos/bienvenidaEstudiante";
import SolicitarTramite from "../Menus/Submodulos/solicitarTramite";
import SolicitudEstudiante from "../Menus/Submodulos/solicitudEstudiante";
import InformacionUsuario from "../Menus/Submodulos/informacionUsuario";

const CambiarVistaController = ({ VistaIndex, currentUser, userHasApp }) => {
  switch (VistaIndex) {
    case 2:
      return <AdmnistrarSolicitudes />;
    case 5:
      return <AdministracionGeneral />;
    case 6:
    case 10:
      return <InformacionUsuario currentUser={currentUser} />;
    case 8:
      return (
        <SolicitarTramite
          UserHasOngoingApplication={userHasApp}
          CurretActiveUser={currentUser}
        />
      );
    case 9:
      return <SolicitudEstudiante />;
    default:
      if (VistaIndex < 7) {
        return <BienvenidaEncargada />;
      } else {
        return <BienvenidaEstudiante />;
      }
  }
};

export default CambiarVistaController;
