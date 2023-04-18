import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";
import { Toast } from "primereact/toast";

const SolicitarRegistroTramite = ({
  idTramite,
  nombre,
  informacion,
  requisitos,
  User,
}) => {
  const [isActive, setIsActive] = useState(false);

  const [transactionMetadata, setTransactionMetadata] = useState({
    trInfo: "",
    trReq: "",
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

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const RegistrarSolicitud = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/NewUserApplication";
    axios
      .post(srvReq, {
        estudiante_S: User.controlNumber,
        tramite_S: idTramite,
      })
      .then((response) => {
        switch (response.data.Code) {
          case 1:
            showToast(
              "success",
              "Solicitud registrada con exito",
              "Su solicitud ha sido procesada exitosamente"
            );
            delay(2000);
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
    showToast(
      "info",
      "Espere un momento",
      "Recibira un correo con la informacion y requisitos, porfavor aguarde"
    );
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/SendEmail";
    axios
      .post(srvReq, {
        destinatario: User.eMail,
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
        showToast("error", "Error inesperado", "Porfavor intentelo mas tarde");
      });
  };

  const handleRequestSubmit = async (event) => {
    event.preventDefault();
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/UserHasApplication";
    let check = false;
    await axios
      .post(srvReq, { matriculaUsuario: User.controlNumber })
      .then((result) => {
        check = result.data.hasApplication;
      })
      .catch((error) => {
        console.log(error);
      });
    if (!check) {
      showToast(
        "info",
        "Solicitud en proceso",
        "Su solicitud esta siendo procesada"
      );
      delay(2000);
      RegistrarSolicitud();
      delay(1000);
      showToast(
        "info",
        "Espere un momento",
        "Se le enviara un correo con los requisitos"
      );
      delay(1000);
      EnviarRequisitos();
      delay(1000);
    } else {
      showToast(
        "error",
        "Solicitud cancelada",
        "Usted ya cuenta con una solicitud en progreso"
      );
    }
  };

  useEffect(() => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/RequisitosTramite";
    axios
      .post(srvReq, {
      })
      .then((response) => {
        console.log(response.data)
        let requisitos = "";
        let cantidadR = response.data.result.count - 1;
        for (let i=1; i <= cantidadR; i++){
          requisitos= requisitos + response.data.result.rows[i].texto
          requisitos = requisitos.replace("\\n","")
          requisitos = requisitos.replace("\\","")
        }
        console.log(requisitos)
        if(response.data.Code === 1){
          setTransactionMetadata({
            trInfo: response.data.result.rows[0].texto,
            trReq: requisitos
          });
        }
      })
      .catch(() => {
        showToast("error", "Error inesperado", "Porfavor intentelo mas tarde");
      });
    console.log(requisitos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
