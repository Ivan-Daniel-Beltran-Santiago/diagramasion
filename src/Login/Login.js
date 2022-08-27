import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Cabeza_Logo.jpg";

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
    tryFetch();
    //navigate("/Dashboard");
  }

  async function tryFetch() {
    try {
      const responde = await fetch('localhost/Login.php');
      if (Response.ok) {
        console.log('Piola');
      } else {
        console.log('Piolant');
      }
    } catch (error) {
      console.log('Chale : ', error.message);
    }
  }

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
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
