import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "./menuEstudiante.css";
import LogoHeader from "../View/Auxiliary/Logo_Header";
import CambiarVistaController from "../Controller/cambiarVistas";
import RegresarMenu from "../View/Auxiliary/regresarMenu";
import ServerConnectionConfig from "../Controller/ServerConnectionConfig";

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

  const [UserHasApplication, setUserHasApplication] = useState(false);

  const retrieveUserInfo = useCallback(() => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/StudentInfo";

    axios
      .post(srvReq, {
        loginID: location.state[0].loginID,
      })
      .then((response) => {
        console.log(response.data);
        setCurrentUser({
          controlNumber: response.data.matricula,
          fullName: response.data.nombre_C,
          eMail: response.data.correo_e,
          currentCarrer: response.data.Estudiante.carrera,
          currentSemester: response.data.Estudiante.semestre,
        });
      })
      .catch((err) => {
        console.log("Error");
        console.error(err);
      });
  }, [location]);

  const retrieveUserApplication = useCallback(() => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/UserHasApplication";

    axios
      .post(srvReq, {
        matriculaUsuario: location.state[0].loginID,
      })
      .then((response) => {
        setUserHasApplication(response.data.hassApplication);
      })
      .catch((err) => {
        console.log("Error");
        console.error(err);
      });
  }, [location]);

  useEffect(() => {
    setIndexVisible(7);
    retrieveUserInfo();
    retrieveUserApplication();
  }, [retrieveUserInfo, retrieveUserApplication]);

  return (
    <div className="App">
      <LogoHeader />
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
                <CambiarVistaController
                  VistaIndex={indexVisible}
                  currentUser={currentUser}
                  userHasApp={UserHasApplication}
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
