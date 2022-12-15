import axios from "axios";
import { Toast } from "primereact/toast";
import { useEffect, useState, useRef } from "react";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";

function AdministrarSolicitud({ matriculaSolicitud }) {
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
  const [documentList, setDocumentList] = useState([]);
  const [datosSolicitud, setDatosSolicitud] = useState({
    nombreSolicitante: "",
    tramiteSolicitado: "",
    estatusAlMomento: "",
    fechaSolicitacion: "",
    fechaUltimaActualizacion: "",
  });

  const conseguirDocumentos = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/retrieveDocuments";
    axios
      .post(srvReq, { solicitudID: matriculaSolicitud })
      .then((result) => {
        console.log(result.data);
        setDocumentList(result.data);
        console.log(documentList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const conseguirSolicitud = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/RequestUserApplication";
    //console.log(matriculaSolicitud);
    axios
      .post(srvReq, { matriculaUsuario: matriculaSolicitud })
      .then((result) => {
        setDatosSolicitud({
          nombreSolicitante: result.data[0].Usuario.nombre_Completo,
          tramiteSolicitado: result.data[0].Tramite.nombre_Tramite,
          estatusAlMomento: result.data[0].estatus_Actual,
          fechaSolicitacion: result.data[0].fecha_Solicitud,
          fechaUltimaActualizacion: result.data[0].fecha_Actualizacion,
          retroalimentacion: result.data[0].retroalimentacion,
          id_solicitud: result.data[0].id_Solicitud,
        });
        setDocumentList(result.data[0].Documentos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadDocument = (event) => {
    var idArchivo = event.target.id;
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/ObtainDocument";

    axios.post(srvReq, { documentoID: idArchivo }).then((result) => {
      console.log(result.data);
      /*
      const url = window.URL.createObjectURL(
        new Blob([result.data.archivo_Documento], { type: "application/pdf" })
      );
      var element = document.getElementById(idArchivo);
      element.href = url;
      element.setAttribute("download", result.data.nombre_Documento);
      */
    });
  };

  const actualizarSolicitud = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/updateApplication";
    let textoRetro = document.getElementById("retro").value;
    let idEvento = document.getElementById("lang").value;
    //console.log(idEvento)
    axios
      .post(srvReq, {
        estatusAnterior: datosSolicitud.estatusAlMomento,
        retroAnterior: datosSolicitud.retroalimentacion,
        id: datosSolicitud.id_solicitud,
        nuevoEstatus: idEvento,
        retroNueva: textoRetro,
      })
      .then((response) => {
        switch (response.data.Code) {
          case 1:
            showToast(
              "success",
              "Solicitud actualizada",
              "La actualizacion a sido exitosa"
            );
            break;
          case -1:
            showToast(
              "error",
              "Actualizacion incorrecta",
              "Porfavor cheque los datos"
            );
            break;
          default:
            showToast("warn", "Error inesperado", "Intentelo mas tarde");
            break;
        }
      });
  };

  const solicitarSeguimiento = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/SendSeguimientoEmail";
    axios
      .post(srvReq, {
        destinatario: "l19330593@hermosillo.tecnm.mx",
        folio: datosSolicitud.id_solicitud,
        nombre: datosSolicitud.nombreSolicitante,
      })
      .then((response) => {
        console.log(response.data);
        switch (response.data.Code) {
          case 1:
            showToast(
              "success",
              "Correo enviado",
              "La solicitud de seguimiento a sido enviada."
            );
            break;
          case -1:
            showToast(
              "error",
              "Correo no enviado",
              "Porfavor confirme los datos"
            );
            break;
          default:
            showToast("warn", "Error inesperado", "Intentelo mas tarde");
            break;
        }
      });
  };

  useEffect(() => {
    conseguirSolicitud();
    //conseguirDocumentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id="NuevaInterfaz" className="modules">
      <Toast ref={toast} position="top-right" />
      <div className="newInterface_container">
        <div className="row_1_administrarSolicitud">
          <form className="w3-container">
            <label>Nombre del solicitante: </label>
            <label>
              {datosSolicitud.nombreSolicitante ??
                "No se ha cargado ninguna solicitud"}
            </label>
            <br />
            <br />
            <label>Trámite que solicita: </label>
            <label>
              {datosSolicitud.tramiteSolicitado ??
                "No se ha cargado ninguna solicitud"}
            </label>
            <br />
            <br />
            <label>Estatus actual: </label>
            <label>
              {datosSolicitud.estatusAlMomento
                ? estatusLexico[datosSolicitud.estatusAlMomento]
                : "No se ha cargado ninguna solicitud"}
            </label>
            <br />
            <br />
            <label>Fecha en que se solicitó: </label>
            <label>
              {datosSolicitud.fechaSolicitacion ??
                "No se ha cargado ninguna solicitud"}
            </label>
            <br />
            <br />
            <div>
              <label>Progreso de la solicitud: </label>

              <div className="progressBar">
                <div
                  id="progreso"
                  className="progresando"
                  style={{
                    width:
                      barraProgresoEstatus[
                        datosSolicitud.estatusAlMomento ?? 0
                      ] + "%",
                  }}
                >
                  {barraProgresoEstatus[datosSolicitud.estatusAlMomento ?? 0] +
                    "%"}
                </div>
              </div>
            </div>
            <br />
            <br />
            <label>Fecha del último estatus: </label>
            <label>
              {datosSolicitud.fechaUltimaActualizacion ??
                "No se ha cargado ninguna solicitud"}
            </label>
            <br />
            <br />
            <label>Lista de documentos: </label>
            <br />
            <br />
            {documentList !== undefined &&
              documentList.map(function (item) {
                return (
                  <div className="documentList">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                    <a id={item.id_Documento} onClick={downloadDocument}>
                      {item.nombre_Documento}
                    </a>
                    <br />
                  </div>
                );
              })}
            <br />
          </form>
        </div>
        <div className="row_2_administrarSolicitud">
          <form className="w3-container">
            <label>Cambiar estatus: </label>
            <br />
            <br />
            <form className="w3-container">
              <select name="lenguajes" id="lang">
                <option value="3">{estatusLexico[3]}</option>
                <option value="4">{estatusLexico[4]}</option>
                <option value="5">{estatusLexico[5]}</option>
                <option value="6">{estatusLexico[6]}</option>
                <option value="7">{estatusLexico[7]}</option>
                <option value="9">{estatusLexico[9]}</option>
                <option value="10">{estatusLexico[10]}</option>
                <option value="11">{estatusLexico[11]}</option>
                <option value="12">{estatusLexico[12]}</option>
              </select>
            </form>
            <br />
            <label>Retroalimentación: </label>
            <br />
            <textarea
              name="retroalimentacion"
              cols="48"
              rows="8"
              id="retro"
            ></textarea>
          </form>
          <br />
          <button class="w3-button w3-green" onClick={actualizarSolicitud}>
            Confirmar cambio de estatus
          </button>
          <br />
          <br />
          <button class="w3-button w3-green" onClick={solicitarSeguimiento}>
            Solicitar seguimiento
          </button>
        </div>
      </div>
      <div className="requestInvoice">
        <label>Folio de solicitud: </label>
        <br />
        <br />
        <textarea
          name="retroalimentacion"
          cols="80"
          rows="1"
          id="retro"
        ></textarea>
      </div>
    </div>
  );
}

export default AdministrarSolicitud;
