import { useRef, useState } from "react";
import ConfigurarConexion from "./ConfigurarConexion";
import SubmenuAdministrarReportes from "../Vista/SubmenuAdministrarReportes";
import axios from "axios";

const SubmenuAdministrarReportesControlador = () => {
  //Variables de estado
  const [fechaInicoReporte, setFechaInicioReporte] = useState("");
  const [fechaFinalReporte, setFechaFinalReporte] = useState("");
  const [fechasValidas, setFechasValidas] = useState(false);

  //Alertas
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

  const handleInputChange = (event) => {
    var fechaInput = event.target.value;
    event.target.name === "fechaInicio"
      ? setFechaInicioReporte(fechaInput)
      : setFechaFinalReporte(fechaInput);
    event.target.name === "fechaInicio"
      ? setFechasValidas(fechaInput < fechaFinalReporte)
      : setFechasValidas(fechaInput > fechaInicoReporte);
  };

  const generarReporte = async () => {
    try {
      const servidor = new ConfigurarConexion();
      const funcion = servidor.obtenerServidor() + "/solicitudes/reporte";

      const reporteObtenido = await axios.get(funcion, {
        responseType: "blob",
        params: {
          fecha_Inicio_Reporte: fechaInicoReporte,
          fecha_Final_Reporte: fechaFinalReporte,
        },
      });

      switch (reporteObtenido.status) {
        case 200:
          const href = URL.createObjectURL(reporteObtenido.data);
          const link = document.createElement("a");
          link.href = href;
          link.setAttribute("download", "Reporte.xlsx");
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(href);
          document.body.removeChild(link);
          break;
        case 204:
          showToast(
            "warn",
            "Reporte",
            "No hay solicitudes actualmente en el sistema, asi que no se puede generar un reporte estadistico"
          );
          break;
        case 400:
          showToast(
            "error",
            "Reporte",
            "Las fechas no cumplian con la condicion especificada, es decir, no era un rango de fechas valido"
          );
          break;
        default:
          showToast(
            "error",
            "Servidor",
            "Error de servidor, contacte al administrador"
          );
          break;
      }
    } catch (error) {
      console.log(error);
      switch (error.response.status) {
        case 204:
          showToast(
            "warn",
            "Reporte",
            "No hay solicitudes actualmente en el sistema, asi que no se puede generar un reporte estadistico"
          );
          break;
        case 400:
          showToast(
            "error",
            "Reporte",
            "Las fechas no cumplian con la condicion especificada, es decir, no era un rango de fechas valido"
          );
          break;
        default:
          showToast(
            "error",
            "Servidor",
            "Error de servidor, contacte al administrador"
          );
          break;
      }
    }
  };

  return (
    <SubmenuAdministrarReportes
      SubmenuAdministrarReportesTostado={toast}
      SubmenuAdministrarReportesHandleInputChange={handleInputChange}
      SubmenuAdministrarReportesFechaInicioReporte={fechaInicoReporte}
      SubmenuAdministrarReportesFechaFinalReporte={fechaFinalReporte}
      SubmenuAdministrarReportesFechasValidas={fechasValidas}
      SubmenuAdministrarReportesGenerarReporte={generarReporte}
    />
  );
};

export default SubmenuAdministrarReportesControlador;
