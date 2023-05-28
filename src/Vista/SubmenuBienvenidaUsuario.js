import React, { useEffect } from "react";

const SubmenuBienvenidaUsuario = ({
  SubmenuBienvenidaUsuarioUsuarioActivo,
  SubmenuBienvenidaUsuarioListaSolicitudes,
  SubmenuBienvenidaUsuarioObtenerSolicitudes,
  SubmenuBienvenidaUsuarioEstatusLexico,
  SubmenuBienvenidaUsuarioObtenerDescripciones,
  SubmenuBienvenidaUsuarioConteoSolicitudes,
  SubmenuBienvenidaUsuarioObtenerConteoSolicitudes,
}) => {
  useEffect(() => {
    SubmenuBienvenidaUsuarioObtenerSolicitudes();
    SubmenuBienvenidaUsuarioObtenerDescripciones();
    SubmenuBienvenidaUsuarioObtenerConteoSolicitudes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="bienvenidaEstudiante" className="modules">
      <p>
        <span>
          <u>
            Bienvenid@{" "}
            <b>{SubmenuBienvenidaUsuarioUsuarioActivo.nombre_Completo}.</b>
          </u>
        </span>
      </p>
      {SubmenuBienvenidaUsuarioUsuarioActivo.Estudiante !== null && (
        <div>
          {SubmenuBienvenidaUsuarioListaSolicitudes &&
            SubmenuBienvenidaUsuarioListaSolicitudes.length > 0 &&
            SubmenuBienvenidaUsuarioListaSolicitudes.map(function (solicitud) {
              return (
                <div>
                  <p>
                    <span className="progreso_en_Solicitud">
                      Su solicitud #<b>{solicitud.id_Solicitud}</b> tiene un
                      estatus a esta fecha de:{" "}
                      <b>
                        {
                          SubmenuBienvenidaUsuarioEstatusLexico[
                            solicitud.estatus_Actual
                          ]
                        }
                      </b>
                    </span>
                  </p>
                  <p>
                    <span className="impedimentos_en_Solicitud">
                      La ultima modificacion a sido a fecha de{" "}
                      <b>"{solicitud.fecha_Actualizacion.split("T")[0]}"</b>
                      {solicitud.estatus_Actual === 12
                        ? "."
                        : ", favor de estar atent@ a actualizaciones."}
                    </span>
                  </p>
                </div>
              );
            })}
          <p>
            {SubmenuBienvenidaUsuarioListaSolicitudes.length > 0 && (
              <span className="progreso_en_Solicitud">
                En caso de querer actualizaciones en su solicitud, vea la
                pestaña "Mis Solicitudes" o mande correo a{" "}
                <i>ventanillaith@hermosillo.tecnm.mx</i>
              </span>
            )}
            {SubmenuBienvenidaUsuarioListaSolicitudes.length === 0 && (
              <span className="progreso_en_Solicitud">
                Aún no tienes solicitudes activas, puedes iniciar una en la
                pestaña de Solicitar Tramite, para mas dudas, pongase en
                contacto via correo electronico a{" "}
                <i>ventanillaith@hermosillo.tecnm.mx</i>
              </span>
            )}
          </p>
        </div>
      )}
      {SubmenuBienvenidaUsuarioUsuarioActivo.Estudiante === null && (
        <div>
          <p>
            <span id="nuevas_solicitudes">
              <b>Numero de solicitudes nuevas actualmente:</b>{" "}
              {SubmenuBienvenidaUsuarioConteoSolicitudes.nuevas}
            </span>
          </p>
          <p>
            <span id="documentos_fisicos">
              <b>
                Numero de solicitudes con los documentos digitales revisados
                actualmente:
              </b>{" "}
              {SubmenuBienvenidaUsuarioConteoSolicitudes.documentos}
            </span>
          </p>
          <p>
            <span id="finiquito_espera">
              <b>Numero de solicitudes esperando el finiquito actualmente:</b>{" "}
              {SubmenuBienvenidaUsuarioConteoSolicitudes.finiquitos}
            </span>
          </p>
          <p>
            <span id="finalizados">
              <b>Numero de solicitudes finalizadas:</b>{" "}
              {SubmenuBienvenidaUsuarioConteoSolicitudes.finalizados}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SubmenuBienvenidaUsuario;
