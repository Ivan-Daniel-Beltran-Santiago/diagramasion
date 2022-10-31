import axios from "axios";
import { useState } from "react";

const SolicitarRegistroTramite = ({
  nombre,
  informacion,
  requisitos,
  emailDest,
  allowNewRequest
}) => {
  const [isActive, setIsActive] = useState(false);
  const [transactionMetadata, setTransactionMetadata] = useState({
    trInfo: "",
    trReq: "",
  });

  const EnviarRequisitos = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/SendEmail", {
        destinatario: emailDest,
        tramite: nombre,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="nombreTramite">
      <div className="accordion-item">
        <div className="tituloAcordeon" onClick={() => setIsActive(!isActive)}>
          <div>{nombre}</div>
          <div>{isActive ? "-" : "+"}</div>
        </div>
        {isActive && (
          <div className="contenidoAcordeon">
            <p>
              <label>Información: </label>
              {transactionMetadata.trInfo === ""
                ? "Información no disponible"
                : transactionMetadata.trInfo}
            </p>
            <p>
              <label>Requisitos: </label>
              {transactionMetadata.trReq === ""
                ? "Requisitos no disponibles"
                : transactionMetadata.trReq}
            </p>
            <button className="solicitarTramite" onClick={EnviarRequisitos}>
              Solicitar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolicitarRegistroTramite;
