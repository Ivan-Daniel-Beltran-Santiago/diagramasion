const ComponenteSolicitud = ({
  ComponenteSolicitudRegistro,
  ComponenteSolicitudEstatusLexico,
  ComponenteSolicitudObtenerSolicitud,
}) => {
  return (
    <tr>
      <th>
        {ComponenteSolicitudRegistro
          ? ComponenteSolicitudRegistro.id_Solicitud
            ? ComponenteSolicitudRegistro.id_Solicitud
            : "ID no disponible."
          : "No hay solicitudes disponibles."}
      </th>
      <th>
        {ComponenteSolicitudRegistro
          ? ComponenteSolicitudRegistro.Usuario
            ? ComponenteSolicitudRegistro.Usuario.nombre_Completo !== ""
              ? ComponenteSolicitudRegistro.Usuario.nombre_Completo
              : "Solicitante no disponible."
            : "Solicitante no disponible."
          : "No hay solicitudes disponibles."}
      </th>
      <th>
        {ComponenteSolicitudRegistro
          ? ComponenteSolicitudRegistro.Tramite
            ? ComponenteSolicitudRegistro.Tramite.nombre_Tramite !== ""
              ? ComponenteSolicitudRegistro.Tramite.nombre_Tramite
              : "Tramite no disponible."
            : "Tramite no disponible."
          : "No hay solicitudes disponibles."}
      </th>
      <th>
        {ComponenteSolicitudRegistro
          ? ComponenteSolicitudRegistro.fecha_Solicitud !== ""
            ? ComponenteSolicitudRegistro.fecha_Solicitud.split("T")[0]
            : "Fecha no disponible."
          : "No hay solicitudes disponibles."}
      </th>
      <th>
        {ComponenteSolicitudRegistro
          ? ComponenteSolicitudRegistro.estatus_Actual !== ""
            ? ComponenteSolicitudEstatusLexico[
                ComponenteSolicitudRegistro.estatus_Actual
              ]
            : "Estatus no disponible."
          : "No hay solicitudes disponibles."}
      </th>
      <th>
        {ComponenteSolicitudRegistro
          ? ComponenteSolicitudRegistro.fecha_Actualizacion !== ""
            ? ComponenteSolicitudRegistro.fecha_Actualizacion.split("T")[0]
            : "Fecha no disponible."
          : "No hay solicitudes disponibles."}
      </th>
      <th>
        <button
          className="w3-button w3-green"
          onClick={() =>
            ComponenteSolicitudRegistro
              ? ComponenteSolicitudObtenerSolicitud(
                  ComponenteSolicitudRegistro.id_Solicitud,
                  true
                )
              : null
          }
        >
          {ComponenteSolicitudRegistro
            ? "Cargar Solicitud"
            : "No hay solicitudes disponibles."}
        </button>
      </th>
    </tr>
  );
};

export default ComponenteSolicitud;
