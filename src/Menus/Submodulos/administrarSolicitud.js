import axios from "axios";
import { useEffect, useState } from "react";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";

function AdministrarSolicitud(DatosSolicitud) {
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
  const [documentList, setDocumentList] = useState();

  const conseguirDocumentos = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/retrieveDocuments";
    axios
      .post(srvReq, { solicitudID: DatosSolicitud.idSolicitud })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    conseguirDocumentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id="NuevaInterfaz" className="modules">
      <form class="w3-container">
        <label>Nombre del solicitante: </label>
        <label>
          {DatosSolicitud.nombreSolicitante ?? "No se ha cargado ninguna solicitud"}
        </label>
        <br />
        <br />
        <label>Trámite que solicita: </label>
        <label>
          {DatosSolicitud.tramiteSolicitado ?? "No se ha cargado ninguna solicitud"}
        </label>
        <br />
        <br />
        <label>Estatus actual: </label>
        <label>
          {DatosSolicitud.estatusAlMomento ?? "No se ha cargado ninguna solicitud"}
        </label>
        <br />
        <br />
        <label>Fecha en que se solicitó: </label>
        <label>
          {DatosSolicitud.fechaSolicitacion ?? "No se ha cargado ninguna solicitud"}
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
                width: barraProgresoEstatus[DatosSolicitud.estatusAlMomento ?? 0] + "%",
              }}
            >
              {barraProgresoEstatus[DatosSolicitud.estatusAlMomento ?? 0] + "%"}
            </div>
          </div>
        </div>
        <br />
        <br />
        <label>Fecha del último estatus: </label>
        <label>
          {DatosSolicitud.fechaUltimaActualizacion ?? "No se ha cargado ninguna solicitud"}
        </label>
        <br />
        <br />
        <label>Lista de documentos: </label>
        <br />
        <label>Documento con fotos de la patitas mimiendo</label>
        <br />
        <label>Documento con fotos de la patitas siendo patitas</label>
        <br />
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
      <button class="w3-button w3-green">Confirmar cambio de estatus</button>
      <br />
      <br />
      <button class="w3-button w3-green">Solicitar seguimiento</button>
    </div>
  );
}

export default AdministrarSolicitud;
