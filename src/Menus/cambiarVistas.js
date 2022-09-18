import MenuBienvenidaEncargada from "./Submodulos/bienvenida";
import AdmnistrarSolicitudes from "./Submodulos/administrarSolicitudes";
import AdministracionGeneral from "./Submodulos/administracionGeneral";
import InformacionUsuario from "./Submodulos/informacionUsuario";

const VistaMenuActual = (VistaIndex) => {
  switch (VistaIndex.VistaIndex) {
    case 1:
      return <MenuBienvenidaEncargada />;
    case 2:
      return <AdmnistrarSolicitudes />;
    case 5:
      return <AdministracionGeneral />;
    case 6:
      return <InformacionUsuario />;
    default:
      return null;
  }
};

export default VistaMenuActual;
