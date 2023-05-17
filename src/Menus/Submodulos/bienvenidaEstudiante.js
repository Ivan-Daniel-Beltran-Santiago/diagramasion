import axios from "axios";
import { useEffect, useState } from "react";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";

function BienvenidaEstudiante({ currentUser }) {
  const [requestData, setRequestData] = useState({
    id: 0,
    fecha_inicio: "",
    fecha_actu: "",
    estatus: "",
    retroalim: "",
  });

  const obtenerSolicitud = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/RequestUserApplication";
    axios
      .post(srvReq, {
        matriculaUsuario: currentUser.controlNumber,
      })
      .then((result) => {
        setRequestData({
          id: result.data[0]
            ? result.data[0].id_Solicitud
            : " No se encontro ninguna solicitud ",
          fecha_inicio: result.data[0]
            ? result.data[0].fecha_Solicitud
            : "No se encontro ninguna solicitud ",
          fecha_actu: result.data[0]
            ? result.data[0].fecha_Actualizacion
            : " No hay fecha establecida ",
          estatus: result.data[0]
            ? result.data[0].estatus_Actual
            : "No hay una solicitud activa",
          retroalim: result.data[0]
            ? result.data[0].retroalimentacion_Actual
            : " No se encontro ninguna solicitud ",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    obtenerSolicitud();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="bienvenidaEstudiante" className="modules">
      <p>
        <span>
          <u>Estudiante <b>{currentUser.fullName}.</b></u>
        </span>
      </p>
      <p>
        <span className="progreso_en_Solicitud">
          Su solicitud tiene un estatus a esta fecha de: <b>{requestData.estatus}</b>
        </span>
      </p>
      <p>
        <span className="impedimentos_en_Solicitud">
          La ultima modificacion a sido a fecha de <b>"{requestData.fecha_actu}"</b>, favor de estar atento a actualizaciones.
        </span>
      </p>
      <p>
        <span className="progreso_en_Solicitud">
          En caso de querer actualizaciones, ver su retroalimentacion o mande correo a <i>ventanillaith@hermosillo.tecnm.mx</i>
        </span>
      </p>
    </div>
  );
}

export default BienvenidaEstudiante;
