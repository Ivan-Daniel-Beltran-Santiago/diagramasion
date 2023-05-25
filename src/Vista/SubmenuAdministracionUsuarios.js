import React from "react";
import { Toast } from "primereact/toast";
import SubmenuAdministracionUsuariosControlador from "../Controlador/SubmenuAdministracionUsuariosController";

function SubmenuAdministracionUsuarios({
  AdminUsuariosTostado,
  AdminUsuariosHandleFileEvent,
  AdminUsuariosRegistrosUsuariosExcel,
  SubmenuAdministracionUsuariosSubirNuevosUsuarios,
  SubmenuAdministracionUsuariosSetUsuarioEstudiante,
  SubmenuAdministracionUsuariosUsuarioEstudiante,
  SubmenuAdministracionUsuariosHandleInputChange,
  SubmenuAdministracionUsuariosBuscarUsuario,
  SubmenuAdministracionUsuariosSubirNuevoUsuario,
  SubmenuAdministracionUsuariosActualizarContraseñaUsuario,
  SubmenuAdministracionUsuariosActualizarUsuario,
  SubmenuAdministracionUsuariosRegistroUsuarioManual,
  SubmenuAdministracionUsuariosUsuarioManualValido,
  SubmenuAdministracionUsuariosUsuarioBuscado,
  SubmenuAdministracionUsuariosSetUsuarioBuscado,
  SubmenuAdministracionUsuariosConsultarMatricula,
}) {
  return (
    <div className="AdministracionUsuarios modules">
      <Toast ref={AdminUsuariosTostado} position="top-right" />
      <div className="InsertarExcel modules">
        <br />{" "}
        <label className="Indicador">Subir inicios de sesión (Excel)</label>{" "}
        <br />
        <p
          title="Subir inicios de sesión (Excel)"
          style={{ textAlign: "justify" }}
        >
          <u>
            Este apartado se encarga de subir los inicios de sesión para los
            estudiantes activos de la institución, por medio de un archivo
            previamente solicitado al departamento encargado de las altas y
            bajas estudiantiles.
          </u>
        </p>
        <label className="Indicador">
          Estructura y contenidos del archivo Excel
        </label>
        <p title="Formato Excel" style={{ textAlign: "justify" }}>
          El archivo tiene ciertos requerimientos para que funcione con el resto
          del sistema, los cuales se presentan a continuación
        </p>
        <ul>
          <li>
            El archivo debe ser del tipo xls (Excel 1987-2007) o xlsx (2007 -
            Actualidad).
          </li>
          <li>Solo se permite procesar un archivo a la vez.</li>
          <li>Solo una fila por estudiante.</li>
          <li>Solo una celda por dato.</li>
          <li>El orden de las celdas deberá ser el siguiente:</li>
          <ol>
            <li>Matricula.</li>
            <li>Apellido Paterno.</li>
            <li>Apellido Materno.</li>
            <li>Nombre(s).</li>
            <li>
              Correo electronico valido (Dejar celda en blanco para utilizar el
              institucional).
            </li>
            <li>Carrera a la que esta inscrito.</li>
            <li>Semestre que esta cursando.</li>
          </ol>
          <li>
            El archivo debe tener como primera fila los encabezados de las
            columnas.
          </li>
          <li>Los datos del estudiante deberán seguir el siguiente formato</li>
          <ul>
            <li>
              La matricula debe constar de 3 digitos para los encargados, y 8
              digitos para los estudiantes.{" "}
            </li>
            <li>
              En caso de ser estudiantes de posgrado, la matricula debe empezar
              con la letra "M", ya sea mayuscula o minuscula.
            </li>
            <li>
              El correo electronico debe ser uno valido y capaz de operar con
              naturalidad, se puede dejar vacio para utilizar el correo
              institucional.
            </li>
            <li>El semestre debe ser un número entero entre 1 y 14.</li>
          </ul>
        </ul>
        <form>
          <label>
            Favor de subir el archivo de inicios de sesión de estudiantes:{" "}
          </label>
          <br />
          <input
            type="file"
            id="subirArchivos"
            name="Elegir archivos"
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            multiple
            onChange={AdminUsuariosHandleFileEvent}
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
          {AdminUsuariosRegistrosUsuariosExcel.length > 0 && (
            <div>
              <details>
                <summary>Inicios de sesión detectados: </summary>
                <ul>
                  {AdminUsuariosRegistrosUsuariosExcel.map(
                    (registroUsuarioExcel) => {
                      return (
                        <li
                          key={
                            registroUsuarioExcel[0] +
                            "." +
                            AdminUsuariosRegistrosUsuariosExcel.indexOf(
                              registroUsuarioExcel
                            ) +
                            ".Registro"
                          }
                        >
                          <label
                            key={
                              registroUsuarioExcel[0] +
                              "." +
                              AdminUsuariosRegistrosUsuariosExcel.indexOf(
                                registroUsuarioExcel
                              ) +
                              ".matricula"
                            }
                          >
                            {"Matricula: " + registroUsuarioExcel[0]}
                          </label>
                          <br />
                          <label
                            key={
                              registroUsuarioExcel[0] +
                              "." +
                              AdminUsuariosRegistrosUsuariosExcel.indexOf(
                                registroUsuarioExcel
                              ) +
                              ".apellidoPaterno"
                            }
                          >
                            {"Apellido Paterno: " + registroUsuarioExcel[1]}
                          </label>
                          <br />
                          <label
                            key={
                              registroUsuarioExcel[0] +
                              "." +
                              AdminUsuariosRegistrosUsuariosExcel.indexOf(
                                registroUsuarioExcel
                              ) +
                              ".apellidoMaterno"
                            }
                          >
                            {"Apellido Materno: " + registroUsuarioExcel[2]}
                          </label>
                          <br />
                          <label
                            key={
                              registroUsuarioExcel[0] +
                              "." +
                              AdminUsuariosRegistrosUsuariosExcel.indexOf(
                                registroUsuarioExcel
                              ) +
                              ".nombreCompleto"
                            }
                          >
                            {"Nombres: " + registroUsuarioExcel[3]}
                          </label>
                          <br />
                          <label
                            key={
                              registroUsuarioExcel[0] +
                              "." +
                              AdminUsuariosRegistrosUsuariosExcel.indexOf(
                                registroUsuarioExcel
                              ) +
                              ".correoElectronico"
                            }
                          >
                            {"Correo Electronico: " + registroUsuarioExcel[4]}
                          </label>
                          <br />
                          <label
                            key={
                              registroUsuarioExcel[0] +
                              "." +
                              AdminUsuariosRegistrosUsuariosExcel.indexOf(
                                registroUsuarioExcel
                              ) +
                              ".carrera"
                            }
                          >
                            {"Carrera: " + registroUsuarioExcel[5]}
                          </label>
                          <br />
                          <label
                            key={
                              registroUsuarioExcel[0] +
                              "." +
                              AdminUsuariosRegistrosUsuariosExcel.indexOf(
                                registroUsuarioExcel
                              ) +
                              ".semestre"
                            }
                          >
                            {"Semestre: " + registroUsuarioExcel[6]}
                          </label>
                          <br />
                        </li>
                      );
                    }
                  )}
                </ul>
              </details>
              <input
                type="button"
                className="loadLogin"
                value="Subir inicios de sesión al sistema"
                onClick={() => {
                  SubmenuAdministracionUsuariosSubirNuevosUsuarios(
                    AdminUsuariosRegistrosUsuariosExcel
                  );
                }}
              ></input>
            </div>
          )}
        </form>
      </div>
      <div className="Insertar modules">
        <br />
        <label className="Indicador">Subir/modificar inicio de sesión</label>
        <p title="Subir inicio de sesión" style={{ textAlign: "justify" }}>
          <u>
            Este apartado se encarga de subir o modificar un inicio de sesión a
            la vez, de manera manual.
          </u>
        </p>
        <label className="Indicador">Formato de datos del estudiante</label>
        <p title="Formato Excel" style={{ textAlign: "justify" }}>
          Los datos del estudiante deben seguir cierto formato para ser
          aceptados en la base de datos, los cuales se describen a continuación.
        </p>
        <ul>
          <li>
            La matricula debe constar de 3 digitos para los encargados, y 8
            digitos para los estudiantes.{" "}
          </li>
          <li>
            En casos especiales, se pueden utilizar las letras B, C, D, y M, ya
            sea mayuscula o minuscula.
          </li>
          <li>
            El correo electronico debe ser uno valido y capaz de operar con
            naturalidad, se puede dejar vacio para utilizar el correo
            institucional.
          </li>
          <li>El semestre debe ser un número entero entre 1 y 14.</li>
        </ul>
        <p>
          <label>Encargadaㅤ</label>
          <input
            type="checkbox"
            id="checkEncargada"
            className="EncargadaCB"
            onChange={() => {
              SubmenuAdministracionUsuariosSetUsuarioEstudiante(
                !SubmenuAdministracionUsuariosUsuarioEstudiante
              );
            }}
          ></input>
        </p>
        <p>
          <label>Matricula:</label>
          <label className="Obligatorio">*ㅤ</label>
          <input
            type="text"
            name="matricula"
            id="mat"
            onChange={SubmenuAdministracionUsuariosHandleInputChange}
          ></input>{" "}
          {SubmenuAdministracionUsuariosUsuarioBuscado && (
            <div>
              <br />
              <label>Cambiar matricula:</label>
              <input
                type="text"
                name="nuevaMatricula"
                id="mat"
                onChange={SubmenuAdministracionUsuariosHandleInputChange}
              ></input>
            </div>
          )}
          {!SubmenuAdministracionUsuariosUsuarioManualValido.matricula &&
            SubmenuAdministracionUsuariosRegistroUsuarioManual.matricula
              .length > 0 &&
            SubmenuAdministracionUsuariosUsuarioBuscado && (
              <label className="LoginWarning" style={{ textAlign: "left" }}>
                {SubmenuAdministracionUsuariosUsuarioEstudiante
                  ? "Debe contener 8 digitos, puede tener las letras B, b, C, c, D, d, M, m según el caso."
                  : "Debe contener solo 3 digitos"}
              </label>
            )}
          {SubmenuAdministracionUsuariosUsuarioBuscado &&
            SubmenuAdministracionUsuariosConsultarMatricula &&
            SubmenuAdministracionUsuariosConsultarMatricula.consultarMatricula
              .length > 0 &&
            !SubmenuAdministracionUsuariosConsultarMatricula.esValida && (
              <label className="LoginWarning" style={{ textAlign: "left" }}>
                {SubmenuAdministracionUsuariosUsuarioEstudiante
                  ? "Debe contener 8 digitos, puede tener las letras B, b, C, c, D, d, M, m según el caso."
                  : "Debe contener solo 3 digitos"}
              </label>
            )}
        </p>
        <p>
          <label>Nombre completo:</label>
          <label className="Obligatorio">*ㅤ</label>
          <input
            type="text"
            name="nombreCompleto"
            id="nom"
            onChange={SubmenuAdministracionUsuariosHandleInputChange}
          ></input>
        </p>
        <p>
          <label>Correo Electronico:</label>
          <label className="Obligatorio">*ㅤ</label>
          <input
            type="text"
            name="correoElectronico"
            id="cor"
            onChange={SubmenuAdministracionUsuariosHandleInputChange}
          ></input>
          {!SubmenuAdministracionUsuariosUsuarioManualValido.correoElectronico &&
            SubmenuAdministracionUsuariosRegistroUsuarioManual.correoElectronico
              .length > 0 && (
              <label className="LoginWarning" style={{ textAlign: "left" }}>
                El correo electronico no es valido.
              </label>
            )}
        </p>
        {SubmenuAdministracionUsuariosUsuarioEstudiante && (
          <p>
            <label>Carrera:</label>
            <label className="Obligatorio">*ㅤ</label>
            <input
              type="text"
              name="carrera"
              id="car"
              onChange={SubmenuAdministracionUsuariosHandleInputChange}
            ></input>
          </p>
        )}
        {SubmenuAdministracionUsuariosUsuarioEstudiante && (
          <p>
            <label>Semestre:</label>
            <label className="Obligatorio">*ㅤ</label>
            <input
              type="number"
              name="semestre"
              id="semest"
              onChange={SubmenuAdministracionUsuariosHandleInputChange}
            ></input>
          </p>
        )}
        <div>
          <button onClick={SubmenuAdministracionUsuariosBuscarUsuario}>
            Buscar por matricula
          </button>
          <button onClick={SubmenuAdministracionUsuariosActualizarUsuario}>
            Modificar
          </button>
          <button onClick={SubmenuAdministracionUsuariosSubirNuevoUsuario}>
            Dar de alta
          </button>
          <button
            onClick={SubmenuAdministracionUsuariosActualizarContraseñaUsuario}
          >
            Restablecer Contraseña
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmenuAdministracionUsuarios;
