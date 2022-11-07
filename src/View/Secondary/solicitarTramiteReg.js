import axios from "axios";
import { useState } from "react";

const SolicitarRegistroTramite = ({
  nombre,
  informacion,
  requisitos,
  emailDest,
  Request,
  User,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [transactionMetadata, setTransactionMetadata] = useState({
    trInfo: "",
    trReq: "",
  });

  const RegistrarSolicitud = () => {
    let currentDate =
      Date.getFullYear() + "/" + (Date.getMonth + 1) + "/" + Date.getDay();
    axios.post("http://localhost:3001/NewUserApplication", {
      fecha_inicio: currentDate,
      fecha_act: currentDate,
      estatus: 1,
      retroalim: "Solicitud iniciada",
      estudiante: User.controlNumber,
    });
  };

  const EnviarRequisitos = () => {
    axios
      .post("http://localhost:3001/SendEmail", {
        destinatario: emailDest,
        tramite: nombre,
      })
      .then((response) => {
        console.log(response);
      })
      .then(() => {
        alert("Solicitud creada con exito.");
      })
      .catch((error) => {
        console.log(error);
        alert("Fallo a la hora de crear la solicitud");
      });
  };

  const handleRequestSubmit = (event) => {
    event.preventDefault();
    if (!Request) {
      RegistrarSolicitud();
      EnviarRequisitos();
      alert("Solicitud creada con exito");
    } else {
      alert("Usted ya tiene una solicitud en progreso.");
    }
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
            <button className="solicitarTramite" onClick={handleRequestSubmit}>
              Solicitar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolicitarRegistroTramite;
