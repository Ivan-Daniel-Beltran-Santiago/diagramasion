import BienvenidaEncargada from "./Submodulos/bienvenidaEncargada";
import AdmnistrarSolicitudes from "./Submodulos/administrarSolicitudes";
import AdministracionGeneral from "./Submodulos/administracionGeneral";
import BienvenidaEstudiante from "./Submodulos/bienvenidaEstudiante";
import SolicitarTramite from "./Submodulos/solicitarTramite";
import SolicitudEstudiante from "./Submodulos/solicitudEstudiante";
import InformacionUsuario from "./Submodulos/informacionUsuario";

const VistaMenuActual = ({ VistaIndex, currentUser }) => {
  switch (VistaIndex) {
    case 2:
      return <AdmnistrarSolicitudes />;
    case 5:
      return <AdministracionGeneral />;
    case 6:
      return <InformacionUsuario currentUser={currentUser} />;
    case 8:
      return <SolicitarTramite />;
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

export default VistaMenuActual;
