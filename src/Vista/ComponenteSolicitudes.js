import { useEffect } from "react";
import ComponenteSolicitud from "./ComponenteSolicitud";

const ComponenteSolicitudes = ({
  ComponenteSolicitudesObtenerListaSolicitudes,
  ComponenteSolicitudesListaSolicitudes,
  ComponenteSolicitudesEstatusSeleccionado,
  ComponenteSolicitudesEstatusLexico,
  ComponenteSolicitudesObtenerSolicitud,
}) => {
  useEffect(() => {
    ComponenteSolicitudesObtenerListaSolicitudes(
      ComponenteSolicitudesEstatusSeleccionado
    );
  }, [ComponenteSolicitudesEstatusSeleccionado]);

  return (
    <table className="tablas">
      <tbody>
        <tr className="Cabecera">
          <th>ID de la Solicitud</th>
          <th>Solicitante</th>
          <th>Tramite Solicitado</th>
          <th>Fecha de Solicitud</th>
          <th>Estatus Actual</th>
          <th>Fecha de Ultima Actualización</th>
          <th>Cargar información</th>
        </tr>
        {ComponenteSolicitudesListaSolicitudes.length > 0 &&
          ComponenteSolicitudesListaSolicitudes.map(function (solicitud) {
            return (
              <ComponenteSolicitud
                key={solicitud.id_Solicitud}
                ComponenteSolicitudRegistro={solicitud}
                ComponenteSolicitudEstatusLexico={
                  ComponenteSolicitudesEstatusLexico
                }
                ComponenteSolicitudObtenerSolicitud={
                  ComponenteSolicitudesObtenerSolicitud
                }
              />
            );
          })}
        {ComponenteSolicitudesListaSolicitudes.length === 0 && (
          <ComponenteSolicitud ComponenteSolicitudRegistro={null} />
        )}
      </tbody>
    </table>
  );
};

export default ComponenteSolicitudes;
