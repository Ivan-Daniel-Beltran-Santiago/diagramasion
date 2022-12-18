import axios from "axios";
import { useEffect, useState } from "react";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";

function BienvenidaEncargada() {

  const [conteo, setConteo] = useState({
    nuevas: 0,
    documentos: 0,
    finiquitos: 0,
    finalizados: 0
  });

  const conseguirNumeros = (estado) => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/GetConteoSolicitudes";
    axios
      .post(srvReq, {
        estatus: estado,
      })
      .then((response) => {
        if(estado == 11)
        setConteo({
          finiquitos: response.data
        })
      });
    console.log(conteo)
  };


  useEffect(() => {
    conseguirNumeros(11)
    console.log(conteo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="bienvenidaEncargada" className="modules">
      <p>
        <span id="nuevas_solicitudes">
          Numero de solicitudes nuevas actualmente: {conteo.nuevas}
        </span>
      </p>
      <p>
        <span id="documentos_fisicos">
          Numero de solicitudes con los documentos digitales revisados
          actualmente: {conteo.documentos}
        </span>
      </p>
      <p>
        <span id="finiquito_espera">
          Numero de solicitudes esperando el finiquito actualmente: {conteo.finiquitos}
        </span>
      </p>
      <p>
        <span id="finalizados">
          Numero de solicitudes finalizadas: {conteo.finalizados}
        </span>
      </p>
    </div>
  );
}
export default BienvenidaEncargada;
