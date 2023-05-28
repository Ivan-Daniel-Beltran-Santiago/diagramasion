import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ConfigurarConexion from "./ConfigurarConexion";
import MenuLogin from "../Vista/MenuLogin";

const MenuLoginControlador = () => {
  //Variables de estado.
  const [InicioSesion, setInicioSesion] = useState({
    matricula: "",
    contraseña: "",
  });
  const [matriculaValidada, setMatriculaValidada] = useState(false);
  const [contraseñaValidada, setContraseñaValidada] = useState(false);

  //Cambiar menu.
  const navigate = useNavigate();

  //Notificaciones.
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

  //Detecta los cambios en los campos de matricula y contraseña.
  const HandleInputChange = (event) => {
    setInicioSesion({
      ...InicioSesion,
      [event.target.name]: event.target.value,
    });
    validateInputChange(event);
  };

  //Valida los cambios en la matricula y contraseña según el formato especificado.
  const validateInputChange = (event) => {
    let inputChange = event.target.value;
    if (inputChange.length > 0) {
      if (event.target.name === "matricula") {
        let validarMatriculaEstudiante = new RegExp(
          "^(B|b|C|c|D|d|M|m)?[0-9]{8}$"
        );
        let validarMatriculaEncargada = new RegExp("^[0-9]{3}$");
        setMatriculaValidada(
          validarMatriculaEstudiante.test(inputChange) ||
            validarMatriculaEncargada.test(inputChange)
        );
      } else {
        let validarContraseña = new RegExp("^[0-9]{3,8}$");
        setContraseñaValidada(validarContraseña.test(inputChange));
      }
    }
  };

  //Llama a la API para hacer el inicio de sesión.
  const IniciarSesion = async (event) => {
    event.preventDefault();

    if (!matriculaValidada) {
      showToast(
        "warn",
        "Entrada invalida",
        "El usuario ingresado no tiene un formato valido"
      );
      return;
    }

    //Validamos si la contraseña tiene el formato valido.
    if (!contraseñaValidada) {
      showToast(
        "warn",
        "Entrada invalida",
        "La contraseña ingresada no tiene un formato valido"
      );
      return;
    }

    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/usuarios/sesion";

    await axios
      .get(funcion, {
        params: {
          matricula: InicioSesion.matricula,
          contraseña: InicioSesion.contraseña,
        },
      })
      .then((respuesta) => {
        switch (respuesta.status) {
          case 200:
            showToast(
              "success",
              "Login exitoso",
              "Usuario reconocido, iniciando sesión."
            );
            setTimeout(() => {
              navigate("/Menu", {
                state: { matricula: InicioSesion.matricula },
              });
            }, 10);
            break;
          case 400:
            showToast(
              "error",
              "Formato invalido",
              "Formato de usuario y/o contraseña incorrecto."
            );
            break;
          case 404:
            showToast(
              "error",
              "Datos invalidos",
              "Usuario y/o contraseña incorrectos."
            );
            break;
          default:
            showToast(
              "error",
              "Error de servidor",
              "Contacte con el administrador del sistema."
            );
            break;
        }
      })
      .catch((error) => {
        switch (error.response.status) {
          case 400:
            showToast(
              "error",
              "Formato invalido",
              "Formato de usuario y/o contraseña incorrecto."
            );
            break;
          case 404:
            showToast(
              "error",
              "Datos invalidos",
              "Usuario y/o contraseña incorrectos."
            );
            break;
          default:
            showToast(
              "error",
              "Error de servidor",
              "Contacte con el administrador del sistema."
            );
            break;
        }
      });
  };

  //Mostramos el componente visual
  return (
    <MenuLogin
      Tostado={toast}
      iniciarSesion={IniciarSesion}
      handleInputChange={HandleInputChange}
      inicioSesion={InicioSesion}
      MatriculaValidada={matriculaValidada}
      ContraseñaValidada={contraseñaValidada}
    />
  );
};

export default MenuLoginControlador;
