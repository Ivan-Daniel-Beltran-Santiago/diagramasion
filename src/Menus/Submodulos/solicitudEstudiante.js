import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";
import { Toast } from "primereact/toast";
import ListaDocumentos from "../../View/Secondary/listaDocumentos";
import { act } from "react-dom/test-utils";

function SolicitudEstudiante({ currentUserInformation }) {
  const [requestData, setRequestData] = useState({
    id: 0,
    fecha_inicio: "",
    tramite: "",
    estatus: "",
    retroalim: "",
  });
  const [filesToVerify, setFilesToVerify] = useState(null);
  const [filesToUpload, setFilesToUpload] = useState(null);

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

  const onChangeHandler = (event) => {
    setFilesToVerify(event.target.files);
  };

  const SubirDocumentos = async (event) => {
    event.preventDefault();

    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/UploadDocuments";

    for (var documento of filesToUpload.entries()) {
      var buffer = await documento[1].arrayBuffer();
      var bytes = new Uint8Array(buffer);
      showToast(
        "info",
        "Subiendo documento",
        "Estamos preparando para subir el documento: " + documento[1].name
      );
      axios
        .post(srvReq, {
          documentoName: documento[1].name,
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
              "El documento: " + documento[1].name + " ha sido subido con exito"
            );
            delay(1000);
            document.getElementById("subirArchivos").value = null;
            //setUploadedFiles(true);
          } else {
            delay(1000);
            showToast(
              "error",
              "Error al subir el documento",
              "El documento: " +
                documento[1].name +
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
    actualizarSolicitud();
  };

  const validarDocumentos = async (event) => {
    event.preventDefault();

    var data = new FormData();

    for (var x = 0; x < filesToVerify.length; x++) {
      const pdfNameValidator = new RegExp("[a-zA-Z0-9-_\\/]+\\.pdf");
      const isPdfNameValid = pdfNameValidator.test(filesToVerify[x].name);
      if (filesToVerify[x].size >= 2000000) {
        showToast(
          "error",
          "Tamaño de archivo",
          "El documento: " + filesToVerify[x].name + " excede el peso de 2MB"
        );
      } else if (!isPdfNameValid) {
        showToast(
          "error",
          "Formato de nombre",
          "El documento: " +
            filesToVerify[x].name +
            " tiene un formato de nombre no permitido."
        );
      } else {
        data.append("file", filesToVerify[x]);
        setFilesToUpload(data);
      }
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
            ? result.data[0].retroalimentacion
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
                onClick={validarDocumentos}
              ></input>
            </p>
            <p>
              <input
                type="submit"
                className="confirmDocumentUpload"
                value="Terminar de subir documentos"
                onClick={SubirDocumentos}
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
