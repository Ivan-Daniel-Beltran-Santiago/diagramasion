import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import axios from "axios";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";

function InformacionUsuario({ currentUser }) {
  const CurrentPass = useRef(null);
  const toast = useRef(null);

  const [userInfo, setUserInfo] = useState({
    matriculaUsuario: "",
    contraseñaUsuario: "",
    newPassword: "",
    confirmPassword: "",
    newEmail: currentUser.eMail,
  });
  const [validEmail, setValidEmail] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [validConfirm, setValidConfirm] = useState(false);
  const [equalPass, setEqualPass] = useState(false);

  const showToast = (severityValue, summaryValue, detailValue) => {
    toast.current.show({
      closable: false,
      life: 5000,
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  };

  const handleInputChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    validateInputChange(event);
  };

  const validateInputChange = (event) => {
    let entry = event.target.value;
    switch (event.target.name) {
      case "newPassword":
        let passwordValidator = new RegExp("^[0-9]{4,8}$");
        setValidPass(passwordValidator.test(entry));
        setEqualPass(
          document.getElementById("newPassword").value ===
            document.getElementById("confirmPassword").value
        );
        break;
      case "confirmPassword":
        let confirmValidator = new RegExp("^[0-9]{4,8}$");
        setValidConfirm(confirmValidator.test(entry));
        setEqualPass(
          document.getElementById("newPassword").value ===
            document.getElementById("confirmPassword").value
        );
        break;
      case "newEmail":
        let emailValidator =
          // eslint-disable-next-line no-useless-escape
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setValidEmail(emailValidator.test(entry));
        break;
      default:
        break;
    }
  };

  const updateChanges = () => {
    if (equalPass || validEmail) {
      if (CurrentPass.current.value !== "") {
        showToast(
          "info",
          "Cambios en proceso",
          "Los cambios se estan procesando"
        );

        if (userInfo.newPassword == ""){
          userInfo.newPassword = CurrentPass.current.value;
        }

        const srvDir = new ServerConnectionConfig();
        const srvReq = srvDir.getServer() + "/UpdateUserInfo";
        axios
          .post(srvReq, {
            matriculaUsuario: currentUser.controlNumber,
            contraseñaUsuario: CurrentPass.current.value,
            correoUsuario: currentUser.eMail,
            newPassword: userInfo.newPassword,
            newEmail: userInfo.newEmail,
          })
          .then((response) => {
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
        <label>Matricula:    </label>
        <label>    {currentUser.controlNumber}</label>
        <br />
        <br />
        <label>Nombre:    </label>
        <label>    {currentUser.fullName}</label>
        <br />
        <br />
        {currentUser.currentCarrer !== undefined && (
          <div>
            <label>Carrera:    </label>
            <label>    {currentUser.currentCarrer}</label>
          </div>
        )}
        {currentUser.currentSemester !== undefined && (
          <div>
            <label>Semestre:    </label>
            <label>    {currentUser.currentSemester}</label>
          </div>
        )}
      </form>
      <form className="info_usuario">
        <p>
          <label>Nueva contraseña: </label>
          <input
            type="password"
            placeholder="Nueva contraseña"
            autoComplete="off"
            name="newPassword"
            id="newPassword"
            onChange={handleInputChange}
          ></input>
        </p>
        <p>
          <label>Repetir nueva contraseña: </label>
          <input
            type="password"
            placeholder="Repetir nueva contraseña"
            autoComplete="off"
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleInputChange}
          ></input>
        </p>
        {((!validPass && userInfo.newPassword.length > 0) ||
          (!validConfirm && userInfo.confirmPassword.length > 0)) && (
          <label className="LoginWarning">
            La nueva contraseña debe contener entre 4 y 8 digitos{" "}
          </label>
        )}
        <br />
        {!equalPass &&
          userInfo.newPassword.length > 0 &&
          userInfo.confirmPassword.length > 0 && (
            <label className="LoginWarning">
              La contraseña debe coindidir en ambos campos
            </label>
          )}
        <p>
          <label>Contraseña actual: </label>
          <input
            ref={CurrentPass}
            type="password"
            placeholder="Contraseña actual"
            autoComplete="off"
            name="contraseñaUsuario"
            id="contraseñaUsuario"
            onChange={handleInputChange}
          ></input>
        </p>
        <p>
          <label>Correo electrónico: </label>
          <input
            type="email"
            placeholder={currentUser.eMail}
            name="newEmail"
            id="newEmail"
            onChange={handleInputChange}
          ></input>
        </p>
        {!validEmail && userInfo.newEmail.length > 0 && (
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
      </form>
      <button className="confirmarCambios" onClick={updateChanges}>
        Confirmar cambios
      </button>
    </div>
  );
}

export default InformacionUsuario;
