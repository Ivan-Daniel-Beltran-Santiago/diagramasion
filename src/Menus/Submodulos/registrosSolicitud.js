import { useEffect, useState } from "react";
import RegistroSolicitud from "./registroSolicitud";

function RegistrosSolicitud({ listArray }) {
  const [arregloRegistros, setArregloRegistros] = useState();

  useEffect(() => {
    setArregloRegistros(listArray);
  }, [listArray]);

  const registroSolicitud = (value) => {
    <RegistroSolicitud registro={value} />;
  };
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
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr className="registroPar">
          <th>666</th>
          <th></th>
          <th>Orfandad</th>
          <th>01/01/0001</th>
          <th>En espera del deposito</th>
          <th>31/12/2021</th>
        </tr>
      </tbody>
    </table>
  );
}

export default RegistrosSolicitud;
