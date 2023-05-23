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
          {SubmenuBienvenidaUsuarioListaSolicitudes.length > 0 && (
            <p>
              <span className="progreso_en_Solicitud">
                Su solicitud tiene un estatus a esta fecha de:{" "}
                <b>
                  {
                    SubmenuBienvenidaUsuarioEstatusLexico[
                      SubmenuBienvenidaUsuarioListaSolicitudes[0].estatus_Actual
                    ]
                  }
                </b>
              </span>
            </p>
          )}
          {SubmenuBienvenidaUsuarioListaSolicitudes.length > 0 && (
            <p>
              <span className="impedimentos_en_Solicitud">
                La ultima modificacion a sido a fecha de{" "}
                <b>
                  "
                  {
                    SubmenuBienvenidaUsuarioListaSolicitudes[0].fecha_Actualizacion.split(
                      "T"
                    )[0]
                  }
                  "
                </b>
                , favor de estar atento a actualizaciones.
              </span>
            </p>
          )}
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
