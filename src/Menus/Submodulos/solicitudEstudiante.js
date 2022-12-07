import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";
import { Toast } from "primereact/toast";

function SolicitudEstudiante({ UserApplication }) {
  const [requestData, setRequestData] = useState({
    fecha_inicio: "",
    tramite: "",
    estatus: "",
    retroalim: "",
  });
  const [filesToUpload, setFilesToUpload] = useState(null);

  const estatusLexico = {
    1: "Solicitud iniciada, en espera de documentos",
    2: "Documentos subidos, en espera de revisión",
  };

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

  const onChangeHandler = (event) => {
    setFilesToUpload(event.target.files);
  };

  const SubirDocumentos = async (event) => {
    event.preventDefault();

    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/UploadDocuments";

    const data = new FormData();
    for (var x = 0; x < filesToUpload.length; x++) {
      if (filesToUpload[x].size >= 2000000) {
        showToast(
          "error",
          "Archivo demasiado grande\n" + filesToUpload[x].name,
          "Los archivos no deben superar los 2MB de tamaño"
        );
        return;
      }
      data.append("file", filesToUpload[x]);
    }

    for (var documento of data.entries()) {
      if (documento[1].size >= 2000000) {
        showToast(
          "error",
          "Archivo muy pesado:\n" + documento[1].name,
          "Solo se permiten archivos de 2 MB"
        );
        return;
      }
      await axios
        .post(srvReq, {
          fileName: documento[1].name,
          fileBlob: documento[1],
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setRequestData(
      UserApplication ?? {
        fecha_inicio: "",
        tramite: "",
        estatus: 0,
        retroalim: "",
      }
    );
  }, [UserApplication]);

  return (
    <div id="solicitudEstudiante" className="modules">
      <Toast ref={toast} position="top-right" />
      <div className="contenedorSolicitud">
        <p>
          <label>Fecha en la que se solicitó: </label>
          {requestData.fecha_inicio === ""
            ? "No se encontro ninguna solicitud "
            : requestData.fecha_inicio}
        </p>
        <p>
          <label>Trámite solicitado: </label>
          {requestData.tramite === ""
            ? "No se encontro ninguna solicitud "
            : requestData.tramite}
        </p>
        <p>
          <label>Estatus: </label>
          {requestData.estatus > 0
            ? estatusLexico[requestData.estatus]
            : "No se encontro ninguna solicitud "}
        </p>
        <p>
          <label>Retroalimentación disponible</label>
        </p>
        <pre>
          {requestData.retroalim === ""
            ? "No se encontro ninguna solicitud "
            : requestData.retroalim}
        </pre>
        <input
          type="file"
          id="subirArchivos"
          name="Elegir archivos"
          accept=".pdf"
          multiple
          onChange={onChangeHandler}
        ></input>
        <p>
          <input
            type="submit"
            className="confirmDocumentUpload"
            value="Confirmar subida de documentos"
            onClick={SubirDocumentos}
          ></input>
        </p>
      </div>
      <div>
        <div className="progressBar">
          <div id="progreso" className="progresando">
            0%
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolicitudEstudiante;
