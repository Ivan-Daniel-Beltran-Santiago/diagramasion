function SolicitudEstudiante() {
  return (
    <div id="solicitudEstudiante" className="modules">
      <div className="contenedorSolicitud">
        <p>
          <label>Fecha en la que se solicitó: 23/10/2077</label>
        </p>
        <p>
          <label>Trámite solicitado: Nombre del trámite solicitado</label>
        </p>
        <p>
          <label>Estatus: Estatus en el que se encuentra la solicitud</label>
        </p>
        <p>
          <label>Retroalimentación disponible</label>
        </p>
        <pre>
          Aquí se encuentra la posible retroalimentación recibida de la
          encargada, <br></br>
          la cual puede darnos una idea más clara de qué está pasando con
          respecto a <br></br>
          anomalias, o simplemente un mensaje de confirmación.
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
