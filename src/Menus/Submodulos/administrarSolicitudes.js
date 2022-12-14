import { useState } from "react";

import RegistrosSolicitud from "./registrosSolicitud";

const estatusLexico = {
  1: "Solicitud iniciada",
  2: "Documentos subidos en formato digital",
  3: "Documentos rechazados en formato digital",
  4: "Documentos aceptados en formato digital",
  5: "Documentos recibidos en persona",
  6: "Solicitud enviada a la aseguradora",
  7: "Solicitud rechazada por la aseguradora",
  8: "Nuevos documentos recibidos en formato digital",
  9: "Nuevos documentos rechazados",
  10: "Solicitud reenviada a la aseguradora",
  11: "Finiquito en espera de firma en persona",
  12: "Solicitud terminada",
};

function AdmnistrarSolicitudes({ openSingleApp }) {
  const [filtroEstatus, setFiltroEstatus] = useState(3);

  return (
    <div id="administrarSolicitudes">
      <div className="buttonContainer">
        <div className="row_1">
          <button className="button" onClick={() => setFiltroEstatus(1)}>
            {estatusLexico[1]}
          </button>
          <button className="button" onClick={() => setFiltroEstatus(2)}>
            {estatusLexico[2]}
          </button>
          <button className="button" onClick={() => setFiltroEstatus(3)}>
            {estatusLexico[3]}
          </button>
          <button className="button" onClick={() => setFiltroEstatus(4)}>
            {estatusLexico[4]}
          </button>
        </div>
        <div className="row_2">
          <button className="button" onClick={() => setFiltroEstatus(5)}>
            {estatusLexico[5]}
          </button>
          <button className="button" onClick={() => setFiltroEstatus(6)}>
            {estatusLexico[6]}
          </button>
          <button className="button" onClick={() => setFiltroEstatus(7)}>
            {estatusLexico[7]}
          </button>
          <button className="button" onClick={() => setFiltroEstatus(8)}>
            {estatusLexico[8]}
          </button>
        </div>
        <div className="row_3">
          <button className="button" onClick={() => setFiltroEstatus(9)}>
            {estatusLexico[9]}
          </button>
          <button className="button" onClick={() => setFiltroEstatus(10)}>
            {estatusLexico[10]}
          </button>
          <button className="button" onClick={() => setFiltroEstatus(11)}>
            {estatusLexico[11]}
          </button>
        </div>
      </div>
      <section className="listContainer">
        <RegistrosSolicitud
          estatusSolicitado={{ filtroEstatus }}
          singleApplication={{ openSingleApp }}
        />
      </section>
    </div>
  );
}

export default AdmnistrarSolicitudes;
