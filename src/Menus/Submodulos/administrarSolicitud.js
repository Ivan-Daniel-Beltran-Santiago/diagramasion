import axios from "axios";
import { Toast } from "primereact/toast";
import { useEffect, useState, useRef } from "react";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";

function AdministrarSolicitud({ matriculaSolicitud }) {
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

  const [barraProgresoEstatus, setbarraProgresoEstatus] = useState ({
    1: 0,
    2: 20,
    3: 15,
    4: 40,
    5: 50,
    6: 75,
    7: 55,
    8: 65,
    9: 55,
    10: 75,
    11: 80,
    12: 100,
  });

  const [estatusLexico, setEstatusLexico] = useState({
    1: "Solicitud iniciado",
    2: "Documentos subidos en formato digital",
    3: "Documentos rechazados en formato digital",
    4: "Documentos aceptados en formato digital",
    5: "Documentos recibidos en persona",
    6: "Solicitud enviada a la aseguradora por FEDEX",
    7: "Solicitud rechazada por la aseguradora",
    8: "Nuevos documentos recibidos en formato digital",
    9: "Nuevos documentos rechazados",
    10: "Solicitud reenviada a la aseguradora por FEDEX",
    11: "Finiquito en espera de firma en persona",
    12: "Solicitud terminado",
  });

  const [retroalimentaciones, setRetroalimentaciones] = useState({
    1: " ",
    2: " ",
    3: " ",
    4: " ",
    5: " ",
    6: " ",
    7: " ",
    8: " ",
    9: " ",
    10: " ",
    11: " ",
    12: " ",
  });

  const [documentList, setDocumentList] = useState([]);
  const [datosSolicitud, setDatosSolicitud] = useState({
    nombreSolicitante: "",
    tramiteSolicitado: "",
    estatusAlMomento: "",
    fechaSolicitacion: "",
    fechaUltimaActualizacion: "",
    retroalimentacion: "",
    folio_Solicitud: "",
  });

  const informacionMenus = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/infoDescripcionesMenus";
    //console.log(matriculaSolicitud);
    axios
      .post(srvReq)
      .then((result) => {
        //console.log(result.data[0])
        setEstatusLexico({
          1: result.data[0].texto,
          2: result.data[1].texto,
          3: result.data[2].texto,
          4: result.data[3].texto,
          5: result.data[4].texto,
          6: result.data[5].texto,
          7: result.data[6].texto,
          8: result.data[7].texto,
          9: result.data[8].texto,
          10: result.data[9].texto,
          11: result.data[10].texto,
          12: result.data[11].texto
        })
        setbarraProgresoEstatus({
          1: result.data[0].barraEstatus,
          2: result.data[1].barraEstatus,
          3: result.data[2].barraEstatus,
          4: result.data[3].barraEstatus,
          5: result.data[4].barraEstatus,
          6: result.data[5].barraEstatus,
          7: result.data[6].barraEstatus,
          8: result.data[7].barraEstatus,
          9: result.data[8].barraEstatus,
          10: result.data[9].barraEstatus,
          11: result.data[10].barraEstatus,
          12: result.data[11].barraEstatus
        })
        setRetroalimentaciones({
          1: result.data[0].retroalimentaciones,
          2: result.data[1].retroalimentaciones,
          3: result.data[2].retroalimentaciones,
          4: result.data[3].retroalimentaciones,
          5: result.data[4].retroalimentaciones,
          6: result.data[5].retroalimentaciones,
          7: result.data[6].retroalimentaciones,
          8: result.data[7].retroalimentaciones,
          9: result.data[8].retroalimentaciones,
          10: result.data[9].retroalimentaciones,
          11: result.data[10].retroalimentaciones,
          12: result.data[11].retroalimentaciones
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const conseguirSolicitud = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/RequestUserApplication";
    //console.log(matriculaSolicitud);
    axios
      .post(srvReq, { matriculaUsuario: matriculaSolicitud })
      .then((result) => {
        setDatosSolicitud({
          nombreSolicitante: result.data[0].Usuario.nombre_Completo,
          tramiteSolicitado: result.data[0].Tramite.nombre_Tramite,
          estatusAlMomento: result.data[0].estatus_Actual,
          fechaSolicitacion: result.data[0].fecha_Solicitud,
          fechaUltimaActualizacion: result.data[0].fecha_Actualizacion,
          retroalimentacion: result.data[0].retroalimentacion_Actual,
          id_solicitud: result.data[0].id_Solicitud,
          folio_Solicitud: result.data[0].folio_Solicitud,
        });
        setDocumentList(result.data[0].Documentos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadDocument = (event) => {
    var idArchivo = event.target.id;
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/ObtainDocument";

    axios({
      url: srvReq,
      method: "GET",
      responseType: "blob",
      params: { documentoID: idArchivo },
    }).then((response) => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "Documento.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const actualizarSolicitud = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/updateApplication";
    let textoRetro = document.getElementById("retro").value;
    let numfolio = 0;
    let idEvento = document.getElementById("lang").value;

    //console.log(numfolio)

    if (
      isNaN(Number(document.getElementById("Folio").value)) ||
      Number(document.getElementById("Folio").value) < 0
    ) {
      showToast("error", "Guia invalido", "Debe de ser guia numerica");
    } else {
      if (Number(document.getElementById("Folio").value) !== 0) {
        numfolio = Number(document.getElementById("Folio").value);
        //console.log(true)
      } else {
        numfolio = datosSolicitud.folio_Solicitud;
        //console.log(false);
      }
      //console.log(Number(document.getElementById("Folio").value))

      axios
        .post(srvReq, {
          estatusAnterior: datosSolicitud.estatusAlMomento,
          retroAnterior: datosSolicitud.retroalimentacion,
          id: datosSolicitud.id_solicitud,
          nuevoEstatus: idEvento,
          retroNueva: retroalimentaciones[idEvento]+ ". " + textoRetro,
          folio: numfolio,
        })
        .then((response) => {
          switch (response.data.Code) {
            case 1:
              document.getElementById("Folio").value = "";
              document.getElementById("retro").value = "";
              conseguirSolicitud();
              showToast(
                "success",
                "Solicitud actualizada",
                "La actualizacion a sido exitosa al estado: " + idEvento
              );
              break;
            case -1:
              showToast(
                "error",
                "Actualizacion incorrecta",
                "Porfavor cheque los datos"
              );
              break;
            default:
              showToast("warn", "Error inesperado", "Intentelo mas tarde");
              break;
          }
        });
    }
  };

  const solicitarSeguimiento = () => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/SendSeguimientoEmail";
    axios
      .post(srvReq, {
        destinatario: "l19330593@hermosillo.tecnm.mx",
        folio: datosSolicitud.folio_Solicitud,
        nombre: datosSolicitud.nombreSolicitante,
      })
      .then((response) => {
        console.log(response.data);
        switch (response.data.Code) {
          case 1:
            showToast(
              "success",
              "Correo enviado",
              "La solicitud de seguimiento a sido enviada."
            );
            break;
          case -1:
            showToast(
              "error",
              "Correo no enviado",
              "Porfavor confirme los datos"
            );
            break;
          default:
            showToast("warn", "Error inesperado", "Intentelo mas tarde");
            break;
        }
      });
  };

  useEffect(() => {
    conseguirSolicitud();
    informacionMenus();
    //conseguirDocumentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="NuevaInterfaz" className="modules">
      <Toast ref={toast} position="top-right" />
      <div className="newInterface_container">
        <div className="row_1_administrarSolicitud">
          <form className="w3-container">
            <label className="Indicador">Nombre del solicitante:⠀ </label>
            <label>
              {datosSolicitud.nombreSolicitante ??
                "No se ha cargado ninguna solicitud"}
            </label>
            <br />
            <br />
            <label className="Indicador">Trámite que solicita:⠀ </label>
            <label>
              {datosSolicitud.tramiteSolicitado ??
                "No se ha cargado ninguna solicitud"}
            </label>
            <br />
            <br />
            <label className="Indicador">Estatus actual:⠀ </label>
            <label>
              {datosSolicitud.estatusAlMomento
                ? estatusLexico[datosSolicitud.estatusAlMomento]
                : "No se ha cargado ninguna solicitud"}
            </label>
            <br />
            <br />
            <label className="Indicador">Fecha en que se solicitó:⠀ </label>
            <label>
              {datosSolicitud.fechaSolicitacion ??
                "No se ha cargado ninguna solicitud"}
            </label>
            <br />
            <br />
            <div>
              <label className="Indicador">Progreso de la solicitud: </label>

              <div className="progressBar">
                <div
                  id="progreso"
                  className="progresando"
                  style={{
                    width:
                      barraProgresoEstatus[
                        datosSolicitud.estatusAlMomento ?? 0
                      ] + "%",
                  }}
                >
                  {barraProgresoEstatus[datosSolicitud.estatusAlMomento ?? 0] +
                    "%"}
                </div>
              </div>
            </div>
            <br />
            <br />
            <label className="Indicador">Fecha del último estatus: </label>
            <label>
              {datosSolicitud.fechaUltimaActualizacion ??
                "No se ha cargado ninguna solicitud"}
            </label>
            <br />
            <br />
            <label className="Indicador">Lista de documentos: </label>
            <br />
            <br />
            {documentList !== undefined &&
              documentList.map(function (item) {
                return (
                  <div className="documentList">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                    <a id={item.id_Documento} onClick={downloadDocument}>
                      {item.nombre_Documento}
                    </a>
                    <br />
                  </div>
                );
              })}
            <br />
          </form>
        </div>
        <div className="row_2_administrarSolicitud">
          <form className="w3-container">
            <label className="Indicador">Cambiar estatus: </label>
            <br />
            <br />
            <form className="w3-container">
              <select name="lenguajes" id="lang">
                <option value="3">{estatusLexico[3]}</option>
                <option value="4">{estatusLexico[4]}</option>
                <option value="5">{estatusLexico[5]}</option>
                <option value="6">{estatusLexico[6]}</option>
                <option value="7">{estatusLexico[7]}</option>
                <option value="9">{estatusLexico[9]}</option>
                <option value="10">{estatusLexico[10]}</option>
                <option value="11">{estatusLexico[11]}</option>
                <option value="12">{estatusLexico[12]}</option>
              </select>
            </form>
            <br />
            <label className="Indicador">Retroalimentación: </label>
            <br />
            <textarea
              name="retroalimentacion"
              cols="48"
              rows="8"
              id="retro"
              placeholder={
            datosSolicitud.retroalimentacion ?? "Sin guia"
          }
            ></textarea>
          </form>
          <br />
          <button class="w3-button w3-green" onClick={actualizarSolicitud}>
            Confirmar cambio de estatus
          </button>
          <br />
          <br />
          <button class="w3-button w3-green" onClick={solicitarSeguimiento}>
            Solicitar seguimiento
          </button>
        </div>
      </div>
      <div className="requestInvoice">
        <label className="Indicador">Guia de paqueteria: </label>
        <br />
        <input
        type="text"
          name="Num_folio"
          cols="80"
          rows="1"
          id="Folio"
          placeholder={
            datosSolicitud.folio_Solicitud ?? "Sin guia"
          }
        ></input>
      </div>
    </div>
  );
}

export default AdministrarSolicitud;
