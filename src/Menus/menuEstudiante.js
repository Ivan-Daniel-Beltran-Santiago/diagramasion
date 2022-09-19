import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./menuEstudiante.css";
import VistaMenuActual from "./cambiarVistas";
import Header from "../header";

function MenuEstudiante() {
  //Uso del State para cambiarse entre ventanas
  const [indexVisible, setIndexVisible] = useState({ index: 1 });

  const navigate = useNavigate();

  useEffect(() => {
    setIndexVisible(7);
  }, []);

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
                <VistaMenuActual VistaIndex={indexVisible} />
                <button
                  id="salirButton"
                  className="logout"
                  onClick={() => navigate("/")}
                >
                  Salir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuEstudiante;
