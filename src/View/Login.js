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

  const navigate = useNavigate();

  const toast = useRef(null);

  const handleInputChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
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

    const userNameRGEX = new RegExp("(M|m)?[0-9]{4,8}");
    const passwordRGEX = new RegExp("[0-9]{4,8}");

    const userValid = userNameRGEX.test(loginAttempt.id_number);
    const passwordValid = passwordRGEX.test(loginAttempt.password);

    if (!userValid) {
      showToast(
        "warn",
        "Entrada invalida",
        "El usuario ingresado no tiene un formato valido"
      );
      return;
    }

    if (!passwordValid) {
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
            showToast("error", "Datos invalidos", "Contraseña incorrecta");
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
            required
            autoComplete="off"
            maxLength={9}
            minLength={4}
          />
          <h9>
            Debe contener 8 digitos, puede tener una m o M al principio si se
            trata de un estudiante de posgrado{" "}
          </h9>
          <h4>Contraseña</h4>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleInputChange}
            required
            autoComplete="off"
            maxLength={8}
            minLength={4}
          />
          <h9>Debe contener entre 4 y 8 digitos </h9>
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
