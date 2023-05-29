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
    const actualizadoInformacionUsuarioActualizar = {
      ...informacionUsuarioActualizar,
      [event.target.name]: event.target.value,
    };

    setInformacionUsuarioActualizar(actualizadoInformacionUsuarioActualizar);

    validateInputChange(event, actualizadoInformacionUsuarioActualizar);
  };

  //Valida los cambios en los campos de texto.
  const validateInputChange = (
    event,
    ActualizadoInformacionUsuarioActualizar
  ) => {
    //Validaciones.
    var validarContraseña = new RegExp("^[0-9]{3,8}$");
    var validarCorreoElectronico = new RegExp(
      "^(?!$)[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\\.[A-Za-z]{2,}(.[A-Za-z]{2,})?$"
    );

    //
    var actualizadoValidacionInformacionUsuario;

    switch (event.target.name) {
      case "nuevoCorreo_e":
        actualizadoValidacionInformacionUsuario = {
          ...validacionInformacionUsuario,
          [event.target.name]:
            ActualizadoInformacionUsuarioActualizar[event.target.name] !== "" &&
            validarCorreoElectronico.test(
              ActualizadoInformacionUsuarioActualizar[event.target.name]
            ),
        };
        setValidacionInformacionUsuario(
          actualizadoValidacionInformacionUsuario
        );
        break;
      case "nuevaContraseña":
      case "nuevaContraseñaConfirmar":
        actualizadoValidacionInformacionUsuario = {
          ...validacionInformacionUsuario,
          [event.target.name]:
            ActualizadoInformacionUsuarioActualizar[event.target.name] !== "" &&
            validarContraseña.test(
              ActualizadoInformacionUsuarioActualizar[event.target.name]
            ),
          nuevaContraseñaCoincide:
            ActualizadoInformacionUsuarioActualizar.nuevaContraseña !== "" &&
            ActualizadoInformacionUsuarioActualizar.nuevaContraseñaConfirmar !==
              "" &&
            ActualizadoInformacionUsuarioActualizar.nuevaContraseña ===
              ActualizadoInformacionUsuarioActualizar.nuevaContraseñaConfirmar,
        };
        setValidacionInformacionUsuario(
          actualizadoValidacionInformacionUsuario
        );
        break;
      default:
        setValidacionInformacionUsuario();
        actualizadoValidacionInformacionUsuario = {
          ...validacionInformacionUsuario,
          [event.target.name]:
            ActualizadoInformacionUsuarioActualizar[event.target.name] !== "" &&
            validarContraseña.test(
              ActualizadoInformacionUsuarioActualizar[event.target.name]
            ),
        };
        setValidacionInformacionUsuario(
          actualizadoValidacionInformacionUsuario
        );
        break;
    }
  };

  //Actualiza los campos deseados.
  const actualizarDatosUsuario = async () => {
    try {
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
          }, 10);
          break;
        case 400:
          setTimeout(() => {
            showToast(
              "error",
              "Usuario",
              "Formato de correo electronico y/o contraseña invalidos."
            );
          }, 10);
          break;
        case 404:
          setTimeout(() => {
            showToast(
              "error",
              "Usuario",
              "Usuario no encontrado o contraseña no coincide."
            );
          }, 10);
          break;
        default:
          setTimeout(() => {
            showToast(
              "error",
              "Usuario",
              "Error del servidor, contacte al administrador."
            );
          }, 10);
          break;
      }
    } catch (error) {
      switch (error.response.status) {
        case 400:
          setTimeout(() => {
            showToast(
              "error",
              "Usuario",
              "Formato de correo electronico y/o contraseña invalidos."
            );
          }, 10);
          break;
        case 404:
          setTimeout(() => {
            showToast(
              "error",
              "Usuario",
              "Usuario no encontrado o contraseña no coincide."
            );
          }, 10);
          break;
        default:
          setTimeout(() => {
            showToast(
              "error",
              "Usuario",
              "Error del servidor, contacte al administrador."
            );
          }, 10);
          break;
      }
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
