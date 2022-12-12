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

function AdmnistrarSolicitudes() {
  const [filtroEstatus, setFiltroEstatus] = useState(3);

  return (
    <div id="administrarSolicitudes">
      <div className="buttonContainer">
        <button className="button" onClick={() => setFiltroEstatus(1)}>
          {estatusLexico[1]}
        </button>
        <button className="button" onClick={() => setFiltroEstatus(2)}>
          {estatusLexico[2]}
        </button>
        <button className="button" onClick={() => setFiltroEstatus(7)}>
          {estatusLexico[7]}
        </button>
        <button className="button" onClick={() => setFiltroEstatus(8)}>
          {estatusLexico[8]}
        </button>
      </div>
      <section className="listContainer">
        <RegistrosSolicitud estatusSolicitado={{ filtroEstatus }} />
      </section>
    </div>
  );
}

export default AdmnistrarSolicitudes;
