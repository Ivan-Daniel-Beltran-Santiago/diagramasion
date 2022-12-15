import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";
import { Toast } from "primereact/toast";
import { FaTrash } from "react-icons/fa";

function SolicitudEstudiante({ currentUserInformation }) {
  const [requestData, setRequestData] = useState({
    id: 0,
    fecha_inicio: "",
    tramite: "",
    estatus: "",
    retroalim: "",
  });

  const [loadedFiles, setLoadedFiles] = useState([]);
  const [validatedFiles, setValidatedFiles] = useState([]);

  const estatusLexico = {
    0: "No se encontro ninguna solicitud",
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

  const barraProgresoEstatus = {
    1: 0,
    2: 20,
    3: 15,
    4: 40,
    5: 50,
    6: 75,
    7: 55,
    8: 65,
    9: 55,
    10: 75,
    11: 80,
    12: 100,
  };

  const progresionEstatus = {
    1: 2,
    3: 2,
    7: 8,
    9: 8,
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

  const handleRemoveFile = (archivo) => {
    const loaded = [...loadedFiles];
    const index = loaded.indexOf(archivo);
    loaded.splice(index, 1);
    document.getElementById(index).style.color = "";
    setLoadedFiles(loaded);
  };

  const handleLoadedFiles = (files) => {
    const loaded = [...loadedFiles];
    // eslint-disable-next-line array-callback-return
    files.some((file) => {
      if (loaded.findIndex((f) => f.name === file.name) === -1) {
        loaded.push(file);
      }
    });
    setLoadedFiles(loaded);
  };

  const handleFileEvent = (event) => {
    const chosenFiles = Array.prototype.slice.call(event.target.files);
    setValidatedFiles([]);
    handleLoadedFiles(chosenFiles);
  };

  const handleValidatedFiles = (files) => {
    const validFiles = [...validatedFiles];
    // eslint-disable-next-line array-callback-return
    files.some((file) => {
      if (validFiles.findIndex((f) => f.name === file.name) === -1) {
        validFiles.push(file);
      }
    });
    setValidatedFiles(validFiles);
  };

  const validateDocuments = () => {
    setValidatedFiles([]);
    var validated = [];
    for (var indice = 0; indice < loadedFiles.length; indice++) {
      delay(1000);
      if (loadedFiles[indice].size > 2000000) {
        document.getElementById(
          loadedFiles.indexOf(loadedFiles[indice])
        ).style.color = "#ff0000";
      } else {
        const pdfNameValidator = new RegExp("[a-zA-Z0-9-_\\/]+\\.pdf");
        const isPdfNameValid = pdfNameValidator.test(loadedFiles[indice].name);
        if (isPdfNameValid) {
          // eslint-disable-next-line no-loop-func
          validated.push(loadedFiles[indice]);
          document.getElementById(
            loadedFiles.indexOf(loadedFiles[indice])
          ).style.color = "";
        } else {
          document.getElementById(
            loadedFiles.indexOf(loadedFiles[indice])
          ).style.color = "#ff0000";
        }
      }
    }
    handleValidatedFiles(validated);
  };

  const uploadDocuments = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/UploadDocuments";
    const formData = new FormData();
    for (var indice = 0; indice < validatedFiles.length; indice++) {
      formData.append(
        "pdf",
        validatedFiles[indice],
        validatedFiles[indice].name
      );
    }
    formData.append("text", requestData.id);
    axios
      .post(srvReq, formData, { idSolicitud: requestData.id })
      .then((result) => {
        console.log("A mimir");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const obtenerSolicitud = useCallback(() => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/RequestUserApplication";
    axios
      .post(srvReq, {
        matriculaUsuario: currentUserInformation.controlNumber,
      })
      .then((result) => {
        setRequestData({
          id: result.data[0]
            ? result.data[0].id_Solicitud
            : "No se encontro ninguna solicitud ",
          fecha_inicio: result.data[0]
            ? result.data[0].fecha_Solicitud
            : "No se encontro ninguna solicitud ",
          tramite: result.data[0]
            ? result.data[0].Tramite.nombre_Tramite
            : "No se encontro ninguna solicitud ",
          estatus: result.data[0] ? result.data[0].estatus_Actual : 0,
          retroalim: result.data[0]
            ? result.data[0].retroalimentacion_Actual
            : "No se encontro ninguna solicitud ",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentUserInformation]);

  const actualizarSolicitud = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/updateApplication";
    axios
      .post(srvReq, {
        id: requestData.id,
        nuevoEstatus: progresionEstatus[requestData.estatus],
        estatusAnterior: requestData.estatus,
        retroAnterior: requestData.retroalim,
      })
      .then((result) => {
        console.log(result);
        obtenerSolicitud();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    obtenerSolicitud();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="solicitudEstudiante" className="modules">
      <Toast ref={toast} position="top-right" />
      <div className="contenedorSolicitud">
        <p>
          <label>Fecha en la que se solicitó: </label>
          {requestData.fecha_inicio}
        </p>
        <p>
          <label>Trámite solicitado: </label>
          {requestData.tramite}
        </p>
        <p>
          <label>Estatus: </label>
          {estatusLexico[requestData.estatus]}
        </p>
        <p>
          <label>Retroalimentación disponible</label>
        </p>
        <pre>{requestData.retroalim}</pre>
        {(requestData.estatus === 1 ||
          requestData.estatus === 3 ||
          requestData.estatus === 7) && (
          <div>
            <br />
            <input
              type="file"
              id="subirArchivos"
              name="Elegir archivos"
              accept=".pdf"
              multiple
              onChange={handleFileEvent}
              style={{ display: "none" }}
            ></input>
            <label htmlFor="subirArchivos">
              <a className="w3-btn w3-light-blue">
                Seleccionar documentos para subir
              </a>
            </label>
            <br />
            <p>Los documentos deben tener un peso maximo de 2MB.</p>
            <p>
              El nombre de los documentos solo puede tener letras, digitos,
              espacios, -, _ , /, \ y sin espacio antes del .pdf
            </p>
            <p>
              <label>Documentos preparados para subir: </label>
              <br />
              {loadedFiles !== undefined &&
                loadedFiles.length > 0 &&
                loadedFiles.map((file) => (
                  <div>
                    <FaTrash onClick={() => handleRemoveFile(file)} />
                    <label id={loadedFiles.indexOf(file)}>{file.name}</label>
                    <br />
                  </div>
                ))}
            </p>
            <p>
              <input
                type="submit"
                className="confirmDocumentUpload"
                value="Validar documentos"
                id="cargarDocumentosBtn"
                onClick={validateDocuments}
                style={{ display: loadedFiles.length > 0 ? "block" : "none" }}
              ></input>
            </p>
            <p>
              <input
                type="submit"
                className="confirmDocumentUpload"
                value="Subir documentos"
                id="subirDocumentosBtn"
                onClick={uploadDocuments}
                style={{
                  display:
                    loadedFiles.length > 0 && validatedFiles.length > 0
                      ? "block"
                      : "none",
                }}
              ></input>
            </p>
          </div>
        )}
      </div>
      <div>
        {requestData.estatus > 0 && requestData.estatus < 10 && (
          <div>
            <label>Progreso de la solicitud: </label>

            <div className="progressBar">
              <div
                id="progreso"
                className="progresando"
                style={{
                  width: barraProgresoEstatus[requestData.estatus ?? 0] + "%",
                }}
              >
                {barraProgresoEstatus[requestData.estatus ?? 0] + "%"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SolicitudEstudiante;
