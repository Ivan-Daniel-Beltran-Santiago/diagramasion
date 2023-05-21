import SubmenuBienvenidaUsuarioControlador from "./SubmenuBienvenidaUsuarioControlador";
import SubmenuAdministracionUsuariosControlador from "./SubmenuAdministracionUsuariosController";
import SubmenuInformacionUsuarioControlador from "./SubmenuInformacionUsuarioController";

const MenuControlador = ({ submenuIndex, submenuUsuario, MenuControladorSetUsuarioActivo }) => {
  switch (submenuIndex) {
    case 1:
    case 5:
      return (
        <SubmenuBienvenidaUsuarioControlador usuarioActual={submenuUsuario} />
      );
    case 2:
      break;
    case 3:
      break;
    case 4:
    case 12:
      return (
        <SubmenuInformacionUsuarioControlador
          SubmenuInformacionUsuarioControladorUsuarioActual={submenuUsuario}
          SubmenuInformacionUsuarioControladorSetUsuarioActual={MenuControladorSetUsuarioActivo}
        />
      );
    case 6:
      break;
    case 7:
      break;
    case 8:
      break;
    case 9:
      return <SubmenuAdministracionUsuariosControlador />;
    case 10:
      break;
    case 11:
      break;
    case 13:
      break;
    case 14:
      break;
    case 15:
      break;
    case 16:
      break;
    case 17:
      break;
    case 18:
      break;
    case 19:
      break;
    case 20:
      break;
    default:
      break;
  }
};

export default MenuControlador;
