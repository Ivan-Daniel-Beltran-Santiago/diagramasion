import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "./menuEstudiante.css";
import VistaMenuActual from "./cambiarVistas";
import Header from "../header";
import RegresarMenu from "./regresarMenu";

function MenuEstudiante() {
  //Uso del State para cambiarse entre ventanas
  const [indexVisible, setIndexVisible] = useState({ index: 1 });

  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({
    controlNumber: 0,
    fullName: "",
    eMail: "",
    currentCarrer: "",
    currentSemester: 0,
  });

  const retrieveUserInfo = useCallback(() => {
    axios
      .post("http://localhost:3001/StudentInfo", {
        loginID: location.state[0].loginID,
      })
      .then((response) => {
        setCurrentUser({
          controlNumber: response.data[0].matricula,
          fullName: response.data[0].nombre_C,
          eMail: response.data[0].correo_e,
          currentCarrer: response.data[0].carrera,
          currentSemester: response.data[0].semestre,
        });
      })
      .catch((err) => {
        console.log("Error");
        console.error(err);
      });
  }, [location]);

  useEffect(() => {
    setIndexVisible(7);
    retrieveUserInfo();
  }, [retrieveUserInfo]);

  return (
    <div className="App">
      <Header />
      <div>
        <div>
          <div className="content-section">
            <div className="contentSelector">
              <button
                id="bienvenidaEstudiante"
                className="button"
                onClick={() => setIndexVisible(7)}
              >
                Bienvenida
              </button>
              <button
                id="administrarSolicitudes"
                className="button"
                onClick={() => setIndexVisible(8)}
              >
                Tramites
              </button>
              <button
                id="solicitudEstudiante"
                className="button"
                onClick={() => setIndexVisible(9)}
              >
                Solicitudes
              </button>
              <button
                id="informacionUsuario"
                className="button"
                onClick={() => setIndexVisible(6)}
              >
                Información de Usuario
              </button>
            </div>
            <div>
              <div className="content">
                <VistaMenuActual
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

export default MenuEstudiante;
