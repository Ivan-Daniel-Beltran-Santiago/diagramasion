import React, { useEffect } from "react";
import { Toast } from "primereact/toast";

function SubmenuAdministrarSolicitud({
  SubmenuAdministrarSolicitudTostado,
  SubmenuAdministrarSolicitudSolicitudSeleccionada,
  SubmenuAdministrarSolicitudObtenerDescripciones,
  SubmenuAdministrarSolicitudProgresoEstatus,
  SubmenuAdministrarSolicitudEstatusLexico,
  SubmenuAdministrarSolicitudEstatusRetroalimentacion,
  SubmenuAdministrarSolicitudObtenerDocumentoSolicitud,
  SubmenuAdministrarSolicitudSolicitarSeguimiento,
  SubmenuAdministrarSolicitudActualizarSolicitud,
}) {
  useEffect(() => {
    SubmenuAdministrarSolicitudObtenerDescripciones();
  }, []);

  return (
    <div id="NuevaInterfaz" className="modules">
      <Toast ref={SubmenuAdministrarSolicitudTostado} position="top-right" />
      <div className="newInterface_container">
        <div className="row_1_administrarSolicitud">
          <form className="w3-container">
            <label className="Indicador">Nombre del solicitante:⠀ </label>
            <label>
              {SubmenuAdministrarSolicitudSolicitudSeleccionada
                ? SubmenuAdministrarSolicitudSolicitudSeleccionada.Usuario
                  ? SubmenuAdministrarSolicitudSolicitudSeleccionada.Usuario
                      .nombre_Completo !== ""
                    ? SubmenuAdministrarSolicitudSolicitudSeleccionada.Usuario
                        .nombre_Completo
                    : "Error al obtener la solicitud"
                  : "Error al obtener la solicitud"
                : "Solicitud no seleccionada"}
            </label>
            <br />
            <br />
            <label className="Indicador">Trámite que solicita:⠀ </label>
            <label>
              {SubmenuAdministrarSolicitudSolicitudSeleccionada
                ? SubmenuAdministrarSolicitudSolicitudSeleccionada.Tramite
                  ? SubmenuAdministrarSolicitudSolicitudSeleccionada.Tramite
                      .nombre_Tramite !== ""
                    ? SubmenuAdministrarSolicitudSolicitudSeleccionada.Tramite
                        .nombre_Tramite
                    : "Error al obtener la solicitud"
                  : "Error al obtener la solicitud"
                : "Solicitud no seleccionada"}
            </label>
            <br />
            <br />
            <label className="Indicador">Estatus actual:⠀ </label>
            <label>
              {SubmenuAdministrarSolicitudSolicitudSeleccionada
                ? SubmenuAdministrarSolicitudSolicitudSeleccionada.estatus_Actual >
                    0 &&
                  SubmenuAdministrarSolicitudSolicitudSeleccionada.estatus_Actual <
                    13
                  ? SubmenuAdministrarSolicitudEstatusLexico[
                      SubmenuAdministrarSolicitudSolicitudSeleccionada
                        .estatus_Actual
                    ]
                  : "Error al obtener la solicitud"
                : "Solicitud no seleccionada"}
            </label>
            <br />
            <br />
            <label className="Indicador">Fecha en que se solicitó:⠀ </label>
            <label>
              {SubmenuAdministrarSolicitudSolicitudSeleccionada
                ? SubmenuAdministrarSolicitudSolicitudSeleccionada.fecha_Solicitud !==
                  ""
                  ? SubmenuAdministrarSolicitudSolicitudSeleccionada.fecha_Solicitud.split(
                      "T"
                    )[0]
                  : "Error al obtener la solicitud"
                : "Solicitud no seleccionada"}
            </label>
            <br />
            <br />
            {SubmenuAdministrarSolicitudSolicitudSeleccionada && (
              <div>
                <label className="Indicador">Progreso de la solicitud: </label>

                <div className="progressBar">
                  <div
                    id="progreso"
                    className="progresando"
                    style={{
                      width:
                        SubmenuAdministrarSolicitudProgresoEstatus[
                          SubmenuAdministrarSolicitudSolicitudSeleccionada
                            ? SubmenuAdministrarSolicitudSolicitudSeleccionada.estatus_Actual >
                                0 &&
                              SubmenuAdministrarSolicitudSolicitudSeleccionada.estatus_Actual <
                                13
                              ? SubmenuAdministrarSolicitudSolicitudSeleccionada.estatus_Actual
                              : 0
                            : 0
                        ] + "%",
                    }}
                  >
                    {SubmenuAdministrarSolicitudProgresoEstatus[
                      SubmenuAdministrarSolicitudSolicitudSeleccionada
                        ? SubmenuAdministrarSolicitudSolicitudSeleccionada.estatus_Actual >
                            0 &&
                          SubmenuAdministrarSolicitudSolicitudSeleccionada.estatus_Actual <
                            13
                          ? SubmenuAdministrarSolicitudSolicitudSeleccionada.estatus_Actual
                          : 0
                        : 0
                    ] + "%"}
                  </div>
                </div>
              </div>
            )}
            <br />
            <br />
            <label className="Indicador">Fecha del último estatus:⠀</label>
            <label>
              {SubmenuAdministrarSolicitudSolicitudSeleccionada
                ? SubmenuAdministrarSolicitudSolicitudSeleccionada.fecha_Actualizacion !==
                  ""
                  ? SubmenuAdministrarSolicitudSolicitudSeleccionada.fecha_Actualizacion.split(
                      "T"
                    )[0]
                  : "Error al obtener la solicitud"
                : "Solicitud no seleccionada"}
            </label>
            {}
            {SubmenuAdministrarSolicitudSolicitudSeleccionada &&
              SubmenuAdministrarSolicitudSolicitudSeleccionada.Documentos &&
              SubmenuAdministrarSolicitudSolicitudSeleccionada.Documentos
                .length > 0 && (
                <div>
                  <br />
                  <br />
                  <label className="Indicador">Lista de documentos: </label>
                  <br />
                  <br />
                  {SubmenuAdministrarSolicitudSolicitudSeleccionada.Documentos.map(
                    function (documento) {
                      return (
                        <div
                          className="documentList"
                          key={documento.id_Documento}
                        >
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                          <a
                            id={documento.id_Documento}
                            onClick={() =>
                              SubmenuAdministrarSolicitudObtenerDocumentoSolicitud(
                                documento.id_Documento,
                                documento.nombre_Documento
                              )
                            }
                            u
                          >
                            {documento.nombre_Documento}
                          </a>
                          <br />
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            <br />
          </form>
        </div>
        <div className="row_2_administrarSolicitud">
          <form className="w3-container">
            <label className="Indicador">Cambiar estatus: </label>
            <br />
            <br />
            <form className="w3-container">
              <select name="lenguajes" id="lang">
                <option value="3">
                  {SubmenuAdministrarSolicitudEstatusLexico[3]}
                </option>
                <option value="4">
                  {SubmenuAdministrarSolicitudEstatusLexico[4]}
                </option>
                <option value="5">
                  {SubmenuAdministrarSolicitudEstatusLexico[5]}
                </option>
                <option value="6">
                  {SubmenuAdministrarSolicitudEstatusLexico[6]}
                </option>
                <option value="7">
                  {SubmenuAdministrarSolicitudEstatusLexico[7]}
                </option>
                <option value="9">
                  {SubmenuAdministrarSolicitudEstatusLexico[9]}
                </option>
                <option value="10">
                  {SubmenuAdministrarSolicitudEstatusLexico[10]}
                </option>
                <option value="11">
                  {SubmenuAdministrarSolicitudEstatusLexico[11]}
                </option>
                <option value="12">
                  {SubmenuAdministrarSolicitudEstatusLexico[12]}
                </option>
              </select>
            </form>
            <br />
            <label className="Indicador">Retroalimentación: </label>
            <br />
            <textarea
              name="retroalimentacion"
              cols="48"
              rows="8"
              id="retro"
              placeholder={
                SubmenuAdministrarSolicitudSolicitudSeleccionada
                  ? SubmenuAdministrarSolicitudSolicitudSeleccionada.retroalimentacion_Actual !==
                    ""
                    ? SubmenuAdministrarSolicitudSolicitudSeleccionada.retroalimentacion_Actual
                    : "Error al obtener la solicitud"
                  : "Solicitud no seleccionada"
              }
            ></textarea>
          </form>
          <br />
          <button
            class="w3-button w3-green"
            onClick={() =>
              SubmenuAdministrarSolicitudSolicitudSeleccionada
                ? SubmenuAdministrarSolicitudActualizarSolicitud(
                    SubmenuAdministrarSolicitudSolicitudSeleccionada.id_Solicitud,
                  )
                : null
            }
          >
            {SubmenuAdministrarSolicitudSolicitudSeleccionada
              ? "Actualizar solicitud"
              : "Solicitud no seleccionada"}
          </button>
          <br />
          <br />
          <button
            class="w3-button w3-green"
            onClick={() =>
              SubmenuAdministrarSolicitudSolicitudSeleccionada
                ? SubmenuAdministrarSolicitudSolicitarSeguimiento(
                    SubmenuAdministrarSolicitudSolicitudSeleccionada.folio_Solicitud
                      ? SubmenuAdministrarSolicitudSolicitudSeleccionada.id_Solicitud
                      : null
                  )
                : null
            }
          >
            {SubmenuAdministrarSolicitudSolicitudSeleccionada
              ? "Solicitar seguimiento"
              : "Solicitud no seleccionada"}
          </button>
        </div>
      </div>
      <div className="requestInvoice">
        <label className="Indicador">Guia de paqueteria: </label>
        <br />
        <input
          type="text"
          name="Num_folio"
          cols="80"
          rows="1"
          id="Folio"
          placeholder={
            SubmenuAdministrarSolicitudSolicitudSeleccionada
              ? SubmenuAdministrarSolicitudSolicitudSeleccionada.folio_Solicitud
                ? SubmenuAdministrarSolicitudSolicitudSeleccionada.folio_Solicitud
                : "Folio no asignado"
              : "Solicitud no seleccionada"
          }
        ></input>
      </div>
    </div>
  );
}

export default SubmenuAdministrarSolicitud;
