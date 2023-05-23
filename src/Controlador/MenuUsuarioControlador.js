import { useCallback, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ConfigurarConexion from "./ConfigurarConexion";
import MenuUsuario from "../Vista/MenuUsuario";

const MenuUsuarioControlador = () => {
  //Variables de estado.
  const [indexMenu, setIndexMenu] = useState(0);
  const [usuarioActivo, setUsuarioActivo] = useState({});

  //Alertas
  const toast = useRef(null);

  const showToast = (severityValue, summaryValue, detailValue) => {
    toast.current.show({
      closable: false,
      life: 7000,
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  };

  //Recibir información del menú anterior, que es el de login
  const location = useLocation();

  //Obtener la informacion del usuario en sesión.
  const obtenerInformacionUsuario = useCallback(async () => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/usuarios/consultar";

    try {
      const usuario = await axios.get(funcion, {
        params: { matricula: location.state.matricula },
      });

      switch (usuario.status) {
        case 200:
          setUsuarioActivo(usuario.data.Informacion);
          break;
        default:
          showToast(
            "error",
            "Inicio de sesión",
            "Error de sistema, contacte al administrador"
          );
          break;
      }
    } catch (error) {
      showToast(
        "error",
        "Inicio de sesión",
        "Error de sistema, contacte al administrador"
      );
    }
  }, []);

  return (
    <MenuUsuario
      MenuIndex={indexMenu}
      MenuCambiarIndex={setIndexMenu}
      MenuUsuarioUsuarioActivo={usuarioActivo}
      MenuUsuarioTostado={toast}
      MenuUsuarioSetUsuarioActivo={setUsuarioActivo}
      MenuUsuarioObtenerInformacionUsuario={obtenerInformacionUsuario}
    />
  );
};

export default MenuUsuarioControlador;
