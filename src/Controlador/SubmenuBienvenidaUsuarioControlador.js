import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ConfigurarConexion from "./ConfigurarConexion";
import SubmenuBienvenidaUsuario from "../Vista/SubmenuBienvenidaUsuario";

const SubmenuBienvenidaUsuarioControlador = ({
  SubmenuBienvenidaUsuarioControladorUsuarioActual,
}) => {
  //Variables de estado
  const [listaSolicitudes, setListaSolicitudes] = useState([]);
  const [estatusLexico, setEstatusLexico] = useState({
    1: "Solicitud iniciado",
    2: "Documentos subidos en formato digital",
    3: "Documentos rechazados en formato digital",
    4: "Documentos aceptados en formato digital",
    5: "Documentos recibidos en persona",
    6: "Solicitud enviada a la aseguradora por FEDEX",
    7: "Solicitud rechazada por la aseguradora",
    8: "Nuevos documentos recibidos en formato digital",
    9: "Nuevos documentos rechazados",
    10: "Solicitud reenviada a la aseguradora por FEDEX",
    11: "Finiquito en espera de firma en persona",
    12: "Solicitud terminado",
  });

  const obtenerDescripciones = useCallback(async () => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/tramites/descripciones";

    const descripciones = await axios.get(funcion);

    if (descripciones.status === 200) {
      setEstatusLexico({
        1: descripciones.data[0].texto,
        2: descripciones.data[1].texto,
        3: descripciones.data[2].texto,
        4: descripciones.data[3].texto,
        5: descripciones.data[4].texto,
        6: descripciones.data[5].texto,
        7: descripciones.data[6].texto,
        8: descripciones.data[7].texto,
        9: descripciones.data[8].texto,
        10: descripciones.data[9].texto,
        11: descripciones.data[10].texto,
        12: descripciones.data[11].texto,
      });
    }
  }, []);

  const obtenerSolicitudes = useCallback(async () => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/solicitudes/consulta";

    const solicitudesUsuario = await axios.get(funcion, {
      params: {
        matricula: SubmenuBienvenidaUsuarioControladorUsuarioActual.matricula,
      },
    });
    setListaSolicitudes(solicitudesUsuario.data);
  }, []);

  useEffect(() => {
    if (SubmenuBienvenidaUsuarioControladorUsuarioActual.Estudiante !== null) {
      obtenerSolicitudes();
      obtenerDescripciones();
    }
  }, []);

  return (
    <SubmenuBienvenidaUsuario
      SubmenuBienvenidaUsuarioUsuarioActivo={
        SubmenuBienvenidaUsuarioControladorUsuarioActual
      }
      SubmenuBienvenidaUsuarioListaSolicitudes={listaSolicitudes}
      SubmenuBienvenidaUsuarioEstatusLexico={estatusLexico}
    />
  );
};

export default SubmenuBienvenidaUsuarioControlador;
