import React, { useEffect } from "react";
import { Toast } from "primereact/toast";
import ComponenteSolicitudes from "./ComponenteSolicitudes";

function SubmenuAdministrarSolicitudes({
  SubmenuAdministrarSolicitudesObtenerDescripciones,
  SubmenuAdministrarSolicitudesEstatusLexico,
  SubmenuAdministrarSolicitudesEstatusSeleccionado,
  SubmenuAdministrarSolicitudesSetEstatusSeleccionado,
  SubmenuAdministrarSolicitudesObtenerListaSolicitudes,
  SubmenuAdministrarSolicitudesListaSolicitudes,
  SubmenuAdministrarSolicitudesObtenerSolicitudSeleccionada,
  SubmenuAdministrarSolicitudesTostado,
}) {
  useEffect(() => {
    SubmenuAdministrarSolicitudesObtenerDescripciones();
    SubmenuAdministrarSolicitudesObtenerListaSolicitudes(1);
  }, []);

  return (
    <div id="administrarSolicitudes">
      <Toast ref={SubmenuAdministrarSolicitudesTostado} position="top-right" />
      <div className="buttonContainer">
        <div className="row_1">
          <button
            className="button"
            onClick={() => {
              SubmenuAdministrarSolicitudesSetEstatusSeleccionado(1);
            }}
          >
            {SubmenuAdministrarSolicitudesEstatusLexico[1]}
          </button>
          <button
            className="button"
            onClick={() => {
              SubmenuAdministrarSolicitudesSetEstatusSeleccionado(2);
            }}
          >
            {SubmenuAdministrarSolicitudesEstatusLexico[2]}
          </button>
          <button
            className="button"
            onClick={() => {
              SubmenuAdministrarSolicitudesSetEstatusSeleccionado(3);
            }}
          >
            {SubmenuAdministrarSolicitudesEstatusLexico[3]}
          </button>
          <button
            className="button"
            onClick={() => {
              SubmenuAdministrarSolicitudesSetEstatusSeleccionado(4);
            }}
          >
            {SubmenuAdministrarSolicitudesEstatusLexico[4]}
          </button>
        </div>
        <div className="row_2">
          <button
            className="button"
            onClick={() => {
              SubmenuAdministrarSolicitudesSetEstatusSeleccionado(5);
            }}
          >
            {SubmenuAdministrarSolicitudesEstatusLexico[5]}
          </button>
          <button
            className="button"
            onClick={() => {
              SubmenuAdministrarSolicitudesSetEstatusSeleccionado(6);
            }}
          >
            {SubmenuAdministrarSolicitudesEstatusLexico[6]}
          </button>
          <button
            className="button"
            onClick={() => {
              SubmenuAdministrarSolicitudesSetEstatusSeleccionado(7);
            }}
          >
            {SubmenuAdministrarSolicitudesEstatusLexico[7]}
          </button>
          <button
            className="button"
            onClick={() => {
              SubmenuAdministrarSolicitudesSetEstatusSeleccionado(8);
            }}
          >
            {SubmenuAdministrarSolicitudesEstatusLexico[8]}
          </button>
        </div>
        <div className="row_3">
          <button
            className="button"
            onClick={() => {
              SubmenuAdministrarSolicitudesSetEstatusSeleccionado(9);
            }}
          >
            {SubmenuAdministrarSolicitudesEstatusLexico[9]}
          </button>
          <button
            className="button"
            onClick={() => {
              SubmenuAdministrarSolicitudesSetEstatusSeleccionado(10);
            }}
          >
            {SubmenuAdministrarSolicitudesEstatusLexico[10]}
          </button>
          <button
            className="button"
            onClick={() => {
              SubmenuAdministrarSolicitudesSetEstatusSeleccionado(11);
            }}
          >
            {SubmenuAdministrarSolicitudesEstatusLexico[11]}
          </button>
        </div>
      </div>
      <section className="listContainer">
        <ComponenteSolicitudes
          ComponenteSolicitudesEstatusLexico={
            SubmenuAdministrarSolicitudesEstatusLexico
          }
          ComponenteSolicitudesObtenerSolicitud={
            SubmenuAdministrarSolicitudesObtenerSolicitudSeleccionada
          }
          ComponenteSolicitudesListaSolicitudes={
            SubmenuAdministrarSolicitudesListaSolicitudes
          }
          ComponenteSolicitudesObtenerListaSolicitudes={
            SubmenuAdministrarSolicitudesObtenerListaSolicitudes
          }
          ComponenteSolicitudesEstatusSeleccionado={
            SubmenuAdministrarSolicitudesEstatusSeleccionado
          }
        />
      </section>
    </div>
  );
}

export default SubmenuAdministrarSolicitudes;
