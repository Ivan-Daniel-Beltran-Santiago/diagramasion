import React from "react";
import { Toast } from "primereact/toast";
import { FaTrash } from "react-icons/fa";

function SubmenuSolicitudEstudiante({
  SubmenuSolicitudEstudianteTostado,
  SubmenuSolicitudEstudianteListaSolicitudes,
  SubmenuSolicitudEstudianteSetSolicitudVisible,
  SubmenuSolicitudEstudianteSolicitudVisible,
  SubmenuSolicitudEstudianteArchivosSubir,
  SubmenuSolicitudEstudianteHandleFileEvent,
  SubmenuSolicitudEstudianteHandleRemoveFile,
  SubmenuSolicitudEstudianteEstatusProgreso,
  SubmenuSolicitudEstudianteEstatusLexico,
  SubmenuSolicitudEstudianteSubirDocumentos,
}) {

  return (
    <div id="solicitudEstudiante" className="modules">
      <Toast ref={SubmenuSolicitudEstudianteTostado} position="top-right" />
      {SubmenuSolicitudEstudianteListaSolicitudes &&
        SubmenuSolicitudEstudianteListaSolicitudes.map(function (solicitud) {
          return (
            <div
              className="accordion-item"
              key={
                SubmenuSolicitudEstudianteListaSolicitudes.indexOf(solicitud) +
                ".Acordeon"
              }
            >
              <div
                className="tituloAcordeon"
                key={
                  SubmenuSolicitudEstudianteListaSolicitudes.indexOf(
                    solicitud
                  ) + ".AcordeonTitulo"
                }
                onClick={() =>
                  SubmenuSolicitudEstudianteSetSolicitudVisible(
                    !SubmenuSolicitudEstudianteSolicitudVisible
                  )
                }
              >
                <div className="Indicador">
                  {"Solicitud #: " + solicitud.id_Solicitud}
                </div>
                <div>
                  {SubmenuSolicitudEstudianteSolicitudVisible ? "-" : "+"}
                </div>
              </div>
              {SubmenuSolicitudEstudianteSolicitudVisible && (
                <div className="contenidoAcordeon">
                  <div className="contenedorSolicitud">
                    <p>
                      <label className="Indicador">
                        Fecha en la que se solicitó:⠀{" "}
                      </label>
                      {solicitud.fecha_Solicitud.split("T")[0]}
                    </p>
                    <p>
                      <label className="Indicador">Trámite solicitado:⠀ </label>
                      {solicitud.Tramite.nombre_Tramite}
                    </p>
                    <p>
                      <label className="Indicador">Estatus:⠀ </label>
                      {
                        SubmenuSolicitudEstudianteEstatusLexico[
                          solicitud.estatus_Actual
                        ]
                      }
                    </p>
                    <p>
                      <label className="Indicador">Guia de paqueteria:⠀ </label>
                      {solicitud.folio_Solicitud ?? "Folio no asignado."}
                    </p>
                    <p>
                      <label className="Indicador">
                        Retroalimentación disponible
                      </label>
                    </p>
                    <pre>{solicitud.retroalimentacion_Actual}</pre>
                    {(solicitud.estatus_Actual === 1 ||
                      solicitud.estatus_Actual === 3 ||
                      solicitud.estatus_Actual === 7) && (
                      <div>
                        <br />
                        <input
                          type="file"
                          id="subirArchivos"
                          name="Elegir archivos"
                          accept=".pdf"
                          multiple
                          onChange={(event) =>
                            SubmenuSolicitudEstudianteHandleFileEvent(event)
                          }
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
                        <p>Los documentos deben tener un peso maximo de 2MB.</p>
                        <p>
                          El nombre de los documentos solo puede tener letras,
                          digitos, espacios, -, _ , /, \ y sin espacio antes del
                          .pdf
                        </p>
                        {SubmenuSolicitudEstudianteArchivosSubir &&
                          SubmenuSolicitudEstudianteArchivosSubir.length >
                            0 && (
                            <div>
                              <p>
                                <label>
                                  Documentos preparados para subir:{" "}
                                </label>
                                <br />
                                {SubmenuSolicitudEstudianteArchivosSubir.map(
                                  function (archivo) {
                                    return (
                                      <div
                                        key={
                                          SubmenuSolicitudEstudianteArchivosSubir.indexOf(
                                            archivo
                                          ) + ".DIV.ARCHIVO"
                                        }
                                      >
                                        <FaTrash
                                          key={
                                            SubmenuSolicitudEstudianteArchivosSubir.indexOf(
                                              archivo
                                            ) + ".FATRASH.ARCHIVO"
                                          }
                                          onClick={() =>
                                            SubmenuSolicitudEstudianteHandleRemoveFile(
                                              archivo
                                            )
                                          }
                                        />
                                        {"   "}
                                        <label
                                          key={
                                            SubmenuSolicitudEstudianteArchivosSubir.indexOf(
                                              archivo
                                            ) + ".LABEL.ARCHIVO"
                                          }
                                        >
                                          {archivo.name}
                                        </label>
                                      </div>
                                    );
                                  }
                                )}
                              </p>
                              <p>
                                <input
                                  type="submit"
                                  className="confirmDocumentUpload"
                                  value="Subir documentos"
                                  id="subirDocumentosBtn"
                                  onClick={() =>
                                    SubmenuSolicitudEstudianteSubirDocumentos(
                                      solicitud.id_Solicitud,
                                      solicitud.estatus_Actual
                                    )
                                  }
                                  style={{
                                    display:
                                      SubmenuSolicitudEstudianteArchivosSubir.length >
                                      0
                                        ? "block"
                                        : "none",
                                  }}
                                ></input>
                              </p>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                  {solicitud.estatus_Actual > 0 &&
                    solicitud.estatus_Actual < 13 && (
                      <div>
                        <label>Progreso de la solicitud: </label>

                        <div className="progressBar">
                          <div
                            id="progreso"
                            className="progresando"
                            style={{
                              width:
                                SubmenuSolicitudEstudianteEstatusProgreso[
                                  solicitud.estatus_Actual ?? 0
                                ] + "%",
                            }}
                          >
                            {SubmenuSolicitudEstudianteEstatusProgreso[
                              solicitud.estatus_Actual ?? 0
                            ] + "%"}
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default SubmenuSolicitudEstudiante;
