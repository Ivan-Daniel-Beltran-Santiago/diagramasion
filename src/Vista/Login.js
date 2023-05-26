import React from "react";

import { Toast } from "primereact/toast";

import LogoHeader from "../View/Auxiliary/Logo_Header";
import "./Login.css";

export default function Login({
  Tostado,
  iniciarSesion,
  handleInputChange,
  inicioSesion,
  MatriculaValidada,
  ContraseñaValidada,
}) {
  return (
    <>
      <LogoHeader />
      <div className="login">
        <Toast ref={Tostado} position="top-right" />
        <h2 className="title">Iniciar sesión</h2>
        <form onSubmit={iniciarSesion}>
          <h4>Matrícula/Número de control</h4>
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula/Número de control"
            onChange={handleInputChange}
            autoComplete="off"
          />
          {!MatriculaValidada && inicioSesion.matricula.length > 0 && (
            <label className="LoginWarning">
              Debe contener 8 digitos, puede tener una de las siguientes letras
              si es que su matricula ya cuenta con ellas: B, b, C, c, D, d, M, m{" "}
            </label>
          )}
          <h4>Contraseña</h4>
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            onChange={handleInputChange}
            autoComplete="off"
          />
          {!ContraseñaValidada && inicioSesion.contraseña.length > 0 && (
            <label className="LoginWarning">
              Debe contener entre 3 y 8 digitos{" "}
            </label>
          )}
          <br />
          <br />
          <input type="submit" id="save" value="Ingresar" className="ingress" />
          <p>
            Si es tu primera vez en el sistema, la contraseña es tu matrícula, omitiendo las letras, solo digitos
          </p>
        </form>
      </div>
    </>
  );
}
