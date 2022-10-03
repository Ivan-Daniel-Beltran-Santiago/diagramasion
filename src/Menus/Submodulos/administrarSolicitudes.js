function AdmnistrarSolicitudes() {
  return (
    <div id="administrarSolicitudes">
      <div>
        <button className="button">Documentos Cargados</button>
        <button className="button">Solicitud aceptada, en espera</button>
        <button className="button">Solicitud aprobada y finiquito en espera</button>
      </div>
      <section className="listContainer">
        <table className="tablas">
          <tbody>
            <tr className="Cabecera">
              <th>ID de la Solicitud</th>
              <th>Tramite Solicitado</th>
              <th>Fecha de Solicitud</th>
              <th>Estatus Actual</th>
              <th>Fecha de Ultima Actualización</th>
            </tr>
            <tr>
              <th>39</th>
              <th>Orfandad</th>
              <th>23/10/2077</th>
              <th>Recien iniciada</th>
              <th>-</th>
            </tr>
            <tr className="registroPar">
              <th>666</th>
              <th>Orfandad</th>
              <th>01/01/0001</th>
              <th>En espera del deposito</th>
              <th>31/12/2021</th>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdmnistrarSolicitudes;
