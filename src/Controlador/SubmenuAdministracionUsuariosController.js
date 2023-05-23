import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import SubmenuAdministracionUsuarios from "../Vista/SubmenuAdministracionUsuarios";
import ConfigurarConexion from "../Controlador/ConfigurarConexion";
import axios from "axios";

const SubmenuAdministracionUsuariosControlador = () => {
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
    matricula: "",
    esValida: false,
  });
  const [usuarioEstudiante, setUsuarioEstudiante] = useState(false);

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
    setRegistroUsuarioManual({
      ...registroUsuarioManual,
      [event.target.name]: event.target.value,
    });
    validateInputChange(event);
  };

  //Valida los cambios detectados.
  const validateInputChange = (event) => {
    var regexEstudiante = new RegExp("^(B|b|C|c|D|d|M|m)?[0-9]{8}$");
    var regexEncargada = new RegExp("^[0-9]{3}$");
    var regexCorreoElectronico = new RegExp(
      "^([A-Za-z0-9]{2,64})(.[A-Za-z0-9]{2,64})*@([A-Za-z0-9]{2,64})(.[A-Za-z0-9]{2,64})+$"
    );
    var regexNombreCompleto = new RegExp("[A-Z a-z]{10,100}$");
    var regexCarrera = new RegExp("[A-Z a-z]{10,100}$");
    switch (event.target.name) {
      case "matricula":
        setUsuarioManualValido({
          ...usuarioManualValido,
          [event.target.name]:
            regexEstudiante.test(event.target.value) ||
            regexEncargada.test(event.target.value),
        });
        break;
      case "busquedaMatricula":
        setConsultarMatricula({
          ...consultarMatricula,
          [event.target.name]:
            regexEstudiante.test(event.target.value) ||
            regexEncargada.test(event.target.value),
        });
        break;
      case "correoElectronico":
        setUsuarioManualValido({
          ...usuarioManualValido,
          [event.target.name]: regexCorreoElectronico.test(event.target.value),
        });
        break;
      case "nombreCompleto":
        setUsuarioManualValido({
          ...usuarioManualValido,
          [event.target.name]: regexNombreCompleto.test(event.target.value),
        });
        break;
      case "carrera":
        setUsuarioManualValido({
          ...usuarioManualValido,
          [event.target.name]: regexCarrera.test(event.target.value),
        });
        break;
      default:
        setUsuarioManualValido({
          ...usuarioManualValido,
          [event.target.name]:
            event.target.value > 0 && event.target.value < 15,
        });
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
      for (var indice = 1; indice < jsonExcel.length; indice++) {
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

  const subirNuevoUsuario = async (registroUsuario) => {
    console.log(registroUsuario);
    const servidor = new ConfigurarConexion();
    const funcion = servidor.obtenerServidor() + "/usuarios/nuevo";
  };

  const buscarUsuario = async () => {};

  const actualizarUsuario = async () => {};

  const actualizarContraseñaUsuario = async () => {};

  return (
    <SubmenuAdministracionUsuarios
      AdminUsuariosTostado={toast}
      AdminUsuariosHandleFileEvent={handleFileEvent}
      AdminUsuariosRegistrosUsuariosExcel={registrosUsuariosExcel}
      SubmenuAdministracionUsuariosSubirNuevosUsuarios={subirNuevosUsuarios}
      SubmenuAdministracionUsuariosSetUsuarioEstudiante={setUsuarioEstudiante}
      SubmenuAdministracionUsuariosUsuarioEstudiante={usuarioEstudiante}
      SubmenuAdministracionUsuariosHandleInputChange={handleInputChange}
      SubmenuAdministracionUsuariosBuscarUsuario={buscarUsuario}
      SubmenuAdministracionUsuariosActualizarContraseñaUsuario={
        actualizarContraseñaUsuario
      }
      SubmenuAdministracionUsuariosActualizarUsuario={actualizarUsuario}
      SubmenuAdministracionUsuariosSubirNuevoUsuario={subirNuevoUsuario}
      SubmenuAdministracionUsuariosUsuarioManualValido={usuarioManualValido}
      SubmenuAdministracionUsuariosRegistroUsuarioManual={registroUsuarioManual}
    />
  );
};

export default SubmenuAdministracionUsuariosControlador;
