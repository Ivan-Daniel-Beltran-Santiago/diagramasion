function RegistroSolicitud({ registro, usuario, tramite }) {
  return (
    <tr>
      <th>{registro.id_S}</th>
      <th>{usuario.nombre_C ?? "No Disponible"}</th>
      <th>{tramite.nombre_T ?? "NoDisponible"}</th>
      <th>{registro.fecha_Sol}</th>
      <th>{registro.estatus}</th>
      <th>{registro.fecha_Act}</th>
    </tr>
  );
}

export default RegistroSolicitud;
