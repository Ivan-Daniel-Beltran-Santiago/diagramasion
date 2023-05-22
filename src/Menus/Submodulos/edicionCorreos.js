import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Toast } from "primereact/toast";
import axios from "axios";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";
import { FaTrash } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const Container = styled.div`
  padding: 1em;
`;
const Requisito = styled.label`
  color: gray;
  font-size: 12px;
`;

function EdicionCorreos() {
  //Variables de entorno
  const [listaCorreos, setListaCorreos] = useState([]);
  const [loadedFiles, setLoadedFiles] = useState([]);
  const [recoveredFiles, setRecoveredFiles] = useState([]);

  //Obtener todos los correos, para colocarlos en el botón de selección
  const ObtenerCorreos = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/ObtenerListaJSON";
    axios
      .get(srvReq)
      .then((response) => {
        //Se añaden todos los trámites a el arreglo
        if (response.data.Code === 0) {
          //console.log("el codigo fue 0")
        } else {
          setListaCorreos(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        showToast(
          "error",
          "Listado de Correos",
          "Ha ocurrido un error al obtener los correos, por favor contacte al administrador del sistema."
        );
      });
  };

  const actualizarPlantilla = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/ModificarJSON";
    const formData = new FormData();

    let emailValidator =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //console.log(document.getElementById("asunto").value.length);

    if (
      emailValidator.test(document.getElementById("correoDestinatario").value)
    ) {
      if (
        document.getElementById("asunto").value.length >= 10 &&
        document.getElementById("asunto").value.length <= 70
      ) {
        //Añadimos otros parámetros importantes
        formData.append("isSolicitud", false);

        formData.append(
          "subCarpeta",
          document.getElementById("seleccionMetadata").options[
            document.getElementById("seleccionMetadata").selectedIndex
          ].innerText
        );

        var parametros = {
          titulo:
            document.getElementById("seleccionMetadata").options[
              document.getElementById("seleccionMetadata").selectedIndex
            ].innerText,
          asunto: document.getElementById("asunto").value,
          destinatario: document.getElementById("correoDestinatario").value,
          cuerpo: document.getElementById("cuerpoCorreo").value,
        };

        formData.append("data", JSON.stringify(parametros));

        //Añadimos todos los archivos para enviarlos a la API
        for (var indice = 0; indice < loadedFiles.length; indice++) {
          formData.append(
            "Archivo",
            loadedFiles[indice],
            loadedFiles[indice].name
          );
        }

        axios
          .post(srvReq, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resultado) => {
            console.log(resultado.data.Code);
            if (resultado.data.Code === 1) {
              showToast(
                "success",
                "Actualizado",
                "Los cambios han sido guardados"
              );
              ObtenerCorreos();
              ColocarMetadata();
            } else {
              showToast("error", "Error", "Los cambios no han sido guardados");
            }
          })
          .catch((error) => console.log(error));
      } else {
        showToast("error", "Error", "Coloque un asunto valido");
      }
    } else {
      showToast("error", "Error", "Coloque un destinatario valido");
    }
  };

  //Colocar el valor del campo seleccionado en el area de texto para poder cambiarlo
  const ColocarMetadata = () => {
    setLoadedFiles([]);
    setRecoveredFiles([]);
    var elemento = document.getElementById("seleccionMetadata");
    //console.log(elemento.options[elemento.selectedIndex].value)
    var ID_Metadata = elemento.options[elemento.selectedIndex].value;
    if (ID_Metadata !== "Seleccionar") {
      document.getElementById("asunto").value =
        listaCorreos[ID_Metadata].asunto;
      document.getElementById("correoDestinatario").value =
        listaCorreos[ID_Metadata].destinatario;
      document.getElementById("cuerpoCorreo").value =
        listaCorreos[ID_Metadata].cuerpo;
      var spliced =
        listaCorreos[ID_Metadata].adjuntos !== ""
          ? listaCorreos[ID_Metadata].adjuntos.split(";")
          : "";
      setRecoveredFiles(spliced);
    }
    if (ID_Metadata === "Seleccionar") {
      document.getElementById("asunto").value = "";
      document.getElementById("correoDestinatario").value = "";
      document.getElementById("cuerpoCorreo").value = "";
    }
  };

  const toast = useRef(null);
  const [selectedFile] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const [errorMessage, setMessage] = useState("");

  const changeHandler = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type !== "application/pdf") {
      setMessage("Solo se permiten archivos PDF");
      event.target.value = null;
    } else {
      //Si el archivo pesa más de 2MB
      if (selectedFile && selectedFile.size > 2000000) {
        setMessage(`El archivo es demasiado grande (máximo 2 MB).`);
        event.target.value = null;
        return;
      } else {
        setIsSelected(true);
        setMessage("Presione el siguiente botón para guardar");
      }
    }
  };

  const handleSubmit = async (event) => {
    if (!selectedFile) {
      setMessage("Por favor, seleccione un archivo.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("archivo", selectedFile);

      const response = await fetch("", { method: "POST", body: formData });

      if (!response.ok) {
        setMessage("Hubo un problema. Inténtalo más tarde");
      }
    } catch (errorMessage) {
      console.error(errorMessage);
      setMessage("Hubo un problema al subir el archivo al servidor.");
    }
  };

  const showToast = (severityValue, summaryValue, detailValue) => {
    toast.current.show({
      closable: false,
      life: 5000,
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  };

  //Funcion que carga lo interno al renderizar
  useEffect(() => {
    ObtenerCorreos();
  }, []);

  //Función para no borrar un archivo ya existente
  const handleKeepFile = (archivo) => {
    document.getElementById(archivo).style.color = "#00bb00";
  };

  const handleUnkeepFile = (archivo) => {
    document.getElementById(archivo).style.color = "#000000";
  };

  //Función para descargar archivo
  const handleDownloadFile = (archivo) => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/ObtenerDocumentoJSON";

    var subCarpeta =
      document.getElementById("seleccionMetadata").options[
        document.getElementById("seleccionMetadata").selectedIndex
      ].innerText;
    axios({
      url: srvReq,
      method: "GET",
      responseType: "blob",
      params: {
        subCarpeta: subCarpeta,
        nombreArchivo: archivo,
      },
    })
      .then((respuesta) => {
        console.log(respuesta);
        const href = URL.createObjectURL(respuesta.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", archivo);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Función para borrar archivos de la lista, antes de subirlos al back-end
  const handleRemoveFile = (archivo) => {
    const loaded = [...loadedFiles];
    const index = loaded.indexOf(archivo);
    loaded.splice(index, 1);
    setLoadedFiles(loaded);
  };

  //Auxiliar para añadir todos los archivos unicos a un arreglo, antes de verificar
  const handleLoadedFiles = (files) => {
    const loaded = [...loadedFiles];
    // eslint-disable-next-line array-callback-return
    files.some((file) => {
      if (loaded.findIndex((f) => f.name === file.name) === -1) {
        loaded.push(file);
      }
    });
    setLoadedFiles(loaded);
  };

  //Función para manejar la subida de archivos
  const handleFileEvent = (event) => {
    const chosenFiles = Array.prototype.slice.call(event.target.files);
    handleLoadedFiles(chosenFiles);
  };

  return (
    <Container>
      <Toast ref={toast} position="top-right" />
      <div id="edicionCorreo" className="modules">
        <div>
          <label>Seleccione el correo a editar:</label>
          <span class="input-group-btn">
            <select
              type="button"
              className="btn btn-primary"
              id="seleccionMetadata"
              onChange={ColocarMetadata}
            >
              <option id="Seleccionar">Seleccionar</option>
              {listaCorreos.length > 0 &&
                listaCorreos.map((correo) => {
                  return (
                    <option value={listaCorreos.indexOf(correo)}>
                      {correo.titulo}
                    </option>
                  );
                })}
            </select>
          </span>

          <br></br>
          <Requisito>Inserte un correo válido</Requisito>
          <hr></hr>
          <label>Asunto:ㅤㅤ</label>
          <input
            type="text"
            name="Asunto"
            id="asunto"
            onChange={null}
            style={{ maxWidth: 2000, minWidth: 300 }}
          ></input>

          <br></br>
          <Requisito>Sólo se permiten caracteres A-Z y números</Requisito>
          <br></br>
          <br></br>

          <label>Correo a enviar:ㅤ</label>
          <input
            type="text"
            name="Destinatario"
            id="correoDestinatario"
            onChange={null}
            style={{ maxWidth: 2000, minWidth: 300 }}
          ></input>
          <br></br>
          <Requisito>Inserte un correo válido</Requisito>

          <br></br>
          <br></br>

          <label>Cuerpo:</label>
          <textarea
            className="form-control"
            rows="5"
            id="cuerpoCorreo"
            placeholder="Texto del correo"
          ></textarea>

          <br></br>
          <br></br>

          <input
            type="file"
            id="subirArchivos"
            name="Elegir archivos"
            multiple
            onChange={handleFileEvent}
            style={{ display: "none" }}
          ></input>
          <label htmlFor="subirArchivos">
            {
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className="w3-btn w3-light-blue">
                Seleccionar documentos para subir
              </a>
            }
          </label>
          <br />
          {isSelected ? (
            <br></br>
          ) : (
            <>
              <br></br>
              <Requisito>
                Seleccione un archivo en formato PDF, no mayor a 2MB
              </Requisito>
            </>
          )}
          {errorMessage && <Requisito>{errorMessage}</Requisito>}
        </div>
        <br />

        {loadedFiles.length > 0 && (
          <div>
            <label>Documentos: </label>
            <ul>
              {loadedFiles.map(function (item) {
                return (
                  <div>
                    <li>
                      <FaTrash onClick={() => handleRemoveFile(item)} />
                      {item.name}
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        )}
        {recoveredFiles.length > 0 &&
          recoveredFiles.map(function (item) {
            return (
              <div>
                <li id={item}>
                  <FaTrash onClick={() => handleRemoveFile(item)} />
                  <FaTimes onClick={() => handleUnkeepFile(item)} />
                  <FaCheck onClick={() => handleKeepFile(item)} />
                  <FaDownload onClick={() => handleDownloadFile(item)} />
                  {item}
                </li>
              </div>
            );
          })}
        <br />
        <button
          type="submit"
          className="guardarCorreo"
          value="Guardar Cambios"
          class="w3-button w3-green"
          onClick={actualizarPlantilla}
        >
          Guardar Cambios
        </button>
      </div>
    </Container>
  );
}
export default EdicionCorreos;
