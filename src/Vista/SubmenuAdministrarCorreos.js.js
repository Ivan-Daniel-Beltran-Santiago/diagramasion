import React, { useEffect } from "react";
import styled from "styled-components";
import { Toast } from "primereact/toast";
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

const SubmenuAdministrarCorreos = ({
  SubmenuAdministrarCorreosTostado,
  SubmenuAdministrarCorreosObtenerListaPlantillasCorreo,
  SubmenuAdministrarCorreosListaPlantillasCorreo,
  SubmenuAdministrarCorreosColocarInformacion,
  SubmenuAdministrarCorreosHandleInputChange,
  SubmenuAdministrarCorreosParametrosPlantillaCorreo,
  SubmenuAdministrarCorreosParametrosValidadosPlantillaCorreo,
  SubmenuAdministrarCorreosHandleFileEvent,
  SubmenuAdministrarCorreosArchivosPlantillaCorreoAñadir,
  SubmenuAdministrarCorreosHandleRemoveFileAñadir,
  SubmenuAdministrarCorreosArchivosPlantillaCorreo,
  SubmenuAdministrarCorreosHandleDownloadFile,
  SubmenuAdministrarCorreosHandleRemoveFile,
  SubmenuAdministrarCorreosHandleConfirmFile,
  SubmenuAdministrarCorreosArchivosPlantillaCorreoEliminar,
  SubmenuAdministrarCorreosActualizarPlantilla,
}) => {
  useEffect(() => {
    SubmenuAdministrarCorreosObtenerListaPlantillasCorreo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Toast ref={SubmenuAdministrarCorreosTostado} position="top-right" />
      <div id="edicionCorreo" className="modules">
        <div>
          <label>Seleccione el correo a editar:</label>
          <span class="input-group-btn">
            <select
              type="button"
              className="btn btn-primary"
              id="seleccionMetadataCorreo"
              onChange={() =>
                SubmenuAdministrarCorreosColocarInformacion(
                  document.getElementById("seleccionMetadataCorreo").options[
                    document.getElementById("seleccionMetadataCorreo")
                      .selectedIndex
                  ].value
                )
              }
            >
              <option id="Seleccionar">Seleccionar</option>
              {SubmenuAdministrarCorreosListaPlantillasCorreo.length > 0 &&
                SubmenuAdministrarCorreosListaPlantillasCorreo.map(
                  (plantillaCorreo) => {
                    return (
                      <option
                        key={
                          "Plantilla." +
                          SubmenuAdministrarCorreosListaPlantillasCorreo.indexOf(
                            plantillaCorreo
                          )
                        }
                        value={SubmenuAdministrarCorreosListaPlantillasCorreo.indexOf(
                          plantillaCorreo
                        )}
                      >
                        {plantillaCorreo.titulo}
                      </option>
                    );
                  }
                )}
            </select>
          </span>
          <br></br>
          <hr></hr>
          <label>Asunto:ㅤㅤ</label>
          <input
            type="text"
            name="Asunto"
            id="correoAsunto"
            onChange={SubmenuAdministrarCorreosHandleInputChange}
            style={{ maxWidth: 2000, minWidth: 300 }}
          ></input>
          <br></br>
          {!SubmenuAdministrarCorreosParametrosValidadosPlantillaCorreo.Asunto &&
            SubmenuAdministrarCorreosParametrosPlantillaCorreo.Asunto !==
              "" && (
              <Requisito>
                Sólo se permiten caracteres A-Z, números, comas, puntos y
                espacios en blanco. Ademas solo se permiten entre 10 y 100 caracteres.
              </Requisito>
            )}
          <br></br>
          <br></br>
          <label>Correo a enviar:ㅤ</label>
          <input
            type="text"
            name="Destinatario"
            id="correoDestinatario"
            onChange={SubmenuAdministrarCorreosHandleInputChange}
            style={{ maxWidth: 2000, minWidth: 300 }}
          ></input>
          <br></br>
          {!SubmenuAdministrarCorreosParametrosValidadosPlantillaCorreo.Destinatario &&
            SubmenuAdministrarCorreosParametrosPlantillaCorreo.Destinatario !==
              "" && (
              <Requisito>
                Inserte un correo válido o $correo_e$ para usar el correo del
                estudiante solicitante(Solo para el correo de inicio)
              </Requisito>
            )}
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
          {SubmenuAdministrarCorreosParametrosPlantillaCorreo.Indice !== -1 && (
            <div>
              <input
                type="file"
                id="subirArchivos"
                name="Elegir archivos"
                multiple
                onChange={SubmenuAdministrarCorreosHandleFileEvent}
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
            </div>
          )}
          <br />
        </div>
        <br />
        {SubmenuAdministrarCorreosParametrosPlantillaCorreo.Indice !== -1 &&
          SubmenuAdministrarCorreosArchivosPlantillaCorreoAñadir.length > 0 && (
            <div>
              <label>Documentos por añadir a la plantilla: </label>
              <br />
              <br />
              <p>
                Presione el icono <FaTrash className="fa-5x" /> para eliminar
                archivos antes de subirlos
              </p>
              <ul>
                {SubmenuAdministrarCorreosArchivosPlantillaCorreoAñadir.map(
                  function (archivo) {
                    return (
                      <div>
                        <li>
                          <FaTrash
                            className="fa-5x"
                            onClick={() =>
                              SubmenuAdministrarCorreosHandleRemoveFileAñadir(
                                archivo
                              )
                            }
                          />
                          {archivo.name}
                        </li>
                      </div>
                    );
                  }
                )}
              </ul>
            </div>
          )}
        {SubmenuAdministrarCorreosParametrosPlantillaCorreo.Indice !== -1 &&
          SubmenuAdministrarCorreosArchivosPlantillaCorreo &&
          SubmenuAdministrarCorreosArchivosPlantillaCorreo.length > 0 && (
            <div>
              <label>Documentos que ya existen en la plantilla: </label>
              <br />
              <br />
              <p>
                Presione el icono <FaDownload className="fa-5x" /> para
                descargar el archivo
              </p>
              <p>
                Presione el icono <FaTimes className="fa-5x" /> para eliminar
                los archivos no deseados que ya estan en el servidor. Estos
                archivos seran marcados en color rojo
              </p>
              <p>
                Presione el icono <FaCheck className="fa-5x" /> para conservar
                un archivo que ya se habia seleccionado para eliminar,
                cambiandolo de color rojo a color normal.
              </p>
              <ul>
                {SubmenuAdministrarCorreosArchivosPlantillaCorreo.map(function (
                  archivoExistente
                ) {
                  return (
                    <div>
                      <li id={"Archivo.Existente." + archivoExistente}>
                        <FaDownload
                          onClick={() =>
                            SubmenuAdministrarCorreosHandleDownloadFile(
                              SubmenuAdministrarCorreosParametrosPlantillaCorreo.Indice,
                              archivoExistente
                            )
                          }
                        />

                        {SubmenuAdministrarCorreosArchivosPlantillaCorreoEliminar.indexOf(
                          archivoExistente
                        ) === -1 && (
                          <FaTimes
                            onClick={() =>
                              SubmenuAdministrarCorreosHandleRemoveFile(
                                archivoExistente
                              )
                            }
                          />
                        )}

                        {SubmenuAdministrarCorreosArchivosPlantillaCorreoEliminar.indexOf(
                          archivoExistente
                        ) !== -1 && (
                          <FaCheck
                            onClick={() =>
                              SubmenuAdministrarCorreosHandleConfirmFile(
                                archivoExistente
                              )
                            }
                          />
                        )}

                        {archivoExistente}
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          )}
        <br />
        {SubmenuAdministrarCorreosParametrosPlantillaCorreo.Indice !== -1 && (
          <button
            type="submit"
            className="guardarCorreo"
            value="Guardar Cambios"
            class="w3-button w3-green"
            onClick={SubmenuAdministrarCorreosActualizarPlantilla}
          >
            Guardar Cambios
          </button>
        )}
      </div>
    </Container>
  );
};
export default SubmenuAdministrarCorreos;
