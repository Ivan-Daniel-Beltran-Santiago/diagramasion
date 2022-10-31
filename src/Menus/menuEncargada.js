import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./menuEncargada.css";

import LogoHeader from "../View/Auxiliary/Logo_Header";
import CambiarVistaController from "../Controller/cambiarVistas";
import RegresarMenu from "../View/Auxiliary/regresarMenu";

function MenuEncargada() {
  //Uso del State para cambiarse entre ventanas
  const [indexVisible, setIndexVisible] = useState({ index: 1 });

  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({
    controlNumber: 0,
    fullName: "",
    eMail: "",
  });

  const retrieveUserInfo = useCallback(() => {
    axios
      .post("http://localhost:3001/AdminInfo", {
        loginID: location.state[0].loginID,
      })
      .then((response) => {
        setCurrentUser({
          controlNumber: response.data[0].matricula,
          fullName: response.data[0].nombre_C,
          eMail: response.data[0].correo_e,
        });
      })
      .catch((err) => {
        console.log("Error");
        console.error(err);
      });
  }, [location]);

  useEffect(() => {
    //Setea la ventana a la primera por default
    setIndexVisible(0);
    retrieveUserInfo();
  }, [retrieveUserInfo]);

  //El menú de vistas
  return (
    <div className="App">
      <LogoHeader />
      <div>
        <div>
          <div className="content-section">
            <div className="contentSelector">
              <button
                id="bienvenidaEncargada"
                className="button"
                onClick={() => {
                  setIndexVisible(1);
                }}
              >
                Bienvenida
              </button>
              <button
                id="administrarSolicitudes"
                className="button"
                onClick={() => {
                  setIndexVisible(2);
                }}
              >
                Administración de Solicitudes
              </button>
              <button
                id="administracionGeneral"
                className="button"
                onClick={() => {
                  setIndexVisible(5);
                }}
              >
                Administración General
              </button>
              <button
                id="informacionUsuario"
                className="button"
                onClick={() => {
                  setIndexVisible(6);
                }}
              >
                Información de Usuario
              </button>
            </div>
            <div>
              <div className="content">
                <CambiarVistaController
                  VistaIndex={indexVisible}
                  currentUser={currentUser}
                />
                <RegresarMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MenuEncargada;
