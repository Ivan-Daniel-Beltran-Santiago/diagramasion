import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Toast } from "primereact/toast";

import LogoHeader from "./Auxiliary/Logo_Header";
import ServerConnectionConfig from "../Controller/ServerConnectionConfig";
import "./Login.css";

export default function Login() {
  const [loginData, setLoginData] = useState({
    id_number: "",
    password: "",
  });

  const [validID, setValidID] = useState(false);
  const [validPass, setValidPass] = useState(false);

  const navigate = useNavigate();

  const toast = useRef(null);

  const handleInputChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
    validateInputChange(event);
  };

  const validateInputChange = (event) => {
    let inputChange = event.target.value;
    if (inputChange.length > 0) {
      if (event.target.name === "id_number") {
        let idValidatorStudent = new RegExp("^(M|m)?[0-9]{8}$");
        let idValidatorAdmin = new RegExp("^[0-9]{5}$");
        setValidID(
          idValidatorStudent.test(inputChange) ||
            idValidatorAdmin.test(inputChange)
        );
      } else {
        let passwordValidator = new RegExp("^[0-9]{4,8}$");
        setValidPass(passwordValidator.test(inputChange));
      }
    }
  };

  const showToast = (severityValue, summaryValue, detailValue) => {
    toast.current.show({
      closable: false,
      life: 5000,
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  };

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const loginAttempt = loginData;

    if (!validID) {
      showToast(
        "warn",
        "Entrada invalida",
        "El usuario ingresado no tiene un formato valido"
      );
      return;
    }

    if (!validPass) {
      showToast(
        "warn",
        "Entrada invalida",
        "La contraseña ingresada no tiene un formato valido"
      );
      return;
    }

    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/Login";

    /*
    navigate("/Menu-Encargada", {
      state: [{ loginID: loginData.id_number }],
    });
    */

    /*
    navigate("/Menu-Estudiante", {
      state: [{ loginID: loginData.id_number }],
    });
    */

    //Patron GOF - Bridge
    axios
      .post(srvReq, loginAttempt)
      .then((response) => {
        switch (response.data.Code) {
          case 1:
            showToast(
              "success",
              "Login exitoso",
              "En un momento sera redirigido"
            );
            delay(1000).then(() => {
              /*
            navigate("/Menu", {
              state: [
                {
                  loginID: loginData.id_number,
                  loginType: loginData.id_number.length > 7 ? 7 : 1,
                },
              ],
            });
            */
              if (loginData.id_number.length > 7) {
                navigate("/Menu-Estudiante", {
                  //Patron GOF - Proxy - Stage
                  state: [{ loginID: loginData.id_number }],
                });
              } else {
                navigate("/Menu-Encargada", {
                  //Patron GOF - Proxy - Stage
                  state: [{ loginID: loginData.id_number }],
                });
              }
            });
            break;
          case -1:
            showToast(
              "error",
              "Datos invalidos",
              "Usuario y/o contraseña incorrectos"
            );
            break;
          default:
            showToast(
              "warn",
              "Datos invalidos",
              "Usuario no encontrado o incorrecto"
            );
            break;
        }
      })
      .catch((err) => {
        console.log("Error");
        console.error(err);
        showToast("error", "Error inesperado", "Intente mas tarde");
      });
  }

  return (
    <>
      <LogoHeader />
      <div className="login">
        <Toast ref={toast} position="top-right" />
        <h2 className="title">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <h4>Matrícula/Número de control</h4>
          <input
            type="text"
            name="id_number"
            placeholder="Matrícula/Número de control"
            onChange={handleInputChange}
            autoComplete="off"
          />
          {!validID && loginData.id_number.length > 0 && (
            <label className="LoginWarning">
              Debe contener 8 digitos, puede tener una m o M al principio si se
              trata de un estudiante de posgrado{" "}
            </label>
          )}
          <h4>Contraseña</h4>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleInputChange}
            autoComplete="off"
          />
          {!validPass && loginData.password.length > 0 && (
            <label className="LoginWarning">Debe contener entre 4 y 8 digitos </label>
          )}
          <br />
          <br />
          <input type="submit" id="save" value="Ingresar" className="ingress" />
          <p>
            Si es tu primera vez en el sistema, la contraseña es tu matrícula
          </p>
        </form>
      </div>
    </>
  );
}
