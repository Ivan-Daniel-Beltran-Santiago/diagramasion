function AdministracionGeneral() {
  return (
    <div
      id="administracionGeneral"
      className="modules"
    >
      <div className="dateContainer">
        <p>
          <label className="labelDate">Fecha de inicio</label>
        </p>
        <input type="date" className="dates"></input>
        <p>
          <label className="labelDate">Fecha de finalización</label>
        </p>
        <input type="date" className="dates"></input>
        <button>Generar Informe Estadístico</button>
      </div>
      <div>
        <form>
          <input
            type="file"
            id="subirArchivos"
            name="Subir archivo Excel"
          ></input>
          <p>
            <input
              type="submit"
              className="loadLogin"
              value="Cargar Inicios de Sesión"
            ></input>
          </p>
        </form>
      </div>
    </div>
  );
}
export default AdministracionGeneral;
