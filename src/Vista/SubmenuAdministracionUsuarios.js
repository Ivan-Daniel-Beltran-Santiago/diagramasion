import React from "react";
import { Toast } from "primereact/toast";

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
  SubmenuAdministracionUsuariosUsuarioManualValido
}) {
  /*
  //Almancenar ultima matricula
  const [ultimaMatricula, setUltimaMatricula] = useState("");

  const handleCheckChange = (event) => {
    setEsEncargado(event.target.checked);
    //console.log(esEncargado)
  };

  //Con los campos de texto, da de alta un nuevo usuario
  const uploadAlumno = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/AltaEstudiante";
    if (validRegistro.carrera === true && validRegistro.semestre === true) {
      try {
        let matricula = registroUsuario.matricula;
        let nombre_Completo = registroUsuario.nombreCompleto;
        let contraseña = registroUsuario.matricula;
        let correo_e = registroUsuario.correoElectronico;
        let carrera = registroUsuario.carrera;
        let semestre = registroUsuario.semestre;
        axios
          .post(srvReq, {
            matriculaUser: matricula,
            nombreUser: nombre_Completo,
            contraseñaUser: contraseña,
            correoUser: correo_e,
            carreraUser: carrera,
            semestreUser: semestre,
          })
          .then((result) => {
            //console.log(result.data.Code);
            if (result.data.Code === 1) {
              showToast(
                "success",
                "Finalizado",
                "Estudiante " +
                  registroUsuario.matricula +
                  " a sido dado de alta."
              );
            } else {
              showToast(
                "error",
                "No dado de alta",
                "Estudiante " +
                  registroUsuario.matricula +
                  " posiblemente ya existe."
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (exception) {
        showToast(
          "error",
          "Inicios de sesión",
          "Ha ocurrido un error inesperado." + exception
        );
      }
    } else {
      console.log(validRegistro);
      showToast(
        "error",
        "Campos Invalidos",
        "Favor de revisar que los campos sean correctos."
      );
    }
  };

  //Con los campos de texto, da de alta un nuevo encargado
  const uploadEncargado = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/AltaEncargados";
    try {
      let matricula = registroUsuario.matricula;
      let nombre_Completo = registroUsuario.nombreCompleto;
      let contraseña = registroUsuario.matricula;
      let correo_e = registroUsuario.correoElectronico;
      axios
        .post(srvReq, {
          matriculaUser: matricula,
          nombreUser: nombre_Completo,
          contraseñaUser: contraseña,
          correoUser: correo_e,
        })
        .then((result) => {
          //console.log(result.data.Code);
          if (result.data.Code == 1) {
            showToast(
              "success",
              "Finalizado",
              "Encargado " + registroUsuario.matricula + " a sido dado de alta."
            );
          } else {
            showToast(
              "error",
              "No dado de alta",
              "Encargado " +
                registroUsuario.matricula +
                " posiblemente ya existe."
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (exception) {
      showToast(
        "error",
        "Inicios de sesión",
        "Ha ocurrido un error inesperado." + exception
      );
    }
  };

  const uploadOneUser = () => {
    console.log(validRegistro);
    if (
      validRegistro.matricula === true &&
      validRegistro.nombreCompleto === true &&
      validRegistro.correoElectronico === true
    ) {
      if (esEncargado) {
        if (registroUsuario.matricula.length === 3) {
          uploadEncargado();
        } else {
          showToast(
            "error",
            "Matricula Erronea",
            "Esta utilizando una matricula de estudiante."
          );
        }
      } else {
        if (registroUsuario.matricula.length != 3) {
          uploadAlumno();
        } else {
          showToast(
            "error",
            "Matricula Erronea",
            "Esta utilizando una matricula de encargado."
          );
        }
      }
    } else {
      showToast(
        "error",
        "Campos Invalidos",
        "Favor de revisar que los campos sean correctos."
      );
    }
  };

  //Funcion de busqueda por matricula de Encargada
  const searchEncargada = () => {
    if (validRegistro.matricula === true) {
      const srvDir = new ServerConnectionConfig();
      const srvReq = srvDir.getServer() + "/searchEncargada";
      try {
        let matricula = registroUsuario.matricula;
        axios
          .post(srvReq, {
            matriculaUser: matricula,
          })
          .then((result) => {
            if (result.data.Code == 1) {
              //console.log(result.data.result[0].nombre_Completo)
              document.getElementById("nom").value =
                result.data.result[0].nombre_Completo;
              document.getElementById("cor").value =
                result.data.result[0].correo_e;
              showToast(
                "success",
                "Datos encontrados",
                "Se encontraron los datos de " + registroUsuario.matricula
              );

              setRegistroUsuario({
                matricula: registroUsuario.matricula,
                nombreCompleto: result.data.result[0].nombre_Completo,
                correoElectronico: result.data.result[0].correo_e,
              });

              setValidRegistro({
                matricula: true,
                nombreCompleto: true,
                correoElectronico: true,
              });
            }
            if (result.data.Code == -1) {
              showToast(
                "error",
                "Finalizado",
                "El usuario con matricula " +
                  registroUsuario.matricula +
                  " no esta registrado o no es un estudiante."
              );
              document.getElementById("nom").value = "";
              document.getElementById("cor").value = "";
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (exception) {
        showToast(
          "error",
          "Inicios de sesión",
          "Ha ocurrido un error inesperado." + exception
        );
      }
    } else {
      showToast(
        "error",
        "Matricula Invalida",
        "Favor de revisar que el campo sea correcto."
      );
    }
  };

  //Funcion de busqueda por matricula
  const searchAlumno = () => {
    if (validRegistro.matricula === true) {
      const srvDir = new ServerConnectionConfig();
      const srvReq = srvDir.getServer() + "/searchAlumno";
      try {
        let matricula = registroUsuario.matricula;
        axios
          .post(srvReq, {
            matriculaUser: matricula,
          })
          .then((result) => {
            //console.log(result.data.Code)
            if (result.data.Code == 1) {
              //console.log(result.data.datos[0].semestre)
              //console.log(result.data.result[0].nombre_Completo)
              document.getElementById("nom").value =
                result.data.result[0].nombre_Completo;
              document.getElementById("cor").value =
                result.data.result[0].correo_e;
              document.getElementById("car").value =
                result.data.datos[0].carrera;
              document.getElementById("semest").value =
                result.data.datos[0].semestre;
              showToast(
                "success",
                "Datos encontrados",
                "Se encontraron los datos de " + registroUsuario.matricula
              );

              setRegistroUsuario({
                matricula: registroUsuario.matricula,
                nombreCompleto: result.data.result[0].nombre_Completo,
                correoElectronico: result.data.result[0].correo_e,
                carrera: result.data.datos[0].carrera,
                semestre: result.data.datos[0].semestre,
              });

              setValidRegistro({
                matricula: true,
                nombreCompleto: true,
                correoElectronico: true,
                carrera: true,
                semestre: true,
              });
            }
            if (result.data.Code == -1) {
              showToast(
                "error",
                "Finalizado",
                "El usuario con matricula " +
                  registroUsuario.matricula +
                  " no esta registrado o no es un estudiante."
              );
              document.getElementById("nom").value = "";
              document.getElementById("cor").value = "";
              document.getElementById("car").value = "";
              document.getElementById("semest").value = "";
              clearAll();
            }
          })
          .catch((error) => {
            console.log(error);
            showToast(
              "error",
              "Finalizado",
              "El usuario con matricula " +
                registroUsuario.matricula +
                " no esta registrado o no es un estudiante."
            );
          });
      } catch (exception) {
        showToast(
          "error",
          "Inicios de sesión",
          "Ha ocurrido un error inesperado." + exception
        );
      }
    } else {
      showToast(
        "error",
        "Matricula Invalida",
        "Favor de revisar que el campo sea correcto."
      );
    }
  };

  const editAlumno = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/EditEstudiante";
    if (validRegistro.carrera === true && validRegistro.semestre === true) {
      try {
        let matricula = ultimaMatricula;
        let nombre_Completo = registroUsuario.nombreCompleto;
        let correo_e = registroUsuario.correoElectronico;
        let carrera = registroUsuario.carrera;
        let semestre = registroUsuario.semestre;
        let newMatricula = registroUsuario.matricula;

        //console.log({ matricula, newMatricula });

        axios
          .post(srvReq, {
            matriculaUser: matricula,
            nuevaMatricula: newMatricula,
            nombreUser: nombre_Completo,
            correoUser: correo_e,
            carreraUser: carrera,
            semestreUser: semestre,
          })
          .then((result) => {
            //(result.data.Code);
            if (result.data.Code === 1) {
              showToast(
                "success",
                "Finalizado",
                "Estudiante " +
                  registroUsuario.matricula +
                  " a sido modificado."
              );
            } else {
              showToast(
                "error",
                "No dado de alta",
                "Estudiante " + registroUsuario.matricula + " no existe."
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
        setUltimaMatricula(registroUsuario.matricula);
      } catch (exception) {
        showToast(
          "error",
          "Inicios de sesión",
          "Ha ocurrido un error inesperado." + exception
        );
      }
    } else {
      //console.log(validRegistro)
      showToast(
        "error",
        "Campos Invalidos",
        "Favor de revisar que los campos sean correctos."
      );
    }
  };

  //Con los campos de texto, da de alta un nuevo encargado
  const editEncargado = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/EditEncargados";
    try {
      let matricula = ultimaMatricula;
      let nombre_Completo = registroUsuario.nombreCompleto;
      let contraseña = registroUsuario.matricula;
      let correo_e = registroUsuario.correoElectronico;
      let newMatricula = registroUsuario.matricula;

      console.log({ matricula, newMatricula });

      axios
        .post(srvReq, {
          matriculaUser: matricula,
          nuevaMatricula: newMatricula,
          nombreUser: nombre_Completo,
          contraseñaUser: contraseña,
          correoUser: correo_e,
        })
        .then((result) => {
          //console.log(result.data.Code);
          if (result.data.Code === 1) {
            showToast(
              "success",
              "Finalizado",
              "Encargado " + registroUsuario.matricula + " a sido modificado."
            );
          } else {
            showToast(
              "error",
              "No dado de alta",
              "Encargado " + registroUsuario.matricula + " no existe."
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setUltimaMatricula(registroUsuario.matricula);
    } catch (exception) {
      showToast(
        "error",
        "Inicios de sesión",
        "Ha ocurrido un error inesperado." + exception
      );
    }
  };

  const restartContraseña = () => {
    if (validRegistro.matricula) {
      const srvDir = new ServerConnectionConfig();
      const srvReq = srvDir.getServer() + "/RestorePassword";
      try {
        let matricula = registroUsuario.matricula;
        //let correo_e = registroUsuario.correoElectronico;
        axios
          .post(srvReq, {
            matriculaUser: matricula,
            //correoUser: correo_e,
          })
          .then((result) => {
            //console.log(result.data.Code);
            if (result.data.Code === 1) {
              showToast(
                "success",
                "Restablecido",
                "Usuario " +
                  registroUsuario.matricula +
                  " se le a restablecido su contraseña."
              );
            } else {
              showToast(
                "error",
                "No restablecido",
                "Usuario " +
                  registroUsuario.matricula +
                  " no pudo ser modificado o no existe."
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (exception) {
        showToast(
          "error",
          "Inicios de sesión",
          "Ha ocurrido un error inesperado." + exception
        );
      }
    } else {
      showToast(
        "error",
        "Error de matricula",
        "Favor de ingresar una matricula"
      );
    }
  };

  const searchUser = () => {
    if (esEncargado) {
      if (registroUsuario.matricula.length == 3) {
        searchEncargada();
      } else {
        showToast(
          "error",
          "Finalizado",
          "El usuario con matricula " +
            registroUsuario.matricula +
            " no es un estudiante."
        );
        clearAll();
      }
    } else {
      searchAlumno();
    }
    setUltimaMatricula(registroUsuario.matricula);
  };

  const clearAll = () => {
    document.getElementById("nom").value = "";
    document.getElementById("cor").value = "";
    document.getElementById("car").value = "";
    document.getElementById("semest").value = "";
  };

  const updateUser = () => {
    console.log(validRegistro);
    if (
      validRegistro.matricula === true &&
      validRegistro.nombreCompleto === true &&
      validRegistro.correoElectronico === true
    ) {
      if (esEncargado) {
        editEncargado();
      } else {
        editAlumno();
      }
    } else {
      showToast(
        "error",
        "Campos Invalidos",
        "Favor de revisar que los campos sean correctos."
      );
    }
  };

  */

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
            onChange={() => SubmenuAdministracionUsuariosHandleInputChange()}
          ></input>
          {!SubmenuAdministracionUsuariosUsuarioManualValido.matricula &&
            SubmenuAdministracionUsuariosRegistroUsuarioManual &&
            SubmenuAdministracionUsuariosRegistroUsuarioManual.matricula.length > 0 && (
              <label className="LoginWarning" style={{ textAlign: "left" }}>
                Debe contener 8 digitos, puede tener una m o M al principio si
                se trata de un estudiante de posgrado.
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
            onChange={() => SubmenuAdministracionUsuariosHandleInputChange()}
          ></input>
        </p>
        <p>
          <label>Correo Electronico:</label>
          <label className="Obligatorio">*ㅤ</label>
          <input
            type="text"
            name="correoElectronico"
            id="cor"
            onChange={() => SubmenuAdministracionUsuariosHandleInputChange()}
          ></input>
          {!SubmenuAdministracionUsuariosUsuarioManualValido.correoElectronico &&
            SubmenuAdministracionUsuariosRegistroUsuarioManual.correoElectronico.length > 0 && (
              <label className="LoginWarning" style={{ textAlign: "left" }}>
                El correo electronico no es valido.
              </label>
            )}
        </p>
        {!SubmenuAdministracionUsuariosUsuarioEstudiante && (
          <p>
            <label>Carrera:</label>
            <label className="Obligatorio">*ㅤ</label>
            <input
              type="text"
              name="carrera"
              id="car"
              onChange={() => SubmenuAdministracionUsuariosHandleInputChange()}
            ></input>
          </p>
        )}
        {!SubmenuAdministracionUsuariosUsuarioEstudiante && (
          <p>
            <label>Semestre:</label>
            <label className="Obligatorio">*ㅤ</label>
            <input
              type="number"
              name="semestre"
              id="semest"
              onChange={() => SubmenuAdministracionUsuariosHandleInputChange()}
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
