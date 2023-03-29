import axios from "axios";
import { useRef, useState } from "react";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";
import * as XLSX from "xlsx";
import { Toast } from "primereact/toast";

function AdministracionGeneral() {
  const [dateRanges, setDateRanges] = useState({
    lowerRange: "",
    upperRange: "",
  });
  const [validDataRange, setValidDataRange] = useState(false);
  const [newUsers, setNewUsers] = useState([]);
  const [exitos, setExitos] = useState(0);

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

  const validateInputChange = (event) => {
    const lower = dateRanges.lowerRange ?? "none";
    const upper = dateRanges.upperRange ?? "none";
    if (lower !== "none" && upper !== "none") {
      const lowerDate = new Date(document.getElementById("lowerRange").value);
      const upperDate = new Date(document.getElementById("upperRange").value);
      if (+upperDate < +lowerDate) {
        setValidDataRange(false);
      } else {
        setValidDataRange(true);
      }
    }
  };

  const handleInputChange = (event) => {
    setDateRanges({
      lowerRange: document.getElementById("lowerRange").value,
      upperRange: document.getElementById("upperRange").value,
    });
    validateInputChange(event);
  };

  const handleNewUsers = (array) => {
    const newUserArray = [...newUsers];
    // eslint-disable-next-line array-callback-return
    array.some((file) => {
      if (newUserArray.findIndex((f) => (f[0] === file[0]) === -1)) {
        newUserArray.push(file);
      }
    });
    setNewUsers(newUserArray);
    showToast(
      "success",
      "Registros de Usuarios",
      "Usuarios listos para cargarse a la base de datos"
    );
  };

  const handleFileChange = async (event) => {
    event.preventDefault();
    setNewUsers([{}]);
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

  const uploadNewUsers = (event) => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/SubirUsuarios";
    setExitos(0);

    for (var indice = 0; indice < newUsers.length; indice++) {
      let matricula = newUsers[indice][0];
      let nombre_Completo = newUsers[indice][1];
      let contraseña = newUsers[indice][0];
      let correo_e = newUsers[indice][2];
      let carrera = newUsers[indice][3];
      let semestre = newUsers[indice][4];
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
    showToast(
      "success",
      "Inicios de sesión",
      "Todos los inicios de sesión han sido cargados con exito."
    );
  };

  const obtenerEstadisticas = (event) => {
    event.preventDefault();
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/ObtenerConteoEstadistico";
    /*
    axios
      .get(srvReq, { params: dateRanges })
      .then((result) => {
        console.log(result.data);
        const href = URL.createObjectURL(result.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "Documento.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((error) => {
        console.log(error);
      });
      */
    axios({
      url: srvReq,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "Documento.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="administracionGeneral" className="modules">
      <Toast ref={toast} position="top-right" />
      <div className="dateContainer">
        <p>
          <label className="labelDate">Fecha de inicio</label>
        </p>
        <input
          type="date"
          className="dates"
          min={"2022-11-01"}
          id="lowerRange"
          onChange={handleInputChange}
        ></input>
        <p>
          <label className="labelDate">Fecha de finalización</label>
        </p>
        <input
          type="date"
          className="dates"
          min={"2022-11-01"}
          id="upperRange"
          onChange={handleInputChange}
        ></input>
        <br />
        {!validDataRange && (
          <label>
            La fecha de finalización no puede ser menor a la fecha de inicio.
          </label>
        )}
        <button onClick={obtenerEstadisticas}>
          Generar Informe Estadístico
        </button>
      </div>
      <div>
        <br />
        <label>Subida de archivo de usuarios: </label>
        <br />
        <form>
          <input
            type="file"
            id="subirArchivos"
            name="Subir archivo Excel"
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleFileChange}
          ></input>
          <p>
            <input
              type="button"
              className="loadLogin"
              value="Cargar Inicios de Sesión"
              onClick={uploadNewUsers}
            ></input>
          </p>
        </form>
      </div>
    </div>
  );
}
export default AdministracionGeneral;
