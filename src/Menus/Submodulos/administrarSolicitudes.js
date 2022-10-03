import axios from "axios";
import { useCallback, useEffect } from "react";
import { useState } from "react";

import RegistrosSolicitud from "./registrosSolicitud";

function AdmnistrarSolicitudes() {
  const [filtroEstatus, setFiltroEstatus] = useState(3);

  return (
    <div id="administrarSolicitudes">
      <div className="buttonContainer">
        <button className="button" onClick={() => setFiltroEstatus(3)}>
          Documentos Cargados
        </button>
        <button className="button" onClick={() => setFiltroEstatus(6)}>
          Solicitud aceptada, en espera
        </button>
        <button className="button" onClick={() => setFiltroEstatus(9)}>
          Solicitud aprobada y finiquito en espera
        </button>
      </div>
      <section className="listContainer">
        <RegistrosSolicitud estatusSolicitado={{ filtroEstatus }} />
      </section>
    </div>
  );
}

export default AdmnistrarSolicitudes;
