import axios from "axios";
import { useEffect, useState } from "react";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";

function BienvenidaEncargada({ currentUser }) {
  const [conteo, setConteo] = useState({
    nuevas: 0,
    documentos: 0,
    finiquitos: 0,
    finalizados: 0,
  });

  const conseguirNuevos = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/GetConteoSolicitudes";
    let n = 0;
    let d = 0;
    let f = 0;
    let fn = 0;
    axios
      .post(srvReq, {
        estatus: 1,
      })
      .then((response) => {
        n = response.data;
      });
    axios
      .post(srvReq, {
        estatus: 2,
      })
      .then((response) => {
        d = response.data;
      });
    axios
      .post(srvReq, {
        estatus: 11,
      })
      .then((response) => {
        f = response.data;
      });
    axios
      .post(srvReq, {
        estatus: 12,
      })
      .then((response) => {
        fn = response.data;
        //console.log(n, d, f, fn)
        setConteo({
          nuevas: n,
          documentos: d,
          finiquitos: f,
          finalizados: fn,
        });
      });
    //console.log(n, d, f, fn)
  };

  useEffect(() => {
    conseguirNuevos();
  }, []);

  return (
    <div id="bienvenidaEncargada" className="modules">
      <p>
        <span>
          <u>Bienvenida Encargad@ <b>{currentUser.fullName}.</b></u>
        </span>
      </p>
      <p>
        <span id="nuevas_solicitudes">
          <b>Numero de solicitudes nuevas actualmente:</b> {conteo.nuevas}
        </span>
      </p>
      <p>
        <span id="documentos_fisicos">
          <b>Numero de solicitudes con los documentos digitales revisados
            actualmente:</b> {conteo.documentos}
        </span>
      </p>
      <p>
        <span id="finiquito_espera">
          <b>Numero de solicitudes esperando el finiquito actualmente:</b>{" "}
          {conteo.finiquitos}
        </span>
      </p>
      <p>
        <span id="finalizados">
          <b>Numero de solicitudes finalizadas:</b> {conteo.finalizados}
        </span>
      </p>
    </div>
  );
}
export default BienvenidaEncargada;
