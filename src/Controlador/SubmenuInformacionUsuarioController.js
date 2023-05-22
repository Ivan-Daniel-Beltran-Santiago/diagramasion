import { useRef, useState } from "react";
import axios from "axios";
import SubmenuInformacionUsuario from "../Vista/SubmenuInformacionUsuario";
import ConfigurarConexion from "./ConfigurarConexion";

const SubmenuInformacionUsuarioControlador = ({
  SubmenuSolicitarTramiteControladorUsuarioActivo,
  SubmenuInformacionUsuarioControladorSetUsuarioActivo,
}) => {
  //Variables de estado.
  const [informacionUsuarioActualizar, setInformacionUsuarioActualizar] =
    useState({
      matricula: SubmenuSolicitarTramiteControladorUsuarioActivo.matricula,
      nuevoCorreo_e: "",
      nuevaContraseña: "",
      nuevaContraseñaConfirmar: "",
      contraseñaActual: "",
    });

  const [validacionInformacionUsuario, setValidacionInformacionUsuario] =
    useState({
      nuevoCorreo_e: false,
      nuevaContraseña: false,
      nuevaContraseñaConfirmar: false,
      nuevaContraseñaCoincide: false,
      contraseñaActual: false,
    });

  //Alertas.
  const toast = useRef(null);

  const showToast = (severityValue, summaryValue, detailValue) => {
    toast.current.show({
      closable: false,
      life: 5000,
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  };

  //Detectar los cambios en los campos de texto.
  const handleInputChange = (event) => {
    setInformacionUsuarioActualizar({
      ...informacionUsuarioActualizar,
      [event.target.name]: event.target.value,
    });
    validateInputChange(event);
  };

  //Valida los cambios en los campos de texto.
  const validateInputChange = (event) => {
    //Validaciones.
    var validarContraseña = new RegExp("^[0-9]{3,8}");
    var validarCorreoElectronico = new RegExp(
      "^(?!$)[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\\.[A-Za-z]{2,}(.[A-Za-z]{2,})?$"
    );

    switch (event.target.name) {
      case "nuevoCorreo_e":
        setValidacionInformacionUsuario({
          ...validacionInformacionUsuario,
          [event.target.name]: validarCorreoElectronico.test(
            event.target.value
          ),
        });
        break;
      case "nuevaContraseña":
      case "nuevaContraseñaConfirmar":
        setValidacionInformacionUsuario({
          ...validacionInformacionUsuario,
          [event.target.name]: validarContraseña.test(event.target.value),
        });
        setValidacionInformacionUsuario({
          ...validacionInformacionUsuario,
          nuevaContraseñaCoincide:
            validacionInformacionUsuario.nuevaContraseña ===
            validacionInformacionUsuario.nuevaContraseñaConfirmar,
        });
        break;
      default:
        setValidacionInformacionUsuario({
          ...validacionInformacionUsuario,
          [event.target.name]: validarContraseña.test(event.target.value),
        });
        break;
    }
  };

  //Actualiza los campos deseados.
  const actualizarDatosUsuario = async () => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/usuarios/actualizar";

    const actualizacion = await axios.put(funcion, {
      matricula: informacionUsuarioActualizar.matricula,
      contraseña: informacionUsuarioActualizar.contraseñaActual,
      nuevaContraseña: informacionUsuarioActualizar.nuevaContraseña,
      correo_e: informacionUsuarioActualizar.nuevoCorreo_e,
    });

    switch (actualizacion.status) {
      case 200:
        SubmenuInformacionUsuarioControladorSetUsuarioActivo(
          actualizacion.data
        );
        setTimeout(() => {
          showToast(
            "success",
            "Usuario",
            "Correo electronico y/o contraseña actualizados exitosamente."
          );
        }, 100);
        break;
      case 400:
        setTimeout(() => {
          showToast(
            "error",
            "Usuario",
            "Formato de correo electronico y/o contraseña invalidos."
          );
        }, 100);
        break;
      case 404:
        setTimeout(() => {
          showToast(
            "error",
            "Usuario",
            "Usuario no encontrado, contacte al administrador."
          );
        }, 100);
        break;
      default:
        setTimeout(() => {
          showToast(
            "error",
            "Usuario",
            "Error del servidor, contacte al administrador."
          );
        }, 100);
        break;
    }
  };

  return (
    <SubmenuInformacionUsuario
      InfoUsuarioTostado={toast}
      HandleInputChange={handleInputChange}
      ActualizarDatosUsuario={actualizarDatosUsuario}
      InformacionUsuarioActualizar={informacionUsuarioActualizar}
      ValidacionInformacionUsuario={validacionInformacionUsuario}
      SubmenuInformacionUsuarioUsuarioActivo={
        SubmenuSolicitarTramiteControladorUsuarioActivo
      }
    />
  );
};

export default SubmenuInformacionUsuarioControlador;
