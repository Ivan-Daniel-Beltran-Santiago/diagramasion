import React, { useState } from "react";

function SolicitarTramite() {
  const accordionData = {
    title: "Nombre del trámite",
  };

  const { title } = accordionData;

  const [isActive, setIsActive] = useState(false);

  return (
    <div id="administrarSolicitudes" className="modules">
      <React.Fragment>
        <div className="nombreTramite">
          <div className="accordion-item">
            <div
              className="tituloAcordeon"
              onClick={() => setIsActive(!isActive)}
            >
              <div>{title}</div>
              <div>{isActive ? "-" : "+"}</div>
            </div>
            {isActive && (
              <div className="contenidoAcordeon">
                <p>
                  <label>Información:</label>
                </p>
                <p>
                  <label>Requisitos:</label>
                </p>
                <button className="solicitarTramite">Solicitar</button>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

export default SolicitarTramite;
