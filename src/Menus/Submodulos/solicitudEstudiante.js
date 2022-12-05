import { useEffect, useRef, useState } from "react";

function SolicitudEstudiante({ UserApplication }) {
  const [requestData, setRequestData] = useState({
    fecha_inicio: "",
    tramite: "",
    estatus: "",
    retroalim: "",
  });

  const uploadingDocuments = useRef(null);

  const estatusLexico = {
    1: "Solicitud iniciada, en espera de documentos",
    2: "Documentos subidos, en espera de revisión",
  };

  const SubirDocumentos = (event) => {
    event.preventDefault();
    console.log(uploadingDocuments.current.value);
    document.getElementById("subirArchivos").value = "";
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
          ref={uploadingDocuments}
          id="subirArchivos"
          name="Elegir archivos"
          accept=".pdf"
          multiple
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
