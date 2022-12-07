import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import SolicitarRegistroTramite from "../../View/Secondary/solicitarTramiteReg";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";

function SolicitarTramite({ UserHasOngoingApplication, CurretActiveUser }) {
  const [transactionList, setTransactionList] = useState([{}]);

  const retrieveTransactions = useCallback(() => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/RequestTransactionList";

    axios.post(srvReq).then((response) => {
      setTransactionList(response.data);
    });
  }, []);

  useEffect(() => {
    retrieveTransactions();
  }, [retrieveTransactions]);

  return (
    <div id="administrarSolicitudes" className="modules">
      {transactionList.map(function (item) {
        const metadata = item.Tramite_Ms;
        return (
          <SolicitarRegistroTramite
            nombre={item.nombre_T}
            informacion={metadata ? metadata[0] : ""}
            requisitos={metadata ? metadata[1] : ""}
            HasRequest={UserHasOngoingApplication}
            User={CurretActiveUser}
          />
        );
      })}
    </div>
  );
}

export default SolicitarTramite;
