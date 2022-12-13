function RegistroSolicitud({ registro, usuario, tramite, singleApp }) {
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

  return (
    <tr>
      <th>{registro.id_Solicitud}</th>
      <th>{usuario.nombre_Completo ?? "No Disponible"}</th>
      <th>{tramite.nombre_Tramite ?? "NoDisponible"}</th>
      <th>{registro.fecha_Solicitud}</th>
      <th>{estatusLexico[registro.estatus_Actual]}</th>
      <th>{registro.fecha_Actualizacion}</th>
      <th>
        <button
          className="w3-button w3-green"
          onClick={(event) => {
            singleApp({
              nombreSolicitante: usuario.nombre_Completo,
              tramiteSolicitado: tramite.nombre_Tramite,
              estatusAlMomento: registro.estatus_Actual,
              fechaSolicitacion: registro.fecha_Solicitud,
              fechaUltimaActualizacion: registro.fecha_Actualizacion,
              documentosAsociados: [],
            });
          }}
        >
          Cargar
        </button>
      </th>
    </tr>
  );
}

export default RegistroSolicitud;
