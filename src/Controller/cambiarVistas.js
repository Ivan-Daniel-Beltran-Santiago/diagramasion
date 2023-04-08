import BienvenidaEncargada from "../Menus/Submodulos/bienvenidaEncargada";
import AdmnistrarSolicitudes from "../Menus/Submodulos/administrarSolicitudes";
import AdministracionGeneral from "../Menus/Submodulos/administracionGeneral";
import BienvenidaEstudiante from "../Menus/Submodulos/bienvenidaEstudiante";
import SolicitarTramite from "../Menus/Submodulos/solicitarTramite";
import SolicitudEstudiante from "../Menus/Submodulos/solicitudEstudiante";
import InformacionUsuario from "../Menus/Submodulos/informacionUsuario";
import AdministrarSolicitud from "../Menus/Submodulos/administrarSolicitud";
import AdministracionUsuarios from "../Menus/Submodulos/AdministracionUsuarios";

const CambiarVistaController = ({
  VistaIndex,
  currentUser,
  CargarMatricula,
  MatriculaCargada,
}) => {
  const handleCargarMatricula = (matriculaCargarS) => {
    CargarMatricula(matriculaCargarS);
  };

  switch (VistaIndex) {
    case 2:
      return <AdmnistrarSolicitudes cargarMatricula={handleCargarMatricula} />;
    case 3:
      return <AdministrarSolicitud matriculaSolicitud={MatriculaCargada} />;
    case 5:
      return <AdministracionGeneral />;
    case 6:
    case 10:
      return <InformacionUsuario currentUser={currentUser} />;
    case 8:
      return <SolicitarTramite CurretActiveUser={currentUser} />;
    case 9:
      return <SolicitudEstudiante currentUserInformation={currentUser} />;
    case 15:
      return <AdministracionUsuarios />;
    default:
      if (VistaIndex < 7) {
        return <BienvenidaEncargada />;
      } else {
        return <BienvenidaEstudiante currentUser={currentUser} />;
      }
  }
};

export default CambiarVistaController;
