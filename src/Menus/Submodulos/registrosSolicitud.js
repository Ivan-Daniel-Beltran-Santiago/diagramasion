import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import RegistroSolicitud from "./registroSolicitud";

function RegistrosSolicitud({ estatusSolicitado }) {
  const [listaSolicitudes, setListaSolicitudes] = useState([{}]);

  const retrieveRequests = useCallback(() => {
    axios
      .post("http://localhost:3001/RequestList", {
        estatus: estatusSolicitado.filtroEstatus,
      })
      .then((response) => {
        setListaSolicitudes(response.data);
      });
  }, [estatusSolicitado]);

  useEffect(() => {
    retrieveRequests();
  }, [retrieveRequests]);

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
        </tr>
        {listaSolicitudes.map(function (item) {
          var registroUsuario = item.Usuario ?? "Indefinido";
          var registroTramite = item.Tramite ?? "Indefinido";
          return (
            <RegistroSolicitud
              registro={item}
              usuario={registroUsuario}
              tramite={registroTramite}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default RegistrosSolicitud;
