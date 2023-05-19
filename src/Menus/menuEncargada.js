import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./menuEncargada.css";
import { Toast } from "primereact/toast";

import LogoHeader from "../View/Auxiliary/Logo_Header";
import CambiarVistaController from "../Controller/cambiarVistas";
import RegresarMenu from "../View/Auxiliary/regresarMenu";
import ServerConnectionConfig from "../Controller/ServerConnectionConfig";

function MenuEncargada() {
  //Uso del State para cambiarse entre ventanas
  const [indexVisible, setIndexVisible] = useState({
    index: 1,
  });
  const [matriculaSolicitudCargar, setMatriculaSolicitudCargar] = useState(0);

  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({
    controlNumber: 0,
    fullName: "",
    eMail: "",
  });

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

  const cargarMatriculaSolicitud = (matriculaCargar) => {
    setMatriculaSolicitudCargar(matriculaCargar);
    if (matriculaSolicitudCargar) {
      showToast("success", "Solicitud cargada", "La solicitud ha sido cargada");
    } else {
      showToast("error", "Solicitud no cargada", "intente de nuevo");
    }
  };

  const retrieveUserInfo = useCallback(() => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/AdminInfo";

    axios
      .post(srvReq, {
        loginID: location.state.matricula,
      })
      .then((response) => {
        setCurrentUser({
          controlNumber: response.data.matricula,
          fullName: response.data.nombre_Completo,
          eMail: response.data.correo_e,
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
          <div className="buttonContainer_menu">
            <Toast ref={toast} position="top-right" />
            <button
              id="bienvenidaEncargada"
              className="button"
              onClick={() => {
                setIndexVisible(1);
              }}
            >
              Bienvenida{" "}
            </button>{" "}
            <button
              id="administrarSolicitudes"
              className="button"
              onClick={() => {
                setIndexVisible(2);
              }}
            >
              Administración de Solicitudes{" "}
            </button>{" "}
            <button
              id="administrarSolicitud"
              className="button"
              onClick={() => {
                setIndexVisible(3);
              }}
            >
              Administrar Solicitud Individual{" "}
            </button>{" "}
            <button
              id="administracionGeneral"
              className="button"
              onClick={() => {
                setIndexVisible(5);
              }}
            >
              Informe Estadistico{" "}
            </button>{" "}
            <button
              id="administracionUsuarios"
              className="button"
              onClick={() => {
                setIndexVisible(15);
              }}
            >
              Administración de Usuarios{" "}
            </button>{" "}
            <button
              id="administracionTramites"
              className="button"
              onClick={() => {
                setIndexVisible(16);
              }}
            >
              Administración de Tramites{" "}
            </button>{" "}
            <button
              id="edicionCorreos"
              className="button"
              onClick={() => {
                setIndexVisible(17);
              }}
            >
              Administración de Correos{" "}
            </button>{" "}
            <button
              id="informacionUsuario"
              className="button"
              onClick={() => {
                setIndexVisible(6);
              }}
            >
              Información de Usuario{" "}
            </button>{" "}
          </div>{" "}
          <div>
            <div className="content">
              <CambiarVistaController
                VistaIndex={indexVisible}
                currentUser={currentUser}
                CargarMatricula={cargarMatriculaSolicitud}
                MatriculaCargada={matriculaSolicitudCargar}
              />{" "}
              <RegresarMenu />
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default MenuEncargada;
