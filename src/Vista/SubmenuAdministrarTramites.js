import React, { useEffect } from "react";
import { Toast } from "primereact/toast";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const Container = styled.div`
  padding: 1em;
`;

const SubmenuAdministrarTramites = ({
  SubmenuAdministrarTramitesTostado,
  SubmenuAdministrarTramitesObtenerListaTramites,
  SubmenuAdministrarTramitesListaTramites,
  SubmenuAdministrarTramitesObtenerListaMetadata,
  SubmenuAdministrarTramitesObtenerMetadata,
  SubmenuAdministrarTramitesListaMetadataTramite,
  SubmenuAdministrarTramitesActualizarMetadata,
  SubmenuAdministrarTramitesCampoMetadataVacio,
}) => {
  useEffect(() => {
    SubmenuAdministrarTramitesObtenerListaTramites();
  }, []);

  return (
    <Container>
      <Toast ref={SubmenuAdministrarTramitesTostado} position="top-right" />
      <div id="administracionTramites" className="modules">
        <div class="form-group">
          <label>Seleccione el trámite</label>
          <span class="input-group-btn">
            <select
              type="button"
              className="btn btn-primary"
              id="seleccionTramites"
              onChange={() =>
                SubmenuAdministrarTramitesObtenerListaMetadata(
                  document.getElementById("seleccionTramites").options[
                    document.getElementById("seleccionTramites").selectedIndex
                  ].value
                )
              }
            >
              <option id="Seleccionar">Seleccionar</option>
              {SubmenuAdministrarTramitesListaTramites !== undefined &&
              SubmenuAdministrarTramitesListaTramites !== null &&
              SubmenuAdministrarTramitesListaTramites.length > 0 ? (
                SubmenuAdministrarTramitesListaTramites.map((tramite) => (
                  <option value={tramite.id_Tramite}>
                    {tramite.nombre_Tramite}
                  </option>
                ))
              ) : (
                <option id="Fallo">Porfavor contacte al administrador.</option>
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
              onChange={() =>
                SubmenuAdministrarTramitesObtenerMetadata(
                  document.getElementById("seleccionMetadata").options[
                    document.getElementById("seleccionMetadata").selectedIndex
                  ].value
                )
              }
            >
              <option id="Seleccionar">Seleccionar</option>
              {SubmenuAdministrarTramitesListaMetadataTramite !== undefined &&
              SubmenuAdministrarTramitesListaMetadataTramite !== null &&
              SubmenuAdministrarTramitesListaMetadataTramite.length > 0 ? (
                SubmenuAdministrarTramitesListaMetadataTramite.map(
                  (metadata) => (
                    <option value={metadata.id_Tramite_M}>
                      {metadata.titulo}
                    </option>
                  )
                )
              ) : (
                <option id="Fallo">Porfavor contacte al administrador.</option>
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
        {!SubmenuAdministrarTramitesCampoMetadataVacio && (
          <button
            type="button"
            class="w3-button w3-green"
            onClick={() =>
              SubmenuAdministrarTramitesActualizarMetadata(
                document.getElementById("seleccionMetadata").options[
                  document.getElementById("seleccionMetadata").selectedIndex
                ].value
              )
            }
          >
            Guardar Cambios
          </button>
        )}
      </div>
    </Container>
  );
};

export default SubmenuAdministrarTramites;
