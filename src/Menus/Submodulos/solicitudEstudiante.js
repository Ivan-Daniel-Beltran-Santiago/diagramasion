import { useEffect, useState } from "react";

function SolicitudEstudiante({ UserApplication }) {
  const [requestData, setRequestData] = useState({
    fecha_inicio: "",
    tramite: "",
    estatus: "",
    retroalim: "",
  });

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
          {requestData.fecha_inicio ?? "No se encontro ninguna solicitud "}
        </p>
        <p>
          <label>Trámite solicitado: </label>
          {requestData.tramite ?? "No se encontro ninguna solicitud "}
        </p>
        <p>
          <label>Estatus: </label>
          {requestData.estatus > 0
            ? requestData.estatus
            : "No se encontro ninguna solicitud "}
        </p>
        <p>
          <label>Retroalimentación disponible</label>
        </p>
        <pre>
          {requestData.retroalim ?? "No se encontro ninguna solicitud "}
        </pre>
        <input type="file" id="subirArchivos" name="Elegir archivos"></input>
        <p>
          <input
            type="submit"
            className="confirmDocumentUpload"
            value="Confirmar subida de documentos"
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
