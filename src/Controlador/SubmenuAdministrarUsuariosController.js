import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import SubmenuAdministrarUsuarios from "../Vista/SubmenuAdministrarUsuarios";
import ConfigurarConexion from "./ConfigurarConexion";
import axios from "axios";

const SubmenuAdministrarUsuariosControlador = () => {
  //Variables de estado.
  const [registrosUsuariosExcel, setRegistrosUsuariosExcel] = useState([]);
  const [registroUsuarioManual, setRegistroUsuarioManual] = useState({
    matricula: "",
    nombreCompleto: "",
    correoElectronico: "",
    carrera: "",
    semestre: "",
  });
  const [usuarioManualValido, setUsuarioManualValido] = useState({
    matricula: false,
    nombreCompleto: false,
    correoElectronico: false,
    carrera: false,
    semestre: false,
  });
  const [consultarMatricula, setConsultarMatricula] = useState({
    consultarMatricula: "",
    esValida: false,
  });
  const [usuarioBuscado, setUsuarioBuscado] = useState(false);
  const [usuarioEstudiante, setUsuarioEstudiante] = useState(true);

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

  //Captura los cambios en los campos de texto para la modificación individual de usuarios.
  const handleInputChange = (event) => {
    if (event.target.name === "nuevaMatricula") {
      var regexEstudiante = new RegExp("^(B|b|C|c|D|d|M|m)?[0-9]{8}$");
      var regexEncargada = new RegExp("^[0-9]{3}$");

      var actualizadoConsultarMatricula = {
        ...consultarMatricula,
        consultarMatricula: event.target.value,
        esValida:
          regexEstudiante.test(event.target.value) ||
          regexEncargada.test(event.target.value),
      };
      setConsultarMatricula(actualizadoConsultarMatricula);
    } else {
      if (event.target.name === "matricula") {
        setUsuarioBuscado(false);
      }
      const actualizadoRegistroUsuarioManual = {
        ...registroUsuarioManual,
        [event.target.name]: event.target.value,
      };
      setRegistroUsuarioManual(actualizadoRegistroUsuarioManual);
      validateInputChange(event, actualizadoRegistroUsuarioManual);
    }
  };

  //Valida los cambios detectados.
  const validateInputChange = (event, ActualizadoState) => {
    var regexEstudiante = new RegExp("^(B|b|C|c|D|d|M|m)?[0-9]{8}$");
    var regexEncargada = new RegExp("^[0-9]{3}$");
    var regexCorreoElectronico = new RegExp(
      "^([A-Za-z0-9]{2,64})(.[A-Za-z0-9]{2,64})*@([A-Za-z0-9]{2,64})(.[A-Za-z0-9]{2,64})+$"
    );
    var regexNombreCompleto = new RegExp("[A-Z a-z]{10,100}$");
    var regexCarrera = new RegExp("[A-Z a-z]{10,100}$");

    var actualizadoUsuarioManualValido;

    switch (event.target.name) {
      case "matricula":
        actualizadoUsuarioManualValido = {
          ...usuarioManualValido,
          [event.target.name]:
            regexEstudiante.test(ActualizadoState[event.target.name]) ||
            regexEncargada.test(ActualizadoState[event.target.name]),
        };
        setUsuarioManualValido(actualizadoUsuarioManualValido);
        break;
      case "correoElectronico":
        actualizadoUsuarioManualValido = {
          ...usuarioManualValido,
          [event.target.name]: regexCorreoElectronico.test(
            ActualizadoState[event.target.name]
          ),
        };
        setUsuarioManualValido(actualizadoUsuarioManualValido);
        break;
      case "nombreCompleto":
        actualizadoUsuarioManualValido = {
          ...usuarioManualValido,
          [event.target.name]: regexNombreCompleto.test(
            ActualizadoState[event.target.name]
          ),
        };
        setUsuarioManualValido(actualizadoUsuarioManualValido);
        break;
      case "carrera":
        actualizadoUsuarioManualValido = {
          ...usuarioManualValido,
          [event.target.name]: regexCarrera.test(
            ActualizadoState[event.target.name]
          ),
        };
        setUsuarioManualValido(actualizadoUsuarioManualValido);
        break;
      default:
        actualizadoUsuarioManualValido = {
          ...usuarioManualValido,
          [event.target.name]:
            ActualizadoState[event.target.name] > 0 &&
            ActualizadoState[event.target.name] < 15,
        };
        setUsuarioManualValido(actualizadoUsuarioManualValido);
        break;
    }
  };

  //Maneja el archivo subido y limpia registros que no cuenten con una matricula valida.
  const handleFileEvent = async (event) => {
    const archivoExcel = event.target.files[0];
    showToast(
      "info",
      "Registros de Usuarios",
      "Cargando archivo, espere un momento."
    );
    setTimeout(async () => {
      const informacionExcel = await archivoExcel.arrayBuffer();
      const libroExcel = XLSX.read(informacionExcel);
      const hojaExcel = libroExcel.Sheets[libroExcel.SheetNames[0]];
      const jsonExcel = XLSX.utils.sheet_to_json(hojaExcel, {
        header: 1,
        defval: "",
      });

      var regexMatricula = new RegExp("^(B|b|C|c|D|d|M|m)?[0-9]{8}$");

      const jsonExcelLimpio = jsonExcel.filter((columna, indiceExcel) => {
        const valorCelda = columna[0];
        if (!regexMatricula.test(valorCelda)) {
          showToast(
            "error",
            "Registro invalido.",
            "EL registro de " +
              valorCelda +
              " en la columna " +
              indiceExcel +
              " no será incluido debido a que no tiene el formato de matricula valido."
          );
        }
        return indiceExcel === 0 ? false : regexMatricula.test(valorCelda);
      });

      event.target.value = "";
      validateExcelRows(jsonExcelLimpio, jsonExcelLimpio.length);
    }, 100);
  };

  //Validar las filas del archivo excel en busca de registros de usuario validos.
  const validateExcelRows = (jsonExcel, originalCount) => {
    var regexNombres = new RegExp(
      "^(?!$)[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]{3,}( [A-Za-zÁÉÍÓÚáéíóúÜüÑñ]+)?$"
    );
    var regexApellidos = new RegExp(
      "^(?!$)[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]{2,}( [A-Za-zÁÉÍÓÚáéíóúÜüÑñ]+)?$"
    );
    var regexCorreoElectronico = new RegExp(
      "^(?!$)[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\\.[A-Za-z]{2,}(.[A-Za-z]{2,})?$"
    );
    var registrosUsuariosExcelTemp = [];
    var registroUsuariosExcelValido;

    showToast(
      "info",
      "Registros de Usuarios",
      "Se esta procesando el archivo, por favor espere un momento."
    );

    setTimeout(() => {
      for (var indice = 0; indice < jsonExcel.length; indice++) {
        registroUsuariosExcelValido =
          regexApellidos.test(jsonExcel[indice][1]) &&
          regexApellidos.test(jsonExcel[indice][2]) &&
          regexNombres.test(jsonExcel[indice][3]) &&
          (jsonExcel[indice][4] === ""
            ? true
            : regexCorreoElectronico.test(jsonExcel[indice][4])) &&
          jsonExcel[indice][5] !== "" &&
          jsonExcel[indice][6] > 0 &&
          jsonExcel[indice][6] < 15;

        if (registroUsuariosExcelValido) {
          registrosUsuariosExcelTemp.push(jsonExcel[indice]);
        }
      }

      setRegistrosUsuariosExcel(registrosUsuariosExcelTemp);
      setTimeout(() => {
        showToast(
          "info",
          "Registros de Usuarios",
          "De los " +
            originalCount +
            " registros en el archivo, se implementaran " +
            registrosUsuariosExcelTemp.length +
            " inicios de sesión."
        );
      }, 100);
    }, 100);
  };

  const subirNuevosUsuarios = async (registrosExcel) => {
    console.log(registrosExcel);
    const servidor = new ConfigurarConexion();
    const funcion_A = servidor.obtenerServidor() + "/usuarios/preparar";
    const funcion_B = servidor.obtenerServidor() + "/usuarios/nuevo";
    const funcion_C = servidor.obtenerServidor() + "/usuarios/eliminar";

    const prepararUsuarios = await axios.get(funcion_A);
    if (prepararUsuarios.status === 200) {
      for (var indice = 0; indice < registrosExcel.length; indice++) {
        const subirUsuario = await axios.post(funcion_B, {
          matricula: registrosExcel[indice][0],
          nombre_Completo:
            registrosExcel[indice][1] +
            " " +
            registrosExcel[indice][2] +
            " " +
            registrosExcel[indice][3],
          contraseña:
            registrosExcel[indice][0].length > 8
              ? registrosExcel[indice][0].substring(1)
              : registrosExcel[indice][0],
          correo_e:
            registrosExcel[indice][4] === ""
              ? "l" + registrosExcel[indice][0] + "@hermosillo.tecnm.mx"
              : registrosExcel[indice][4],
          Estudiante: {
            carrera: registrosExcel[indice][5],
            semestre: registrosExcel[indice][6],
          },
        });
        if (subirUsuario.status === 200) {
          showToast(
            "success",
            "Subida de usuarios.",
            "Usuario " +
              registrosExcel[indice][0] +
              " subido o actualizado con exito."
          );
        } else {
          showToast(
            "error",
            "Subida de usuarios.",
            "Usuario " +
              registrosExcel[indice][0] +
              " no ha sido subido o actualizado, intente mas tarde."
          );
        }
      }

      await axios.get(funcion_C);
    } else {
      showToast(
        "error",
        "Subida de usuarios.",
        "Fallo general, contacte al administrador."
      );
    }
  };

  const subirNuevoUsuario = async () => {
    if (
      usuarioManualValido.matricula &&
      registroUsuarioManual.matricula !== "" &&
      usuarioManualValido.nombreCompleto &&
      registroUsuarioManual.nombreCompleto !== "" &&
      usuarioManualValido.correoElectronico &&
      usuarioEstudiante
        ? usuarioManualValido.carrera &&
          registroUsuarioManual.carrera !== "" &&
          usuarioManualValido.semestre &&
          registroUsuarioManual.semestre !== ""
        : true
    ) {
      try {
        const servidor = new ConfigurarConexion();
        const funcion = servidor.obtenerServidor() + "/usuarios/alta";

        const usuarioSubirEstudiante = usuarioEstudiante
          ? {
              carrera: registroUsuarioManual.carrera,
              semestre: registroUsuarioManual.semestre,
            }
          : null;

        const usuarioSubido = await axios.post(funcion, {
          matricula: registroUsuarioManual.matricula,
          nombre_Completo: registroUsuarioManual.nombreCompleto,
          correo_e: registroUsuarioManual.correoElectronico,
          Estudiante: usuarioSubirEstudiante,
        });

        if (usuarioSubido.status === 200) {
          showToast(
            "success",
            "Subida de usuarios.",
            "Usuario " + registroUsuarioManual.matricula + " subido con exito."
          );
        } else {
          showToast(
            "success",
            "Subida de usuarios.",
            "Usuario " +
              registroUsuarioManual.matricula +
              " no ha sido subido correctamente, intente mas tarde."
          );
        }
      } catch (error) {
        switch (error.response.status) {
          case 400:
            showToast(
              "error",
              "Formato de datos.",
              "Algunos de los datos ingresados no son validos, favor de verificar antes de proceder."
            );
            break;
          case 404:
            showToast(
              "error",
              "Usuario no dado de alta.",
              "El usuario no pudo darse de alta."
            );
            break;
          case 409:
            showToast(
              "error",
              "Usuario existente.",
              "El usuario ya existe, no se dará de alta."
            );
            break;
          default:
            showToast(
              "error",
              "Error de servidor.",
              "Error de servidor, contacte al administrador."
            );
            break;
        }
      }
    } else {
      showToast(
        "error",
        "Formato de datos.",
        "Algunos de los datos ingresados no son validos, favor de verificar antes de proceder."
      );
    }
  };

  const buscarUsuario = async () => {
    if (
      usuarioManualValido.matricula &&
      registroUsuarioManual.matricula !== ""
    ) {
      try {
        const servidor = new ConfigurarConexion();
        const funcion = servidor.obtenerServidor() + "/usuarios/consultar";

        const usuarioBuscado = await axios.get(funcion, {
          params: { matricula: registroUsuarioManual.matricula },
        });

        if (usuarioBuscado.status === 200) {
          var usuarioEncontrado = {
            matricula: usuarioBuscado.data.Informacion.matricula,
            nombreCompleto: usuarioBuscado.data.Informacion.nombre_Completo,
            correoElectronico: usuarioBuscado.data.Informacion.correo_e,
            carrera: usuarioBuscado.data.Informacion.Estudiante
              ? usuarioBuscado.data.Informacion.Estudiante.carrera
              : "",
            semestre: usuarioBuscado.data.Informacion.Estudiante
              ? usuarioBuscado.data.Informacion.Estudiante.semestre
              : "",
          };
          var usuarioEncontradoValido = {
            matricula: true,
            nombreCompleto: true,
            correoElectronico: true,
            carrera: true,
            semestre: true,
          };

          setRegistroUsuarioManual(usuarioEncontrado);
          setUsuarioManualValido(usuarioEncontradoValido);
          setUsuarioBuscado(true);

          document.getElementById("nom").value =
            usuarioEncontrado.nombreCompleto;
          document.getElementById("cor").value =
            usuarioEncontrado.correoElectronico;

          if (usuarioBuscado.data.Informacion.Estudiante) {
            document.getElementById("car").value = usuarioEncontrado.carrera;
            document.getElementById("semest").value =
              usuarioEncontrado.semestre;
          }

          showToast(
            "success",
            "Usuario encontrado.",
            "El usuario fue encontrado."
          );
        } else {
          showToast(
            "error",
            "Usuario no encontrado.",
            "El usuario no existe o la matricula no coincide."
          );
        }
      } catch (error) {
        switch (error.response.status) {
          case 404:
            showToast(
              "error",
              "Usuario no encontrado.",
              "El usuario no existe o la matricula no coincide."
            );
            break;
          case 400:
            showToast(
              "error",
              "Formato de matricula.",
              "La matricula ingresada no tiene un formato valido."
            );
            break;
          default:
            showToast(
              "error",
              "Error de servidor.",
              "Error de servidor, contacte al administrador."
            );
            break;
        }
      }
    } else {
      showToast(
        "error",
        "Formato de matricula.",
        "La matricula ingresada no tiene un formato valido."
      );
    }
  };

  const actualizarUsuario = async () => {
    if (
      usuarioManualValido.matricula &&
      registroUsuarioManual.matricula !== "" &&
      usuarioManualValido.nombreCompleto &&
      registroUsuarioManual.nombreCompleto !== "" &&
      usuarioManualValido.correoElectronico &&
      registroUsuarioManual.correoElectronico !== "" &&
      consultarMatricula.consultarMatricula !== ""
        ? consultarMatricula.esValida
        : true && usuarioEstudiante
        ? usuarioManualValido.carrera &&
          registroUsuarioManual.carrera !== "" &&
          usuarioManualValido.semestre &&
          registroUsuarioManual.semestre !== ""
        : true
    ) {
      try {
        const servidor = new ConfigurarConexion();
        const funcion = servidor.obtenerServidor() + "/usuarios/actualizar";

        var datosEstudiante = usuarioEstudiante
          ? {
              carrera: registroUsuarioManual.carrera,
              semestre: registroUsuarioManual.semestre,
            }
          : null;

        const usuarioActualizado = await axios.put(funcion, {
          matricula: registroUsuarioManual.matricula,
          nombre_Completo: registroUsuarioManual.nombreCompleto,
          correo_e: registroUsuarioManual.correoElectronico,
          nuevaMatricula:
            consultarMatricula.consultarMatricula !== ""
              ? consultarMatricula.esValida
                ? consultarMatricula.consultarMatricula
                : registroUsuarioManual.matricula
              : registroUsuarioManual.matricula,
          Estudiante: datosEstudiante,
        });

        if (usuarioActualizado.status === 200) {
          showToast(
            "success",
            "Actualizacion de usuario.",
            "Actualizacion de datos de usuario exitosa."
          );
        } else {
          showToast(
            "error",
            "Actualizacion de usuario.",
            "No fue posible actualizar el usuario, intente mas tarde."
          );
        }
      } catch (error) {
        switch (error.response.status) {
          case 400:
            showToast(
              "error",
              "Formato de datos.",
              "Algunos de los datos ingresados no son validos, favor de verificar antes de proceder."
            );
            break;
          case 404:
            showToast(
              "error",
              "Usuario no encontrado.",
              "El usuario que se intenta modificar no existe en la base de datos."
            );
            break;
          default:
            showToast(
              "error",
              "Error de servidor.",
              "Error de servidor, contacte al administrador."
            );
            break;
        }
      }
    } else {
      showToast(
        "error",
        "Formato de datos.",
        "Algunos de los datos ingresados no son validos, favor de verificar antes de proceder."
      );
    }
  };

  const actualizarContraseñaUsuario = async () => {
    if (usuarioManualValido.matricula) {
      const servidor = new ConfigurarConexion();
      const funcion = servidor.obtenerServidor() + "/usuarios/acceso";
      const usuarioActualizarContraseña = await axios.put(funcion, {
        matricula: registroUsuarioManual.matricula,
      });
      if (usuarioActualizarContraseña.status === 200) {
        showToast(
          "success",
          "Contraseña actualizada.",
          "Se ha reiniciado la contraseña exitosamente."
        );
      } else {
        showToast(
          "error",
          "Contraseña no actualizada.",
          "La contraseña no se ha actualizado apropiadamente, intentelo mas tarde."
        );
      }
    } else {
      showToast(
        "error",
        "Formato de matricula.",
        "La matricula ingresada no tiene un formato valido."
      );
    }
  };

  return (
    <SubmenuAdministrarUsuarios
      SubmenuAdministrarUsuariosTostado={toast}
      SubmenuAdministrarUsuariosHandleFileEvent={handleFileEvent}
      SubmenuAdministrarUsuariosRegistrosUsuariosExcel={registrosUsuariosExcel}
      SubmenuAdministrarUsuariosSubirNuevosUsuarios={subirNuevosUsuarios}
      SubmenuAdministrarUsuariosSetUsuarioEstudiante={setUsuarioEstudiante}
      SubmenuAdministrarUsuariosUsuarioEstudiante={usuarioEstudiante}
      SubmenuAdministrarUsuariosHandleInputChange={handleInputChange}
      SubmenuAdministrarUsuariosBuscarUsuario={buscarUsuario}
      SubmenuAdministrarUsuariosActualizarContraseñaUsuario={
        actualizarContraseñaUsuario
      }
      SubmenuAdministrarUsuariosActualizarUsuario={actualizarUsuario}
      SubmenuAdministrarUsuariosSubirNuevoUsuario={subirNuevoUsuario}
      SubmenuAdministrarUsuariosUsuarioManualValido={usuarioManualValido}
      SubmenuAdministrarUsuariosRegistroUsuarioManual={registroUsuarioManual}
      SubmenuAdministrarUsuariosConsultarMatricula={consultarMatricula}
      SubmenuAdministrarUsuariosUsuarioBuscado={usuarioBuscado}
    />
  );
};

export default SubmenuAdministrarUsuariosControlador;
