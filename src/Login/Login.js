import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../Cabeza_Logo.jpg";
import "./Login.css";

export default function Login() {
  const [loginData, setLoginData] = useState({
    id_number: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const loginAttempt = loginData;
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
    axios
      .post("http://localhost:3001/Login", loginAttempt)
      .then((response) => {
        switch (response.data.Code) {
          case 1:
            if (loginData.id_number.length > 7) {
              navigate("/Menu-Estudiante", {
                state: [{ loginID: loginData.id_number }],
              });
            } else {
              navigate("/Menu-Encargada", {
                state: [{ loginID: loginData.id_number }],
              });
            }
            break;
          case -1:
            alert("Usuario y/o contraseña incorrectos");
            break;
          default:
            alert("Usuario no encontrado");
            break;
        }
      })
      .catch((err) => {
        console.log("Error");
        console.error(err);
      });
  }

  return (
    <>
      <div className="header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="login">
        <h2 className="title">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <h4>Matrícula/Número de control</h4>
          <input
            type="text"
            name="id_number"
            placeholder="Matrícula/Número de control"
            onChange={handleInputChange}
          />
          <h4>Contraseña</h4>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleInputChange}
          />
          <input type="submit" id="save" value="Ingresar" className="ingress" />
          <p>
            Si es tu primera vez en el sistema, la contraseña es tu matrícula
          </p>
        </form>
      </div>
    </>
  );
}
