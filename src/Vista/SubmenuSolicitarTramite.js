import React from "react";
import ComponenteTramite from "./ComponenteTramite";

function SubmenuSolicitarTramite({
  SubmenuSolicitarTramiteListaTramites,
  SubmenuSolicitarTramiteListaTramitesInformacion,
  SubmenuSolicitarTramiteListaTramitesRequisitos,
  SubmenuSolicitarTramiteTramiteVisible,
  SubmenuSolicitarTramiteSetTramiteVisible,
  SubmenuSolicitarTramiteSolicitar,
  SubmenuSolicitarTramiteTostado,
}) {
  return (
    <div id="administrarSolicitudes" className="modules">
      <span>
        Clicle el tramite a solicitar, para acceder a su boton y comenzar el
        tramite.{" "}
      </span>
      {SubmenuSolicitarTramiteListaTramites.map(function (tramite) {
        return (
          <ComponenteTramite
            key={SubmenuSolicitarTramiteListaTramites.indexOf(tramite)}
            ComponenteTramiteTramiteVisible={
              SubmenuSolicitarTramiteTramiteVisible
            }
            ComponenteTramiteSetTramiteVisible={
              SubmenuSolicitarTramiteSetTramiteVisible
            }
            ComponenteTramiteDatosTramite={
              SubmenuSolicitarTramiteListaTramites[
                SubmenuSolicitarTramiteListaTramites.indexOf(tramite)
              ]
            }
            ComponenteTramiteDatosTramiteInformacion={
              SubmenuSolicitarTramiteListaTramitesInformacion[
                SubmenuSolicitarTramiteListaTramites.indexOf(tramite)
              ]
            }
            ComponenteTramiteDatosTramiteRequisitos={
              SubmenuSolicitarTramiteListaTramitesRequisitos[
                SubmenuSolicitarTramiteListaTramites.indexOf(tramite)
              ]
            }
            ComponenteTramiteSolicitar={SubmenuSolicitarTramiteSolicitar}
            ComponenteTramiteTostado={SubmenuSolicitarTramiteTostado}
          />
        );
      })}
    </div>
  );
}

export default SubmenuSolicitarTramite;
