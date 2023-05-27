import { useCallback, useRef, useState } from "react";
import axios from "axios";
import ConfigurarConexion from "./ConfigurarConexion";
import SubmenuAdministrarCorreos from "../Vista/SubmenuAdministrarCorreos.js";

const SubmenuAdministrarCorreosControlador = () => {
  //Variables de estado
  const [listaPlantillasCorreo, setListaPlantillasCorreo] = useState([]);
  const [archivosPlantillaCorreo, setArchivosPlantillaCorreo] = useState([]);
  const [parametrosPlantillaCorreo, setParametrosPlantillaCorreo] = useState({
    Indice: -1,
    Asunto: "",
    Destinatario: "",
  });
  const [
    parametrosValidadosPlantillaCorreo,
    setParametrosValidadosPlantillaCorreo,
  ] = useState({
    Asunto: false,
    Destinatario: false,
  });
  const [archivosPlantillaCorreoAñadir, setArchivosPlantillaCorreoAñadir] =
    useState([]);
  const [archivosPlantillaCorreoEliminar, setArchivosPlantillaCorreoEliminar] =
    useState([]);

  //Alertas
  const toast = useRef(null);

  const showToast = (severityValue, summaryValue, detailValue) => {
    toast.current.show({
      closable: false,
      life: 5000,
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  };

  //Manejar los cambios en los campos
  const handleInputChange = (event) => {
    const parametrosPlantillaCorreoActualizado = {
      ...parametrosPlantillaCorreo,
      [event.target.name]: event.target.value,
    };
    setParametrosPlantillaCorreo(parametrosPlantillaCorreoActualizado);
    validateInputChange(parametrosPlantillaCorreoActualizado);
  };

  //Validamos los cambios en los campos
  const validateInputChange = (ParametrosPlantillaCorreoActualizado) => {
    const validarDestinatario = new RegExp(
      "^(?!$)[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\\.[A-Za-z]{2,}(.[A-Za-z]{2,})?$"
    );
    const validarAsunto = new RegExp("^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ., ]+$");

    const parametrosValidadosPlantillaCorreoActualizados = {
      ...parametrosValidadosPlantillaCorreo,
      Asunto:
        ParametrosPlantillaCorreoActualizado.Asunto !== ""
          ? validarAsunto.test(ParametrosPlantillaCorreoActualizado.Asunto)
          : false,
      Destinatario:
        ParametrosPlantillaCorreoActualizado.Destinatario !== ""
          ? ParametrosPlantillaCorreoActualizado.Destinatario !== "$correo_e$"
            ? validarDestinatario.test(
                ParametrosPlantillaCorreoActualizado.Destinatario
              )
            : true
          : false,
    };

    setParametrosValidadosPlantillaCorreo(
      parametrosValidadosPlantillaCorreoActualizados
    );
  };

  //Manejamos archivos
  const handleFileEvent = (event) => {
    handleSelectedFiles(event, [...event.target.files]);
  };

  //Preparamos los archivos para subir
  const handleSelectedFiles = (event, ArchivosSeleccionados) => {
    //Creamos el objeto para filtrar los archivos
    const archivosSeleccionadosFiltrados = [...ArchivosSeleccionados];

    //Filtramos para evitar archivos con nombre igual
    ArchivosSeleccionados.some((archivoSeleccionado) => {
      if (
        archivosSeleccionadosFiltrados.findIndex(
          (archivo) => archivo.name === archivoSeleccionado.name
        ) === -1
      ) {
        archivosSeleccionadosFiltrados.push(archivoSeleccionado);
      }
    });

    //Añadimos los archivos ya filtrados
    setArchivosPlantillaCorreoAñadir(archivosSeleccionadosFiltrados);
  };

  //Manejar la eliminacion de archivos que se planean subir
  const handleRemoveFileAñadir = (archivo) => {
    const archivosPlantillaCorreoAñadirTemp = [
      ...archivosPlantillaCorreoAñadir,
    ];
    const indiceArchivo = archivosPlantillaCorreoAñadirTemp.indexOf(archivo);
    archivosPlantillaCorreoAñadirTemp.splice(indiceArchivo, 1);
    setArchivosPlantillaCorreoAñadir(archivosPlantillaCorreoAñadirTemp);
  };

  //Descargar un documento ya existente en el sistema
  const handleDownloadFile = async (
    PlantillaIndice,
    PlantillaNombreArchivo
  ) => {
    try {
      const servidor = new ConfigurarConexion();
      const funcion = servidor.obtenerServidor() + "/correos/documento";

      const documentoPlantilla = await axios.get(funcion, {
        responseType: "blob",
        params: {
          plantillaNombreArchivo: PlantillaNombreArchivo,
          plantillaTitulo: listaPlantillasCorreo[PlantillaIndice].titulo,
        },
      });

      if (documentoPlantilla.status === 200) {
        const href = URL.createObjectURL(documentoPlantilla.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", PlantillaNombreArchivo);
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(href);
        document.body.removeChild(link);
      } else {
        showToast(
          "error",
          "Descarga de documento",
          "Error al descargar el documento seleccionado, contacte al administrador."
        );
      }
    } catch (error) {
      showToast(
        "error",
        "Descarga de documento",
        "Error al descargar el documento seleccionado, contacte al administrador."
      );
    }
  };

  //Manejar la eliminacion de archivos que ya existen
  const handleRemoveFile = (PlantillaNombreArchivo) => {
    const archivosPlantillaCorreoEliminarTemp = [
      ...archivosPlantillaCorreoEliminar,
    ];
    archivosPlantillaCorreoEliminarTemp.push(PlantillaNombreArchivo);
    setArchivosPlantillaCorreoEliminar(archivosPlantillaCorreoEliminarTemp);
    document.getElementById(
      "Archivo.Existente." + PlantillaNombreArchivo
    ).style.color = "red";
  };

  //Manejar la des-eliminacion de archivos que ya existen
  const handleConfirmFile = (PlantillaNombreArchivo) => {
    const archivosPlantillaCorreoEliminarTemp = [
      ...archivosPlantillaCorreoEliminar,
    ];
    const indiceArchivo = archivosPlantillaCorreoEliminar.indexOf(
      PlantillaNombreArchivo
    );
    archivosPlantillaCorreoEliminarTemp.splice(indiceArchivo, 1);
    setArchivosPlantillaCorreoEliminar(archivosPlantillaCorreoEliminarTemp);
    document.getElementById(
      "Archivo.Existente." + PlantillaNombreArchivo
    ).style.color = "";
  };

  //Obtener la lista de las plantillas de correos que tenemos en el sistema
  const obtenerListaPlantillasCorreo = useCallback(async () => {
    try {
      const servidor = new ConfigurarConexion();
      const funcion = servidor.obtenerServidor() + "/correos/lista";

      const listaCorreos = await axios.get(funcion);

      switch (listaCorreos.status) {
        case 200:
          setListaPlantillasCorreo(listaCorreos.data);
          break;
        case 204:
          showToast(
            "error",
            "Plantillas de correos",
            "No hay plantillas de correo existentes, si cree que esto es un error, contacte al administrador"
          );
          break;
        default:
          showToast(
            "error",
            "Servidor",
            "Error de servidor, contacte al administrador"
          );
          break;
      }
    } catch (error) {
      showToast(
        "error",
        "Servidor",
        "Error de servidor, contacte al administrador"
      );
    }
  }, []);

  //Cargar los detalles del correo a los campos
  const colocarInformacion = (IndiceMetadata) => {
    var metadataCorreo;
    var cuerpoCorreo;
    var documentosCorreo;

    setArchivosPlantillaCorreo([]);
    setArchivosPlantillaCorreoAñadir([]);
    setArchivosPlantillaCorreoEliminar([]);

    if (IndiceMetadata !== "Seleccionar") {
      metadataCorreo = {
        Indice: IndiceMetadata,
        Asunto: listaPlantillasCorreo[IndiceMetadata].asunto,
        Destinatario: listaPlantillasCorreo[IndiceMetadata].destinatario,
      };
      cuerpoCorreo = listaPlantillasCorreo[IndiceMetadata].cuerpo;
      if (
        listaPlantillasCorreo[IndiceMetadata].adjuntos !== "" &&
        listaPlantillasCorreo[IndiceMetadata].adjuntos !== null &&
        listaPlantillasCorreo[IndiceMetadata].adjuntos !== undefined
      ) {
        documentosCorreo =
          listaPlantillasCorreo[IndiceMetadata].adjuntos.split(";");
      }
    } else {
      metadataCorreo = {
        Indice: -1,
        Asunto: "",
        Destinatario: "",
      };
      cuerpoCorreo = "";
      documentosCorreo = [];
    }

    setArchivosPlantillaCorreo(documentosCorreo);
    setParametrosPlantillaCorreo(metadataCorreo);
    document.getElementById("correoAsunto").value = metadataCorreo.Asunto;
    document.getElementById("correoDestinatario").value =
      metadataCorreo.Destinatario;
    document.getElementById("cuerpoCorreo").value = cuerpoCorreo;
  };

  //Actualizamos la plantilla
  const actualizarPlantilla = async () => {
    try {
      const servidor = new ConfigurarConexion();
      const funcion = servidor.obtenerServidor() + "/correos/actualizar";

      const modificarPlantilla = await axios.put(funcion, {
        nombreArchivoPlantilla:
          listaPlantillasCorreo[parametrosPlantillaCorreo.Indice].titulo,
        nuevoDestinatario: parametrosPlantillaCorreo.Destinatario,
        nuevoAsunto: parametrosPlantillaCorreo.Asunto,
        nuevoCuerpo: document.getElementById("cuerpoCorreo").value,
      });

      if (modificarPlantilla.status === 200) {
        showToast(
          "success",
          "Correo actualizado",
          "La plantilla de correo ha sido actualizada correctamente."
        );
        setTimeout(async () => {
          if (archivosPlantillaCorreoAñadir.length > 0) {
            showToast(
              "info",
              "Subiendo documentos",
              "Se estan procesando los documentos nuevos, por favor, espere."
            );

            const funcionSubir = servidor.obtenerServidor() + "/correos/subir";
            const formData = new FormData();

            formData.append("isSolicitud", false);
            formData.append(
              "subCarpeta",
              listaPlantillasCorreo[parametrosPlantillaCorreo.Indice].titulo
            );

            for (
              var indice = 0;
              indice < archivosPlantillaCorreoAñadir.length;
              indice++
            ) {
              formData.append(
                "Archivo",
                archivosPlantillaCorreoAñadir[indice],
                archivosPlantillaCorreoAñadir[indice].name
              );
            }

            const subirDocumentos = await axios.post(funcionSubir, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            if (subirDocumentos.status === 200) {
              showToast(
                "success",
                "Subiendo archivos",
                "Los archivos se han subido con exito, actualizando plantilla."
              );
            } else {
              showToast(
                "info",
                "Subiendo archivos",
                "Puede que no todos los archivos se hayan subido con exito, intente de nuevo."
              );
            }
          }
          if (archivosPlantillaCorreoEliminar.length > 0) {
            showToast(
              "info",
              "Eliminando documentos",
              "Se estan procesando los documentos a eliminar, por favor, espere."
            );
            const funcionEliminar =
              servidor.obtenerServidor() + "/correos/eliminar";

            const eliminarDocumentos = await axios.get(funcionEliminar, {
              params: {
                DocumentosEliminar: archivosPlantillaCorreoEliminar,
                subCarpeta:
                  listaPlantillasCorreo[parametrosPlantillaCorreo.Indice]
                    .titulo,
              },
            });

            if (eliminarDocumentos.status === 200) {
              showToast(
                "success",
                "Eliminando archivos",
                "Los archivos se han eliminado con exito, actualizando plantilla."
              );
            } else {
              showToast(
                "info",
                "Subiendo archivos",
                "Puede que no todos los archivos se hayan subido con exito, intente de nuevo."
              );
            }
          }
          setArchivosPlantillaCorreo([]);
          setArchivosPlantillaCorreoAñadir([]);
          setArchivosPlantillaCorreoEliminar([]);

          setArchivosPlantillaCorreo([]);
          setParametrosPlantillaCorreo({
            Indice: -1,
            Asunto: "",
            Destinatario: "",
          });

          document.getElementById("seleccionMetadataCorreo").selectedIndex = 0;
          document.getElementById("correoAsunto").value = "";
          document.getElementById("correoDestinatario").value = "";
          document.getElementById("cuerpoCorreo").value = "";

          obtenerListaPlantillasCorreo();
        }, 100);
      } else {
        showToast(
          "error",
          "Servidor",
          "Error de servidor, contacte al administrador"
        );
      }
    } catch (error) {
      showToast(
        "error",
        "Servidor",
        "Error de servidor, contacte al administrador"
      );
    }
  };

  return (
    <SubmenuAdministrarCorreos
      SubmenuAdministrarCorreosTostado={toast}
      SubmenuAdministrarCorreosObtenerListaPlantillasCorreo={
        obtenerListaPlantillasCorreo
      }
      SubmenuAdministrarCorreosListaPlantillasCorreo={listaPlantillasCorreo}
      SubmenuAdministrarCorreosColocarInformacion={colocarInformacion}
      SubmenuAdministrarCorreosHandleInputChange={handleInputChange}
      SubmenuAdministrarCorreosParametrosPlantillaCorreo={
        parametrosPlantillaCorreo
      }
      SubmenuAdministrarCorreosParametrosValidadosPlantillaCorreo={
        parametrosValidadosPlantillaCorreo
      }
      SubmenuAdministrarCorreosHandleFileEvent={handleFileEvent}
      SubmenuAdministrarCorreosArchivosPlantillaCorreoAñadir={
        archivosPlantillaCorreoAñadir
      }
      SubmenuAdministrarCorreosHandleRemoveFileAñadir={handleRemoveFileAñadir}
      SubmenuAdministrarCorreosArchivosPlantillaCorreo={archivosPlantillaCorreo}
      SubmenuAdministrarCorreosHandleDownloadFile={handleDownloadFile}
      SubmenuAdministrarCorreosHandleRemoveFile={handleRemoveFile}
      SubmenuAdministrarCorreosHandleConfirmFile={handleConfirmFile}
      SubmenuAdministrarCorreosArchivosPlantillaCorreoEliminar={
        archivosPlantillaCorreoEliminar
      }
      SubmenuAdministrarCorreosActualizarPlantilla={actualizarPlantilla}
    />
  );
};

export default SubmenuAdministrarCorreosControlador;
