import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";
import { Toast } from "primereact/toast";

function SolicitudEstudiante({ currentUserInformation }) {
  const [requestData, setRequestData] = useState({
    id: 0,
    fecha_inicio: "",
    tramite: "",
    estatus: "",
    retroalim: "",
  });
  const [filesToUpload, setFilesToUpload] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState(false);

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

  const onChangeHandler = (event) => {
    setFilesToUpload(event.target.files);
  };

  const SubirDocumentos = async (event) => {
    event.preventDefault();

    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/UploadDocuments";

    const data = new FormData();
    let validDocuments = true;
    for (var x = 0; x < filesToUpload.length; x++) {
      const pdfNameValidator = new RegExp("[a-zA-Z0-9-_\\/]+\\.pdf");
      const isPdfNameValid = pdfNameValidator.test(filesToUpload[x].name);
      delay(1000);
      showToast(
        "info",
        "Analizando documento",
        "Verificaremos la validez de: " + filesToUpload[x].name
      );
      delay(1000);
      if (filesToUpload[x].size >= 2000000) {
        delay(1000);
        showToast(
          "error",
          "Tamaño de archivo",
          "El documento: " + filesToUpload[x].name + " excede el peso de 2MB"
        );
        delay(1000);
        validDocuments = false;
      }
      if (!isPdfNameValid) {
        delay(1000);
        showToast(
          "error",
          "Formato de nombre",
          "El documento: " +
            filesToUpload[x].name +
            " tiene un formato de nombre no permitido."
        );
        delay(1000);
        validDocuments = false;
      }
      if (validDocuments) data.append("file", filesToUpload[x]);
    }
    for (var doc of data.entries()) {
      var buffer = await doc[1].arrayBuffer();
      var bytes = new Uint8Array(buffer);
      delay(1000);
      showToast(
        "info",
        "Subiendo documento",
        "Estamos preparando para subir el documento: " + doc[1].name
      );
      delay(1000);
      axios
        .post(srvReq, {
          documentoName: doc[1].name,
          idSolicitud: requestData.id,
          bytes,
        })
        // eslint-disable-next-line no-loop-func
        .then((result) => {
          if (result.data.Code > 0) {
            delay(1000);
            showToast(
              "success",
              "Documento subido",
              "El documento: " + doc[1].name + " ha sido subido con exito"
            );
            delay(1000);
            document.getElementById("subirArchivos").value = null;
            setUploadedFiles(true);
          } else {
            delay(1000);
            showToast(
              "error",
              "Error al subir el documento",
              "El documento: " +
                doc[1].name +
                " no se ha podido subir, intente mas tarde"
            );
            delay(1000);
            document.getElementById("subirArchivos").value = null;
          }
        })
        .catch((error) => {
          console.log(error);
          delay(1000);
          showToast(
            "error",
            "Error al subir el documento",
            "Intente mas tarde"
          );
          delay(1000);
          document.getElementById("subirArchivos").value = null;
        });
    }
  };

  const obtenerSolicitud = useCallback(() => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/RequestUserApplication";
    axios
      .post(srvReq, {
        matriculaUsuario: currentUserInformation.controlNumber,
      })
      .then((result) => {
        console.log(result.data);
        setRequestData({
          id: result.data[0].id,
          fecha_inicio: result.data[0].fecha_Sol,
          tramite: result.data[0].Tramite.nombre_T ?? "No disponible",
          estatus: result.data[0].estatus,
          retroalim: result.data[0].retroalimentacion,
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
        retralimentacion: requestData.retroalim,
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
        {(requestData.estatus === 1 ||
          requestData.estatus === 3 ||
          requestData.estatus === 7) && (
          <div>
            <br />
            <label>Para subir documentos, seleccionelos aqui: </label>
            <br />
            <input
              type="file"
              id="subirArchivos"
              name="Elegir archivos"
              accept=".pdf"
              multiple
              onChange={onChangeHandler}
            ></input>
            <br />
            <p>
              <input
                type="submit"
                className="confirmDocumentUpload"
                value="Confirmar subida de documentos"
                onClick={SubirDocumentos}
              ></input>
            </p>
            <p>
              <input
                type="submit"
                className="confirmDocumentUpload"
                value="Terminar de subir documentos"
                onClick={() => {
                  if (uploadedFiles) {
                    actualizarSolicitud();
                  }
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
              <div id="progreso" className="progresando" value="0%">
                0%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SolicitudEstudiante;
