import axios from "axios";
import { Toast } from "primereact/toast";
import { useEffect, useState, useRef } from "react";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";

function AdministrarSolicitud() {

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
      .post(srvReq, { solicitudID: "1" })
      .then((result) => {
        console.log(result.data);
        setDocumentList(result.data);
        console.log(documentList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const conseguirSolicitudDebug = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/RequestUserApplication";
    axios
      .post(srvReq, { matriculaUsuario: "19330593" })
      .then((result) => {
        setDatosSolicitud({
          nombreSolicitante: result.data[0].Usuario.nombre_Completo,
          tramiteSolicitado: result.data[0].Tramite.nombre_Tramite,
          estatusAlMomento: result.data[0].estatus_Actual,
          fechaSolicitacion: result.data[0].fecha_Solicitud,
          fechaUltimaActualizacion: result.data[0].fecha_Actualizacion,
          retroalimentacion: result.data[0].retroalimentacion,
          id_solicitud: result.data[0].id_Solicitud
        });
        setDocumentList(result.data[0].Documentos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadDocument = (event) => {
    var idArchivo = event.target.id - 1;
    var archivo = documentList.at(idArchivo);
    console.log(archivo);
  };

  const actualizarSolicitud = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/updateApplication";
    axios
      .post(srvReq, {estatusAnterior: datosSolicitud.estatusAlMomento, 
        retroAnterior: datosSolicitud.retroalimentacion, 
        id: datosSolicitud.id_solicitud, nuevoEstatus: 3})  //configurar el id y el estatus a dinamico
      .then((response) => {
        console.log(response.data)
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
      })
  }

  const solicitarSeguimiento = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/SendSeguimientoEmail";
    axios
      .post(srvReq, {destinatario: "l19330593@hermosillo.tecnm.mx", 
      folio:  datosSolicitud.id_solicitud, nombre: datosSolicitud.nombreSolicitante})  
      .then((response) => {
        console.log(response.data)
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
      })
  }

  useEffect(() => {
    conseguirSolicitudDebug();
    //conseguirDocumentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id="NuevaInterfaz" className="modules">
    <Toast ref={toast} position="top-right" />
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
                  barraProgresoEstatus[datosSolicitud.estatusAlMomento ?? 0] +
                  "%",
              }}
            >
              {barraProgresoEstatus[datosSolicitud.estatusAlMomento ?? 0] + "%"}
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
        {documentList &&
          documentList.map(function (item) {
            return (
              <div>
                <label id={item.id_Doc} onClick={downloadDocument}>
                  {item.nombre_Doc}
                </label>
                <br />
              </div>
            );
          })}
        <br />
      </form>
      <form className="w3-container">
        <label>Cambiar estatus: </label>
        <form className="w3-container">
          <select name="lenguajes" id="lang">
            <option value="estatus3">{estatusLexico[3]}</option>
            <option value="estatus4">{estatusLexico[4]}</option>
            <option value="estatus5">{estatusLexico[5]}</option>
            <option value="estatus6">{estatusLexico[6]}</option>
            <option value="estatus7">{estatusLexico[7]}</option>
            <option value="estatus9">{estatusLexico[9]}</option>
            <option value="estatus10">{estatusLexico[10]}</option>
            <option value="estatus11">{estatusLexico[11]}</option>
            <option value="estatus12">{estatusLexico[12]}</option>
          </select>
        </form>
        <br />
        <label>Retroalimentación: </label>
        <br />
        <textarea name="retroalimentacion" cols="120" rows="8"></textarea>
      </form>
      <br />
      <button class="w3-button w3-green" onClick={actualizarSolicitud}>Confirmar cambio de estatus</button>
      <br />
      <br />
      <button class="w3-button w3-green" onClick={solicitarSeguimiento}>Solicitar seguimiento</button>
    </div>
  );
}

export default AdministrarSolicitud;
