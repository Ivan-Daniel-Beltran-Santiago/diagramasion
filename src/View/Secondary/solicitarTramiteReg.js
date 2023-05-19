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
    trReq1: "error",
    trReq3: "error",
    trReq4: "error",
    trReq2: "error",
    trReq5: "error",
    trReq6: "error",
    trReq7: "error",
    trReq8: "error",
    trReq9: "error",
    trReq10: "error",
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
    const srvReq = srvDir.getServer() + "/solicitudes/nueva";
    axios
      .post(srvReq, {
        estudianteSolicitante: User.controlNumber,
        tramiteSolicitado: idTramite,
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
        //console.log(response.data)
        let cantidadR = response.data.result.count - 1;
        for (let i = 1; i <= cantidadR; i++) {
          requisitos = response.data.result.rows[i].texto
          requisitos = requisitos.replace("\\n", "-")
          requisitos = requisitos.replace("\\", "-")
          response.data.result.rows[i].texto = requisitos;
        }
        if (response.data.Code === 1) {
          setTransactionMetadata({
            trInfo: response.data.result.rows[0].texto,
            trReq1: response.data.result.rows[1].texto,
            trReq2: response.data.result.rows[2].texto,
            trReq3: response.data.result.rows[3].texto,
            trReq4: response.data.result.rows[4].texto,
            trReq5: response.data.result.rows[5].texto,
            trReq6: response.data.result.rows[6].texto,
            trReq7: response.data.result.rows[7].texto,
            trReq8: response.data.result.rows[8].texto,
            trReq9: response.data.result.rows[9].texto,
            trReq10: response.data.result.rows[10].texto,
          });
        }
      })
      .catch(() => {
        showToast("error", "Error inesperados", "Porfavor intentelo mas tarde");
      });

    //console.log(requisitos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="nombreTramite">
      <Toast ref={toast} position="top-right" />
      <div className="accordion-item">
        <div className="tituloAcordeon" onClick={() => setIsActive(!isActive)}>
          <div className="Indicador">{nombre}</div>
          <div>{isActive ? "-" : "+"}</div>
        </div>
        {isActive && (
          <div className="contenidoAcordeon">
            <br />
            <p>
              <label className="Indicador">Información:  </label> <br />
              {transactionMetadata.trInfo === ""
                ? "Información no disponible"
                : transactionMetadata.trInfo}
            </p>
            <p>
              <label className="Indicador">Requisitos: </label>   <br />
              {transactionMetadata.trReq1}  <br />
              {transactionMetadata.trReq2}  <br />
              {transactionMetadata.trReq3}  <br />
              {transactionMetadata.trReq4}  <br />
              {transactionMetadata.trReq5}  <br />
              {transactionMetadata.trReq6}  <br />
              {transactionMetadata.trReq7}  <br />
              {transactionMetadata.trReq8}  <br />
              {transactionMetadata.trReq9}  <br />
              {transactionMetadata.trReq10} <br />
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
