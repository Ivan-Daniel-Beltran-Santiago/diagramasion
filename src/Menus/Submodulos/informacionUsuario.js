import { useRef } from "react";
import { Toast } from "primereact/toast";
import axios from "axios";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";

function InformacionUsuario({ currentUser }) {
  const NewPassOne = useRef(null);
  const NewPassTwo = useRef(null);
  const NewEmail = useRef(null);
  const CurrentPass = useRef(null);
  const toast = useRef(null);

  const showToast = (severityValue, summaryValue, detailValue) => {
    toast.current.show({
      closable: false,
      life: 5000,
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  };

  const updateChanges = () => {
    let validChanges = false;
    if (NewPassOne.current.value !== "" || NewEmail.current.value !== "") {
      if (NewPassOne.current.value !== "") {
        if (NewPassTwo.current.value === NewPassOne.current.value) {
          const passwordRGEX = new RegExp("[0-9]{4,8}");
          const newPassValid = passwordRGEX.test(NewPassOne.current.value);
          if (newPassValid) {
            validChanges = true;
          } else {
            showToast(
              "warn",
              "Cambio de contraseña invalido",
              "La nueva contraseña no tiene un formato valido"
            );
            validChanges = false;
          }
        } else {
          showToast(
            "warn",
            "Cambio de contraseña invalido",
            "Ambas contraseñas deben coincidir"
          );
          validChanges = false;
        }
      }
      if (NewEmail.current.value !== "") {
        const emailRGEX = new RegExp(
          "[A-Za-z0-9_.]{4,20}@[A-Za-z0-9_.]{4,10}.[A-Za-z0-9_.]{2,3}"
        );
        const newEmailValid = emailRGEX.test(NewEmail.current.value);
        if (newEmailValid) {
          validChanges = true;
        } else {
          showToast(
            "warn",
            "Cambio de correo invalido",
            "El nuevo correo no tiene un formato valido"
          );
          validChanges = false;
        }
      }
    } else {
      showToast(
        "warn",
        "Operación invalida",
        "No hay valores nuevos para cambiar"
      );
      validChanges = false;
    }
    if (validChanges) {
      if (CurrentPass.current.value !== "") {
        showToast(
          "info",
          "Cambios en proceso",
          "Los cambios se estan procesando"
        );

        const srvDir = new ServerConnectionConfig();
        const srvReq = srvDir.getServer() + "/UpdateUserInfo";

        const userUpdateInfo = {
          matriculaUsuario: currentUser.controlNumber,
          contraseñaUsuario: CurrentPass.current.value,
          correoUsuario: currentUser.eMail,
          nuevaContraseña:
            NewPassOne.current.value !== ""
              ? NewPassOne.current.value
              : CurrentPass.current.value,
          nuevoCorreo:
            NewEmail.current.value !== ""
              ? NewEmail.current.value
              : currentUser.eMail,
        };

        axios.post(srvReq, userUpdateInfo).then((response) => {
          switch (response.data.Code) {
            case 1:
              showToast(
                "success",
                "Cambios aplicados",
                "Favor de cerrar sesión para que los cambios tomen efecto"
              );
              break;
            case -1:
              showToast(
                "error",
                "Contraseña incorrecta",
                "La contraseña ingresada no es correcta, los cambios no seran realizados"
              );
              break;
            default:
              showToast("warn", "Error inesperado", "Intentelo mas tarde");
              break;
          }
        });
      } else {
        showToast(
          "warn",
          "Operación invalida",
          "Para realizar cambios debes colocar tu contraseña actual"
        );
      }
    }
  };

  return (
    <div id="informacionUsuario" className="modules">
      <Toast ref={toast} position="top-right" />
      <form className="info_usuario">
        <label>Matricula:</label>
        <p>{currentUser.controlNumber}</p>
        <label>Nombre: </label>
        <p>{currentUser.fullName}</p>
        {currentUser.currentCarrer !== undefined && (
          <div>
            <label>Carrera: </label>
            <p>{currentUser.currentCarrer}</p>
          </div>
        )}
        {currentUser.currentSemester !== undefined && (
          <div>
            <label>Semestre: </label>
            <p>{currentUser.currentSemester}</p>
          </div>
        )}
      </form>
      <form className="info_usuario">
        <p>
          <label>Nueva contraseña: </label>
          <input
            ref={NewPassOne}
            type="password"
            placeholder="Nueva contraseña"
            autoComplete="off"
            maxLength={8}
            minLength={4}
          ></input>
        </p>
        <p>
          <label>Repetir nueva contraseña: </label>
          <input
            ref={NewPassTwo}
            type="password"
            placeholder="Nueva contraseña"
            autoComplete="off"
            maxLength={8}
            minLength={4}
          ></input>
        </p>
        <h9>Debe contener entre 4 y 8 digitos </h9>
        <p>
          <label>Contraseña actual: </label>
          <input
            ref={CurrentPass}
            type="password"
            placeholder="Contraseña actual"
            autoComplete="off"
            maxLength={8}
            minLength={4}
          ></input>
        </p>
        <p>
          <label>Correo electrónico: </label>
          <input
            ref={NewEmail}
            type="email"
            placeholder={currentUser.eMail}
            maxLength={34}
          ></input>
        </p>
      </form>
      <button className="confirmarCambios" onClick={updateChanges}>
        Confirmar cambios
      </button>
    </div>
  );
}

export default InformacionUsuario;
