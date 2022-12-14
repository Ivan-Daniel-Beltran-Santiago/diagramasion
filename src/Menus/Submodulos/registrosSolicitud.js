import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import RegistroSolicitud from "./registroSolicitud";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";

function RegistrosSolicitud({ estatusSolicitado, Cargar_Matricula }) {
  const srvDir = new ServerConnectionConfig();
  const srvReq = srvDir.getServer() + "/RequestApplicationList";

  const [listaSolicitudes, setListaSolicitudes] = useState([{}]);

  const handleCargar_Matricula = (matriculaCargarSolic) => {
    Cargar_Matricula.handlecargarMatricula(matriculaCargarSolic);
  };

  const retrieveRequests = useCallback(() => {
    axios
      .post(srvReq, {
        estatus: estatusSolicitado.filtroEstatus,
      })
      .then((response) => {
        setListaSolicitudes(response.data);
      });
  }, [estatusSolicitado, srvReq]);

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
          <th>Cargar información</th>
        </tr>
        {listaSolicitudes.map(function (item) {
          var registroUsuario = item.Usuario ?? "Indefinido";
          var registroTramite = item.Tramite ?? "Indefinido";
          return (
            <RegistroSolicitud
              registro={item}
              usuario={registroUsuario}
              tramite={registroTramite}
              Cargar_matricula={handleCargar_Matricula}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default RegistrosSolicitud;
