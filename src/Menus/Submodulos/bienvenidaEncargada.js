import axios from "axios";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";

function BienvenidaEncargada() {

  let nuevas = 0
  let documentos = 0
  let finiquitos = 0
  let finalizados = 0

  const conseguirNumeros = (estado) => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/GetConteoSolicitudes";
    axios
      .post(srvReq, {
        estatus: estado
      })
      .then((response) => {
        //console.log(typeof(response.data.count))
        return response.data.count
      });
  }

  //Falta hacer que se ejecute esta funcion bien y que a las variables no las convierta en "undefied"
  function establecer() {
    nuevas = conseguirNumeros(1)
    documentos = conseguirNumeros(4)
    finiquitos = conseguirNumeros(11)
    finalizados = conseguirNumeros(12)

    //console.log(documentos)
  }

  return (
    <div id="bienvenidaEncargada" className="modules">
      <p>
        <span id="nuevas_solicitudes">
          Numero de solicitudes nuevas actualmente: {nuevas}
        </span>
      </p>
      <p>
        <span id="documentos_fisicos">
          Numero de solicitudes con los documentos digitales revisados actualmente: {documentos}
        </span>
      </p>
      <p>
        <span id="finiquito_espera">
          Numero de solicitudes esperando el finiquito actualmente: {finiquitos}
        </span>
      </p>
      <p>
        <span id="finalizados">
          Numero de solicitudes finalizadas: {finalizados}
        </span>
      </p>
    </div>
  );
}
export default BienvenidaEncargada;
