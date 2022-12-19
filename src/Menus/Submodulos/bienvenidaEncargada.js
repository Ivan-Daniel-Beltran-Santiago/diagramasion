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

  const conseguirNuevos = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/GetConteoSolicitudes";
    let n = 0
    let d = 0
    let f = 0
    let fn = 0
    axios
      .post(srvReq, {
        estatus: 1,
      })
      .then((response) => {
        n = response.data
      });
    axios
      .post(srvReq, {
        estatus: 2,
      })
      .then((response) => {
        d= response.data
      });
    axios
      .post(srvReq, {
        estatus: 11,
      })
      .then((response) => {
        f= response.data
      });
    axios
      .post(srvReq, {
        estatus: 12,
      })
      .then((response) => {
        fn= response.data
        //console.log(n, d, f, fn)
        setConteo({
          nuevas: n,
          documentos: d,
          finiquitos: f,
          finalizados: fn
        })
      });
    //console.log(n, d, f, fn)
  };

  const conseguirDocu = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/GetConteoSolicitudes";
    axios
      .post(srvReq, {
        estatus: 2,
      })
      .then((response) => {
        setConteo({
          nuevas: conteo.nuevas,
          documentos: 2,
          finiquitos: conteo.finiquitos,
          finalizados: conteo.finalizados
        })
      });
    //console.log(conteo.documentos)
  };

  const conseguirFini = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/GetConteoSolicitudes";
    axios
      .post(srvReq, {
        estatus: 11,
      })
      .then((response) => {
        return 3
        console.log("Finiquitos " + response.data)
      });
    //console.log(conteo.finiquitos)
  };

  const conseguirFinal = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/GetConteoSolicitudes";
    axios
      .post(srvReq, {
        estatus: 12,
      })
      .then((response) => {
        setConteo({
          nuevas: conteo.nuevas,
          documentos: conteo.documentos,
          finiquitos: conteo.finiquitos,
          finalizados: response.data
        })
      });
    //console.log(conteo.documentos)
  };


  useEffect(() => {
    conseguirNuevos()
    //console.log(conteo)
    //conseguirDocu()
    //console.log(conteo)
    //conseguirFini()
    //console.log(conteo)
    //conseguirFinal()
    //console.log(conteo)
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
