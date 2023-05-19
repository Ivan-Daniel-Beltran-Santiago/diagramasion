import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";
import { Toast } from "primereact/toast";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const Container = styled.div`
  padding: 1em;
`;

function AdministracionTramites() {
  //Variables de estado
  const [listaTramites, setListaTramites] = useState([]);
  const [listaMetadataTramite, setListaMetadataTramite] = useState([]);

  const [falloListaTramites, setFalloListaTramites] = useState(false);
  const [falloListaMetadataTramites, setFalloListaMetadataTramites] =
    useState(false);

  //Colocar el valor del campo seleccionado en el area de texto para poder cambiarlo
  const ColocarMetadata = () => {
    var elemento = document.getElementById("seleccionMetadata");
    var ID_Metadata = elemento.options[elemento.selectedIndex].value;
    if (ID_Metadata !== "Seleccionar" && ID_Metadata !== "Fallo") {
      document.getElementById("contenidoMetadata").value = listaMetadataTramite[ID_Metadata].texto;
    }
  };

  //Obtener toda la metadata del trámite seleccionado
  const ObtenerMetadataTramites = () => {
    var elemento = document.getElementById("seleccionTramites");
    var ID_Tramite = elemento.options[elemento.selectedIndex].value;
    if (ID_Tramite !== "Seleccionar" && ID_Tramite !== "Fallo") {
      const srvDir = new ServerConnectionConfig();
      const srvReq =
        srvDir.getServer() + "/tramites/detalles";
      axios
        .post(srvReq, { ID_Tramite })
        .then((respuesta) => {
          if (respuesta.data[0].Tramite_Ms.length > 0) {
            //Se añaden los datos del trámite al arreglo.
            setFalloListaMetadataTramites(false);
            setListaMetadataTramite(respuesta.data[0].Tramite_Ms);
          } else {
            //Si los datos del tramite regresan vacios.
            setFalloListaMetadataTramites(true);
            showToast(
              "error",
              "Listado de Trámites",
              "Ha ocurrido un error al obtener los trámites, por favor contacte al administrador del sistema."
            );
          }
        })
        .catch((error) => {
          console.log(error);
          setFalloListaMetadataTramites(true);
          showToast(
            "error",
            "Listado de Trámites",
            "Ha ocurrido un error al obtener los trámites, por favor contacte al administrador del sistema."
          );
        });
    }
  };

  //Obtener todos los trámites, para colocarlos en el botón de selección
  const ObtenerTramites = useCallback(() => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/tramites/lista";
    axios
      .get(srvReq)
      .then((respuesta) => {
        //Se añaden todos los trámites a el arreglo
        setFalloListaTramites(false);
        setListaTramites(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
        setFalloListaTramites(true);
        showToast(
          "error",
          "Listado de Trámites",
          "Ha ocurrido un error al obtener los trámites, por favor contacte al administrador del sistema."
        );
      });
  }, []);

  //Para llamar a la función solo una vez, cuando el componente se renderiza
  useEffect(() => {
    ObtenerTramites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const GuardarCambios = () => {
    // Obtener el ID de la metadata seleccionada
    const elementoMetadata = document.getElementById("seleccionMetadata");
    let ID_Metadata = elementoMetadata.options[elementoMetadata.selectedIndex].value;

    ID_Metadata = (parseInt(ID_Metadata) + 1).toString();

    // Obtener el valor del campo de texto
    const contenidoMetadata = document.getElementById("contenidoMetadata").value;

    //console.log(ID_Metadata, contenidoMetadata)

    if (ID_Metadata !== "Seleccionar" && ID_Metadata !== "Fallo"){
      const srvDir = new ServerConnectionConfig();
      const srvReq = srvDir.getServer() + "/tramites/actualizar";
      axios
        .post(srvReq, {  id_metadata: ID_Metadata, contenido: contenidoMetadata})
        .then((respuesta) => {
          if(respuesta.data.Code == 1){
            showToast(
              "success",
              "Guardar Cambios",
              "Se ha actualizado el metadata exitosamente."
            );
            ObtenerTramites();
            ObtenerMetadataTramites();
          }
          else{
            showToast(
              "error",
              "Guardar Cambios",
              "Ha ocurrido un error al actualizar la metadata, por favor contacte al administrador del sistema."
            );
          }
        })
        .catch((error) => {
          console.log(error);
          showToast(
            "error",
            "Guardar Cambios",
            "Ha ocurrido un error al actualizar la metadata, por favor contacte al administrador del sistema."
          );
        });
    } else {
      showToast(
        "warn",
        "Guardar Cambios",
        "Por favor seleccione una metadata antes de guardar los cambios."
      )
    }
  }

  return (
    <Container>
      <Toast ref={toast} position="top-right" />
      <div id="administracionTramites" className="modules">
        <div class="form-group">
          <label>Seleccione el trámite</label>
          <span class="input-group-btn">
            <select
              type="button"
              className="btn btn-primary"
              id="seleccionTramites"
              onChange={ObtenerMetadataTramites}
            >
              <option id="Seleccionar">Seleccionar</option>
              {falloListaTramites ? (
                <option id="Fallo">Porfavor contacte al administrador.</option>
              ) : (
                listaTramites.map((tramite) => (
                  <option value={tramite.id_Tramite}>
                    {tramite.nombre_Tramite}
                  </option>
                ))
              )}
            </select>
          </span>
          <hr></hr>
          <label>Seleccione el dato que desea cambiar</label>
          <span class="input-group-btn">
            <select
              type="button"
              className="btn btn-primary"
              id="seleccionMetadata"
              onChange={ColocarMetadata}
            >
              <option id="Seleccionar">Seleccionar</option>
              {falloListaMetadataTramites ? (
                <option id="Fallo">Porfavor contacte al administrador.</option>
              ) : (
                listaMetadataTramite.map((metadata) => (
                  <option value={listaMetadataTramite.indexOf(metadata)}>
                    {metadata.titulo}
                  </option>
                ))
              )}
            </select>
            <br></br>
          </span>
          <br></br>
          <p>Nuevo contenido:</p>
          <textarea
            className="form-control"
            rows="5"
            id="contenidoMetadata"
            placeholder="Inserte el dato actualizado aquí"
          ></textarea>
          <br></br>
        </div>
        <button type="button" class="w3-button w3-green" onClick={GuardarCambios}>  
          Guardar Cambios
        </button>
      </div>
    </Container>
  );
}

export default AdministracionTramites;
