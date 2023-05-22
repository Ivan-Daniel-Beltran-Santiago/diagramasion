import React from "react";

const SubmenuBienvenidaUsuario = ({
  SubmenuBienvenidaUsuarioUsuarioActivo,
  SubmenuBienvenidaUsuarioListaSolicitudes,
  SubmenuBienvenidaUsuarioEstatusLexico,
}) => {
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
                  {SubmenuBienvenidaUsuarioEstatusLexico[SubmenuBienvenidaUsuarioListaSolicitudes[0].estatus_Actual]}
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
            <span className="progreso_en_Solicitud">
              En caso de querer actualizaciones en su solicitud, vea la pestaña
              "Mis Solicitudes" o mande correo a{" "}
              <i>ventanillaith@hermosillo.tecnm.mx</i>
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SubmenuBienvenidaUsuario;
