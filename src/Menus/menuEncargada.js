import { useEffect, useState } from "react";
import "./menuEncargada.css";

import Header from "../header";
import VistaMenuActual from "./cambiarVistas";
import RegresarMenu from "./regresarMenu";

function MenuEncargada() {
  //Uso del State para cambiarse entre ventanas
  const [indexVisible, setIndexVisible] = useState({ index: 1 });

  useEffect(() => {
    setIndexVisible(0);
  }, []);

  //La vista tal cual
  return (
    <div className="App">
      <Header />
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
                <VistaMenuActual VistaIndex={indexVisible} />
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
