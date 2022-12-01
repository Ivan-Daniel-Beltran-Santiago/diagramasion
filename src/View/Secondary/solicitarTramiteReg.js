import axios from "axios";
import { useRef, useState } from "react";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";
import { Toast } from "primereact/toast";

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

  const toast = useRef(null);
  let successfullApplication = false;

  const showToast = (severityValue, summaryValue, detailValue) => {
    toast.current.show({
      closable: false,
      life: 5000,
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  };

  const RegistrarSolicitud = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/NewUserApplication";
    axios
      .post(srvReq, {
        estudiante: User.controlNumber,
      })
      .then((response) => {
        switch (response.data.Code) {
          case 1:
            showToast(
              "success",
              "Solicitud registrada con exito",
              "Su solicitud ha sido procesada exitosamente"
            );
            successfullApplication = true;
            break;
          default:
            showToast(
              "error",
              "Error inesperado",
              "Porfavor intentelo mas tarde"
            );
            break;
        }
      })
      .catch(() => {
        showToast("error", "Error inesperado", "Porfavor intentelo mas tarde");
      });
  };

  const EnviarRequisitos = () => {
    if (successfullApplication) {
      showToast(
        "info",
        "Espere un momento",
        "Recibira un correo con la informacion y requisitos, porfavor aguarde"
      );
      const srvDir = new ServerConnectionConfig();
      const srvReq = srvDir.getServer() + "/SendEmail";
      axios
        .post(srvReq, {
          destinatario: emailDest,
          tramite: nombre,
        })
        .then((response) => {
          switch (response.data.Code) {
            case 1:
              showToast(
                "success",
                "Correo enviado con exito",
                "En poco tiempo recibiras un correo con la informacion y requisitos del tramite"
              );
              break;
            default:
              showToast(
                "error",
                "Error inesperado",
                "Porfavor intentelo mas tarde"
              );
              break;
          }
        })
        .catch(() => {
          showToast(
            "error",
            "Error inesperado",
            "Porfavor intentelo mas tarde"
          );
        });
    }
  };

  const handleRequestSubmit = (event) => {
    event.preventDefault();
    if (Request.estatus === "") {
      showToast(
        "info",
        "Solicitud en proceso",
        "Su solicitud esta siendo procesada"
      );
      RegistrarSolicitud();
      EnviarRequisitos();
      successfullApplication = false;
    } else {
      showToast(
        "error",
        "Solicitud cancelada",
        "Usted ya cuenta con una solicitud en progreso"
      );
    }
  };

  return (
    <div className="nombreTramite">
      <Toast ref={toast} position="top-right" />
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
