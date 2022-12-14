import { useState } from "react";

function AdministracionGeneral() {
  const [dateRanges, setDateRanges] = useState({
    lowerRange: "",
    upperRange: "",
  });
  const [validDataRange, setValidDataRange] = useState(false);

  const validateInputChange = (event) => {
    const lower = dateRanges.lowerRange ?? "none";
    const upper = dateRanges.upperRange ?? "none";
    if (lower !== "none" && upper !== "none") {
      const lowerDate = new Date(document.getElementById("lowerRange").value);
      const upperDate = new Date(document.getElementById("upperRange").value);
      if (+upperDate < +lowerDate) {
        setValidDataRange(false);
      } else {
        setValidDataRange(true);
      }
    }
  };

  const handleInputChange = (event) => {
    setDateRanges({
      lowerRange: document.getElementById("lowerRange").value,
      upperRange: document.getElementById("upperRange").value,
    });
    validateInputChange(event);
  };

  return (
    <div id="administracionGeneral" className="modules">
      <div className="dateContainer">
        <p>
          <label className="labelDate">Fecha de inicio</label>
        </p>
        <input
          type="date"
          className="dates"
          min={"2022-11-01"}
          id="lowerRange"
          onChange={handleInputChange}
        ></input>
        <p>
          <label className="labelDate">Fecha de finalización</label>
        </p>
        <input
          type="date"
          className="dates"
          min={"2022-11-01"}
          id="upperRange"
          onChange={handleInputChange}
        ></input>
        <br />
        {!validDataRange && (
          <label>
            La fecha de finalización no puede ser menor a la fecha de inicio.
          </label>
        )}
        <button>Generar Informe Estadístico</button>
      </div>
      <div>
        <br />
        <label>Subida de archivo de usuarios: </label>
        <br />
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
