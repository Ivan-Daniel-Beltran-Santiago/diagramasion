import React from "react";
import { Toast } from "primereact/toast";

const SubmenuAdministrarReportes = ({
  SubmenuAdministrarReportesTostado,
  SubmenuAdministrarReportesHandleInputChange,
  SubmenuAdministrarReportesFechaInicioReporte,
  SubmenuAdministrarReportesFechaFinalReporte,
  SubmenuAdministrarReportesFechasValidas,
  SubmenuAdministrarReportesGenerarReporte,
}) => {
  return (
    <div id="administracionGeneral" className="modules">
      <Toast ref={SubmenuAdministrarReportesTostado} position="top-right" />
      <div className="dateContainer">
        <p>
          <label className="labelDate">Fecha de inicio</label>
        </p>
        <input
          type="date"
          className="dates"
          min={"2023-01-01"}
          id="lowerRange"
          name="fechaInicio"
          onChange={SubmenuAdministrarReportesHandleInputChange}
        ></input>
        <p>
          <label className="labelDate">Fecha de finalización</label>
        </p>
        <input
          type="date"
          className="dates"
          min={"2023-01-01"}
          id="upperRange"
          name="fechaFinal"
          onChange={SubmenuAdministrarReportesHandleInputChange}
        ></input>
        <br />
        {!SubmenuAdministrarReportesFechasValidas &&
          SubmenuAdministrarReportesFechaInicioReporte !== "" &&
          SubmenuAdministrarReportesFechaFinalReporte !== "" && (
            <label>
              La fecha de finalización no puede ser menor o igual a la fecha de
              inicio.
            </label>
          )}
        {SubmenuAdministrarReportesFechasValidas &&
          SubmenuAdministrarReportesFechaInicioReporte !== "" &&
          SubmenuAdministrarReportesFechaFinalReporte !== "" && (
            <button onClick={SubmenuAdministrarReportesGenerarReporte}>
              Generar Informe Estadístico
            </button>
          )}
      </div>
    </div>
  );
};
export default SubmenuAdministrarReportes;
