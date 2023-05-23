import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import ConfigurarConexion from "./ConfigurarConexion";
import SubmenuSolicitudEstudiante from "../Vista/SubmenuSolicitudEstudiante";

const SubmenuSolicitudEstudianteControlador = ({
  SubmenuSolicitudEstudianteControladorUsuarioActivo,
}) => {
  //Variables de estado
  const [listaSolicitudes, setListaSolicitudes] = useState([]);
  const [archivosSubir, setArchivosSubir] = useState([]);
  const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);
  const [solicitudVisible, setSolicitudVisible] = useState(false);
  const [estatusProgreso, setProgresoEstatus] = useState({
    1: 0,
    2: 20,
    3: 15,
    4: 40,
    5: 50,
    6: 75,
    7: 55,
    8: 65,
    9: 55,
    10: 75,
    11: 80,
    12: 100,
  });
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

  //Alertas
  const toast = useRef(null);

  const showToast = (severityValue, summaryValue, detailValue) => {
    toast.current.show({
      closable: false,
      life: 8000,
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  };

  const handleFileEvent = (event) => {
    handleLoadedFiles([...event.target.files]);
  };

  const handleLoadedFiles = (archivos) => {
    const seleccionados = archivos;
    archivos.some((archivo) => {
      if (seleccionados.findIndex((a) => a.name === archivo.name) === -1) {
        seleccionados.push(archivo);
      }
    });
    setArchivosSeleccionados(seleccionados);
    ValidateFiles();
  };

  const ValidateFiles = async () => {
  const porValidar = [];
  
  for (let indice = 0; indice < archivosSeleccionados.length; indice++) {
    const archivoActual = archivosSeleccionados[indice];

    try {
      await validarArchivo(archivoActual);
      porValidar.push(archivoActual);
    } catch (error) {
      showToast("error", "Formato de archivo invalido", error.message);
    }
  }

  setArchivosSubir([...archivosSubir, ...porValidar]);
};

const validarArchivo = (archivo) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (archivo.size > 2000000) {
        reject(
          "El archivo " +
            archivo.name +
            " no será incluido, ya que excede el tamaño de 2MB."
        );
      } else {
        const validarNombreArchivo = new RegExp("[a-zA-Z0-9-_\\/]+\\.pdf");
        if (validarNombreArchivo.test(archivo.name)) {
          resolve();
        } else {
          reject(
            "El archivo " +
              archivo.name +
              " no será incluido, ya que contiene caracteres inválidos en el nombre."
          );
        }
      }
    }, 500);
  });
};

  /*

  const ValidateFiles = () => {
    var porValidar = [];
    var indice = 0;

    const validarSiguienteArchivo = () => {
      if (indice >= archivosSeleccionados.length) {
        handleValidateFiles(porValidar);
        return;
      }

      const archivoActual = archivosSeleccionados[indice];

      if (archivoActual.size > 2000000) {
        showToast(
          "error",
          "Formato de archivo invalido",
          "El archivo: " +
            archivoActual.name +
            " no sera incluido, ya que excede el tamaño de 2MB."
        );
      } else {
        const validarNombreArchivo = new RegExp("[a-zA-Z0-9-_\\/]+\\.pdf");
        if (validarNombreArchivo.test(archivoActual.name)) {
          porValidar.push(archivoActual);
        } else {
          showToast(
            "error",
            "Formato de archivo invalido",
            "El archivo: " +
              archivoActual.name +
              " no sera incluido, ya que contiene caracteres invalidos en el nombre."
          );
        }
      }
      setTimeout(() => {
        indice++;
        validarSiguienteArchivo();
      }, 500);
    };
    validarSiguienteArchivo();
  };

  */

  const handleValidateFiles = (archivos) => {
    const validados = [...archivosSubir];
    archivos.some((archivo) => {
      if (validados.findIndex((a) => a.name === archivo.name) === -1) {
        validados.push(archivo);
      }
    });
    setArchivosSubir(validados);
  };

  const handleRemoveFile = (archivo) => {
    const archivos = [...archivosSubir];
    const indice = archivos.indexOf(archivo);
    archivos.splice(indice, 1);
    setArchivosSubir(archivos);
  };

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
      setProgresoEstatus({
        1: descripciones.data[0].barraEstatus,
        2: descripciones.data[1].barraEstatus,
        3: descripciones.data[2].barraEstatus,
        4: descripciones.data[3].barraEstatus,
        5: descripciones.data[4].barraEstatus,
        6: descripciones.data[5].barraEstatus,
        7: descripciones.data[6].barraEstatus,
        8: descripciones.data[7].barraEstatus,
        9: descripciones.data[8].barraEstatus,
        10: descripciones.data[9].barraEstatus,
        11: descripciones.data[10].barraEstatus,
        12: descripciones.data[11].barraEstatus,
      });
    }
  }, []);

  //Obtenemos la lista de solicitudes del usuario actual.
  const obtenerSolicitudes = useCallback(async () => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/solicitudes/consulta";

    const solicitudesUsuario = await axios.get(funcion, {
      params: {
        matricula: SubmenuSolicitudEstudianteControladorUsuarioActivo.matricula,
      },
    });
    setListaSolicitudes(solicitudesUsuario.data);
  }, []);

  const subirDocumentos = (
    idSolicitud,
    estatusActual,
    retroalimentacionActual
  ) => {
    showToast(
      "info",
      "Subiendo archivos",
      "Subiendo archivos NO SALGA DE LA PAGINA HASTA QUE SE LE INDIQUE"
    );
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/solicitudes/documentos";
    const formData = new FormData();

    formData.append("isSolicitud", true);
    formData.append("subCarpeta", idSolicitud);
    formData.append("id_Solicitud", idSolicitud);

    for (var indice = 0; indice < archivosSubir.length; indice++) {
      formData.append(
        "Archivo",
        archivosSubir[indice],
        archivosSubir[indice].name
      );
    }

    setTimeout(async () => {
      const documentosSubidos = await axios.post(funcion, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (documentosSubidos.status === 200) {
        showToast(
          "success",
          "Subiendo archivos",
          "Los archivos se han subido con exito, actualizando solicitud."
        );
        actualizarSolicitud(idSolicitud, estatusActual);
      } else {
        showToast(
          "info",
          "Subiendo archivos",
          "Puede que no todos los archivos se hayan subido con exito, intente de nuevo."
        );
      }
    }, 100);
  };

  const actualizarSolicitud = async (idSolicitud, estatusActual) => {
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/solicitudes/actualizar";

    const solicitudActualizada = await axios.put(funcion, {
      id_Solicitud: idSolicitud,
      estatus_Actual:
        estatusActual === 1
          ? 2
          : estatusActual === 3
          ? 2
          : estatusActual === 7
          ? 8
          : 9,
    });

    if (solicitudActualizada.status === 200) {
      showToast("success", "Actualizacion", "Solicitud actualizada con exito.");
      obtenerSolicitudes();
    } else {
      showToast("error", "Actualizacion", "Intente mas tarde.");
    }
  };

  useEffect(() => {
    obtenerSolicitudes();
    obtenerDescripciones();
  }, []);

  return (
    <div className="modules">
    Haga clic sobre el tramite para expandir su informacion.
    <SubmenuSolicitudEstudiante 
    className="accordion-item"
      SubmenuSolicitudEstudianteTostado={toast}
      SubmenuSolicitudEstudianteListaSolicitudes={listaSolicitudes}
      SubmenuSolicitudEstudianteSetSolicitudVisible={setSolicitudVisible}
      SubmenuSolicitudEstudianteSolicitudVisible={solicitudVisible}
      SubmenuSolicitudEstudianteArchivosSubir={archivosSubir}
      SubmenuSolicitudEstudianteHandleFileEvent={handleFileEvent}
      SubmenuSolicitudEstudianteHandleRemoveFile={handleRemoveFile}
      SubmenuSolicitudEstudianteEstatusProgreso={estatusProgreso}
      SubmenuSolicitudEstudianteEstatusLexico={estatusLexico}
      SubmenuSolicitudEstudianteSubirDocumentos={subirDocumentos}
    />
    </div>
  );
};

export default SubmenuSolicitudEstudianteControlador;
