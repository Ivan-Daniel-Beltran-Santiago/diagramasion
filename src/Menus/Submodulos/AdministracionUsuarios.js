import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";
import { Toast } from "primereact/toast";
import { clear } from "@testing-library/user-event/dist/clear";

function AdministracionUsuarios() {
  //Los registros de todos los estudiantes obtenidos del excel
  const [registroUsuarios, setRegistroUsuarios] = useState([{}]);
  //Permitir el procesamiento del excel
  const [permitirExcel, setPermitirExcel] = useState(false);
  //Almancenar ultima matricula
  const [ultimaMatricula, setUltimaMatricula] = useState("");
  //Determinar si se trata de un Encargado o un estudiante
  const [esEncargado, setEsEncargado] = useState(false);
  //Registro de un solo estudiante
  const [registroUsuario, setRegistroUsuario] = useState({
    matricula: "",
    nombreCompleto: "",
    correoElectronico: "",
    carrera: "",
    semestre: "",
    newMatricula: ""
  });
  //Validar a un solo estudiante
  const [validRegistro, setValidRegistro] = useState({
    matricula: false,
    nombreCompleto: false,
    correoElectronico: false,
    carrera: false,
    semestre: false,
  });


  //Alertas
  const toast = useRef(null);
  const showToast = (severityValue, summaryValue, detailValue) => {
    toast.current.show({
      closable: false,
      life: 7000,
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  };

  //Registra a todos los usuarios y los prepara para ser dados de alta en la base de datos, tomando el cuenta solo los valores unicos
  const handleNewUsers = (array) => {
    const nuevoRegistroUsuarios = [...registroUsuarios];
    showToast(
      "info",
      "Registros de Usuarios",
      "Se esta procesando el archivo, por favor espere un momento."
    );
    try {
      // eslint-disable-next-line array-callback-return
      array.some((file) => {
        if (nuevoRegistroUsuarios.findIndex((f) => (f[0] === file[0]) === -1)) {
          nuevoRegistroUsuarios.push(file);
        }
      });
      setRegistroUsuarios(nuevoRegistroUsuarios);
    } catch (exception) {
      showToast(
        "error",
        "Registros de Usuarios",
        "Ha ocurrido un error inesperado." + exception
      );
    } finally {
      showToast(
        "success",
        "Registros de Usuarios",
        "Archivo procesado con exito."
      );
      setPermitirExcel(true);
    }
  };

  //Lee el archivo y mantiene los registros en memoria
  const handleFileChange = async (event) => {
    event.preventDefault();

    setRegistroUsuarios([{}]);

    const file = event.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });

    handleNewUsers(jsonData);
  };

  //Toma todos los nuevos registros y los sube a la base de datos de uno en uno
  const uploadNewUsers = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/SubirUsuarios";

    showToast(
      "info",
      "Inicios de sesión",
      "Se estan procesando los registros, por favor espere un momento."
    );
    try {
      for (var indice = 0; indice < registroUsuarios.length; indice++) {
        let matricula = registroUsuarios[indice][0];
        let nombre_Completo =
          registroUsuarios[indice][1] + //Apellido Paterno
          registroUsuarios[indice][2] + //Apellido Materno
          registroUsuarios[indice][3]; //Nombres
        let contraseña = matricula;
        let correo_e = registroUsuarios[indice][4];
        if (correo_e.equals(""))
          correo_e =
            (matricula.tolowercase().startsWith("m")
              ? matricula
              : "l" + matricula) + "@hermosillo.tecnm.mx";
        let carrera = registroUsuarios[indice][5];
        let semestre = registroUsuarios[indice][6];
        if (matricula === "Matricula") {
          continue;
        }
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
            console.log(result.data.Code);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (exception) {
      showToast(
        "error",
        "Inicios de sesión",
        "Ha ocurrido un error inesperado." + exception
      );
    } finally {
      showToast(
        "success",
        "Inicios de sesión",
        "Todos los inicios de sesión han sido cargados con exito."
      );
      setPermitirExcel(false);
      document.getElementById("subirArchivos").value = "";
    }
  };

  //Capta los cambios a los campos de entrada para modificación o alta.
  const handleInputChange = (event) => {
    setRegistroUsuario({
      ...registroUsuario,
      [event.target.name]: event.target.value,
    });
    validateInputChange(event);
  };

  const handleCheckChange = (event) => {
    setEsEncargado(event.target.checked);
    //console.log(esEncargado)
  };

  //Se encarga de validar los campos pertinentes.
  const validateInputChange = (event) => {
    switch (event.target.name) {
      case "matricula":
        let ValidadorStudent = new RegExp("^(B|b|C|c|D|d|M|m)?[0-9]{8}$");
        let ValidadorAdmin = new RegExp("^[0-9]{3}$");
        setValidRegistro({
          ...validRegistro,
          [event.target.name]:
            ValidadorStudent.test(event.target.value) ||
            ValidadorAdmin.test(event.target.value),
        });
        break;
      case "correoElectronico":
        let ValidadorCorreoElectronico = new RegExp(
          /^([A-Za-z0-9]{2,64})(\.[A-Za-z0-9]{2,64})*@([A-Za-z0-9]{2,64})(\.[A-Za-z0-9]{2,64})+$/
        );
        setValidRegistro({
          ...validRegistro,
          [event.target.name]: ValidadorCorreoElectronico.test(
            event.target.value
          ),
        });
        break;
      case "nombreCompleto":
      case "carrera":
        setValidRegistro({
          ...validRegistro,
          [event.target.name]: true,
        });
        break;
      default:
        setValidRegistro({
          ...validRegistro,
          [event.target.name]:
            event.target.value >= 1 && event.target.value <= 14,
        });
        break;
    }
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
                correoElectronico: result.data.result[0].correo_e
              })

              setValidRegistro({
                matricula: true,
                nombreCompleto: true,
                correoElectronico: true
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
              })

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
  }

  const editAlumno = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/EditEstudiante";
    if (validRegistro.carrera === true && validRegistro.semestre === true) {
      try {
        let matricula = ultimaMatricula;
        let nombre_Completo = registroUsuario.nombreCompleto
        let correo_e = registroUsuario.correoElectronico;
        let carrera = registroUsuario.carrera;
        let semestre = registroUsuario.semestre;
        let newMatricula = registroUsuario.matricula;

        console.log({ matricula, newMatricula });

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
                "Estudiante " + registroUsuario.matricula + " a sido modificado."
              );
            }
            else {
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
    }
    else {
      //console.log(validRegistro)
      showToast(
        "error",
        "Campos Invalidos",
        "Favor de revisar que los campos sean correctos."
      )
    }
  }

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
          }
          else {
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
                "Usuario " + registroUsuario.matricula + " se le a restablecido su contraseña."
              );
            }
            else {
              showToast(
                "error",
                "No restablecido",
                "Usuario " + registroUsuario.matricula + " no pudo ser modificado o no existe."
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
    }
    else {
      showToast(
        "error",
        "Error de matricula",
        "Favor de ingresar una matricula"
      )
    }
  };

  const searchUser = () => {
    if (esEncargado) {
      if (registroUsuario.matricula.length == 3) {
        searchEncargada();
      }
      else {
        showToast(
          "error",
          "Finalizado",
          "El usuario con matricula " +
          registroUsuario.matricula +
          " no es un estudiante."
        );
        clearAll();
      }
    }
    else {
      searchAlumno();
    }
    setUltimaMatricula(registroUsuario.matricula);
  }

  const clearAll = () => {
    document.getElementById("nom").value = "";
    document.getElementById("cor").value = "";
    document.getElementById("car").value = "";
    document.getElementById("semest").value = "";
  }

  const updateUser = () => {
    //console.log(validRegistro)
    if (validRegistro.matricula === true && validRegistro.nombreCompleto === true && validRegistro.correoElectronico === true) {
      if (esEncargado) {
        editEncargado();
      }
      else {
        editAlumno();
      }
    }
    else {
      showToast(
        "error",
        "Campos Invalidos",
        "Favor de revisar que los campos sean correctos."
      )
    }
  }

  return (
    <div className="AdministracionUsuarios modules">
      <Toast ref={toast} position="top-right" />
      <div className="InsertarExcel modules">
        <label>Subir inicios de sesión (Excel)</label>
        <p
          title="Subir inicios de sesión (Excel)"
          style={{ textAlign: "justify" }}
        >
          Este apartado se encarga de subir los inicios de sesión para los
          estudiantes activos de la institución, por medio de un archivo
          previamente solicitado al departamento encargado de las altas y bajas
          estudiantiles.
        </p>
        <br />
        <label>Estructura y contenidos del archivo Excel</label>u
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
              La matricula debe constar de 5 digitos para los encargados, y 8
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
          <input
            type="file"
            id="subirArchivos"
            name="Subir archivo Excel"
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleFileChange}
          ></input>
          <p>
            {permitirExcel && (
              <input
                type="button"
                className="loadLogin"
                value="Cargar Inicios de Sesión"
                onClick={uploadNewUsers}
              ></input>
            )}
          </p>
        </form>
      </div>
      <div className="Insertar modules">
        <label>Subir/modificar inicio de sesión</label>
        <p title="Subir inicio de sesión" style={{ textAlign: "justify" }}>
          Este apartado se encarga de subir o modificar un inicio de sesión a la
          vez, de manera manual.
        </p>
        <br />
        <label>Formato de datos del estudiante</label>
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
            En casos especiales, se pueden utilizar las letras B, C, D, y M, ya sea mayuscula o minuscula.
          </li>
          <li>
            El correo electronico debe ser uno valido y capaz de operar con
            naturalidad, se puede dejar vacio para utilizar el correo
            institucional.
          </li>
          <li>El semestre debe ser un número entero entre 1 y 14.</li>
        </ul>
        <label>Encargada</label>
        <input
          type="checkbox"
          id="checkEncargada"
          onChange={handleCheckChange}
        ></input>
        <p>
          <label>Matricula:ㅤ</label>
          <input
            type="text"
            name="matricula"
            id="mat"
            onChange={handleInputChange}
          ></input>
          {!validRegistro.matricula && registroUsuario.matricula.length > 0 && (
            <label className="LoginWarning" style={{ textAlign: "left" }}>
              Debe contener 8 digitos, puede tener una m o M al principio si se
              trata de un estudiante de posgrado.
            </label>
          )}
        </p>
        <p>
          <label>Nombre completo:ㅤ</label>
          <input
            type="text"
            name="nombreCompleto"
            id="nom"
            onChange={handleInputChange}
          ></input>
        </p>
        <p>
          <label>Correo Electronico:ㅤ</label>
          <input
            type="text"
            name="correoElectronico"
            id="cor"
            onChange={handleInputChange}
          ></input>
          {!validRegistro.correoElectronico && registroUsuario.correoElectronico.length > 0 && (
            <label className="LoginWarning" style={{ textAlign: "left" }}>
              El correo electronico no es valido.
            </label>
          )}
        </p>
        {!esEncargado && (
          <p>
            <label>Carrera:ㅤ</label>
            <input
              type="text"
              name="carrera"
              id="car"
              onChange={handleInputChange}
            ></input>
          </p>
        )}
        {!esEncargado && (
          <p>
            <label>Semestre:ㅤ</label>
            <input
              type="number"
              name="semestre"
              id="semest"
              onChange={handleInputChange}
            ></input>
          </p>
        )}
        <div>
          <button
            onClick={searchUser}
          >Buscar por matricula</button>
          <button
            onClick={updateUser}
          >Modificar</button>
          <button
            onClick={uploadOneUser}
          >Dar de alta</button>
          <button
            onClick={restartContraseña}
          >Restablecer Contraseña</button>
        </div>
      </div>
    </div>
  );
}

export default AdministracionUsuarios;
