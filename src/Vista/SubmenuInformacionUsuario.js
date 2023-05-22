import React from "react";
import { Toast } from "primereact/toast";

import styled from "styled-components";
const Container = styled.div`
  padding: 1em;
`;

function SubmenuInformacionUsuario({
  InfoUsuarioTostado,
  HandleInputChange,
  SubmenuInformacionUsuarioUsuarioActivo,
  InformacionUsuarioActualizar,
  ValidacionInformacionUsuario,
  ActualizarDatosUsuario,
}) {
  return (
    <Container>
      <div id="informacionUsuario" className="modules">
        <Toast ref={InfoUsuarioTostado} position="top-right" />
        <form className="info_usuario">
          <label className="Indicador">Matricula:⠀ </label>
          <label> {SubmenuInformacionUsuarioUsuarioActivo.matricula}</label>
          <br />
          <label className="Indicador">Nombre:⠀ </label>
          <label>
            {" "}
            {SubmenuInformacionUsuarioUsuarioActivo.nombre_Completo}
          </label>
          <br />
          {SubmenuInformacionUsuarioUsuarioActivo.Estudiante !== null && (
            <div>
              <label className="Indicador">Carrera:⠀ </label>
              <label>
                {" "}
                {SubmenuInformacionUsuarioUsuarioActivo.Estudiante.carrera}
              </label>
              <br />
              <label className="Indicador">Semestre:⠀ </label>
              <label>
                {" "}
                {SubmenuInformacionUsuarioUsuarioActivo.Estudiante.semestre}
              </label>
            </div>
          )}
        </form>
        <form className="info_usuario">
          <br />
          <label className="Indicador">
            Para cambiar su contraseña. (Opcional)
          </label>
          <p className="modules">
            <p>
              <label>Nueva contraseña: </label>
              <input
                type="password"
                placeholder="Nueva contraseña"
                autoComplete="off"
                name="nuevaContraseña"
                id="newPassword"
                onChange={HandleInputChange}
              ></input>
            </p>
            <p>
              <label>Repetir nueva contraseña: </label>
              <input
                type="password"
                placeholder="Repetir nueva contraseña"
                autoComplete="off"
                name="nuevaContraseñaConfirmar"
                id="confirmPassword"
                onChange={HandleInputChange}
              ></input>
            </p>
            {((!ValidacionInformacionUsuario.nuevaContraseña &&
              InformacionUsuarioActualizar.nuevaContraseña.length > 0) ||
              (!ValidacionInformacionUsuario.nuevaContraseñaConfirmar &&
                InformacionUsuarioActualizar.nuevaContraseñaConfirmar.length >
                  0)) && (
              <label className="LoginWarning">
                La nueva contraseña debe contener entre 4 y 8 digitos{" "}
              </label>
            )}
            <br />
            {!ValidacionInformacionUsuario.nuevaContraseñaCoincide &&
              InformacionUsuarioActualizar.nuevaContraseña.length > 0 &&
              InformacionUsuarioActualizar.nuevaContraseñaConfirmar.length >
                0 && (
                <label className="LoginWarning">
                  La contraseña debe coindidir en ambos campos
                </label>
              )}
          </p>
          <label className="Indicador">
            Para cambiar su correo electrónico: (Opcional)
          </label>
          <p className="modules">
            <p>
              <label>Correo Electronico: </label>
              <input
                type="email"
                placeholder={SubmenuInformacionUsuarioUsuarioActivo.correo_e}
                name="nuevoCorreo_e"
                id="newEmail"
                onChange={HandleInputChange}
              ></input>
            </p>
            {!ValidacionInformacionUsuario.nuevoCorreo_e &&
              InformacionUsuarioActualizar.nuevoCorreo_e.length > 0 && (
                <div>
                  <label className="LoginWarning">
                    El correo electronico debe seguir el siguiente formato:
                  </label>
                  <br />
                  <label className="LoginWarning">
                    -Al menos un caracter/digito antes y despues del @
                  </label>
                  <br />
                  <label className="LoginWarning">
                    -Se permiten solo los simbolos @ y .{" "}
                  </label>
                  <br />
                  <label className="LoginWarning">
                    -De 2 a 3 caracteres al final como el .com o .mx o similares
                  </label>
                </div>
              )}
          </p>
          {(ValidacionInformacionUsuario.nuevoCorreo_e ||
            (ValidacionInformacionUsuario.nuevaContraseña &&
              ValidacionInformacionUsuario.nuevaContraseñaCoincide)) && (
            <div>
              <label className="Indicador">
                Para actualizar los datos, ingrese su contraseña actual:{" "}
              </label>
              <p className="modules">
                <label className="Indicador">Contraseña actual:</label>{" "}
                <label className="Obligatorio">*</label>
                <input
                  type="password"
                  placeholder="Contraseña actual"
                  autoComplete="off"
                  name="contraseñaActual"
                  id="contraseñaUsuario"
                  onChange={HandleInputChange}
                ></input>
              </p>
            </div>
          )}
        </form>
        {(ValidacionInformacionUsuario.nuevoCorreo_e ||
          (ValidacionInformacionUsuario.nuevaContraseña &&
            ValidacionInformacionUsuario.nuevaContraseñaCoincide)) && (
          <button className="confirmarCambios" onClick={ActualizarDatosUsuario}>
            Confirmar cambios
          </button>
        )}
      </div>
    </Container>
  );
}

export default SubmenuInformacionUsuario;
