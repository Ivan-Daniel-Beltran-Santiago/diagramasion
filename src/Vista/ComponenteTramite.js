import React from "react";
import { Toast } from "primereact/toast";

const ComponenteTramite = ({
  ComponenteTramiteTramiteVisible,
  ComponenteTramiteSetTramiteVisible,
  ComponenteTramiteTostado,
  ComponenteTramiteDatosTramite,
  ComponenteTramiteDatosTramiteInformacion,
  ComponenteTramiteDatosTramiteRequisitos,
  ComponenteTramiteSolicitar,
}) => {
  return (
    <div className="nombreTramite">
      <Toast ref={ComponenteTramiteTostado} position="top-right" />
      <div className="accordion-item">
        <div
          className="tituloAcordeon"
          onClick={() =>
            ComponenteTramiteSetTramiteVisible(!ComponenteTramiteTramiteVisible)
          }
        >
          <div className="Indicador">
            {ComponenteTramiteDatosTramite.nombre_Tramite}
          </div>
          <div>{ComponenteTramiteTramiteVisible ? "-" : "+"}</div>
        </div>
        {ComponenteTramiteTramiteVisible && (
          <div className="contenidoAcordeon">
            <br />
            <p>
              <label className="Indicador">Información: </label> <br />
              {ComponenteTramiteDatosTramiteInformacion.map(function (
                informacion
              ) {
                return (
                  <div
                    key={
                      ComponenteTramiteDatosTramiteInformacion.indexOf(
                        informacion
                      ) + "INFORMACION.DIV"
                    }
                  >
                    <label
                      key={
                        ComponenteTramiteDatosTramiteInformacion.indexOf(
                          informacion
                        ) + "INFORMACION.LABEL"
                      }
                    >
                      {informacion.texto === ""
                        ? "Información no disponible"
                        : informacion.texto}
                    </label>
                    <br />
                  </div>
                );
              })}
            </p>
            <div>
              <label className="Indicador">Requisitos: </label> <br />
              {ComponenteTramiteDatosTramiteRequisitos.map(function (
                requisito
              ) {
                return (
                  <div
                    key={
                      ComponenteTramiteDatosTramiteRequisitos.indexOf(
                        requisito
                      ) + "REQUISITO.DIV"
                    }
                  >
                    <label
                      key={
                        ComponenteTramiteDatosTramiteRequisitos.indexOf(
                          requisito
                        ) + "REQUISITO.LABEL"
                      }
                    >
                      {requisito.texto === ""
                        ? "Información no disponible"
                        : requisito.texto}
                    </label>
                    <br />
                  </div>
                );
              })}
            </div>
            <br />
            <button
              className="solicitarTramite"
              onClick={() => {
                ComponenteTramiteSolicitar(
                  ComponenteTramiteDatosTramite.id_Tramite
                );
              }}
            >
              Solicitar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponenteTramite;
