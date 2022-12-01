import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import SolicitarRegistroTramite from "../../View/Secondary/solicitarTramiteReg";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";

function SolicitarTramite({ correoDest, UserApplication, CurretActiveUser }) {
  const [transactionList, setTransactionList] = useState([{}]);
  const [activeRequest, setActiveRequest] = useState({
    fecha_inicio: "",
    tramite: "",
    estatus: 0,
    retroalim: "",
  });

  const retrieveTransactions = useCallback(() => {
    const srvDir = new ServerConnectionConfig();
    const srvReq = srvDir.getServer() + "/RequestTransactionList";

    axios.post(srvReq).then((response) => {
      setTransactionList(response.data);
    });
  }, []);

  useEffect(() => {
    retrieveTransactions();
    setActiveRequest(UserApplication);
  }, [retrieveTransactions, setActiveRequest, UserApplication]);

  return (
    <div id="administrarSolicitudes" className="modules">
      {transactionList.map(function (item) {
        const metadata = item.Tramite_Ms;
        return (
          <SolicitarRegistroTramite
            nombre={item.nombre_T}
            informacion={metadata ? metadata[0] : ""}
            requisitos={metadata ? metadata[1] : ""}
            emailDest={correoDest}
            Request={activeRequest}
            User={CurretActiveUser}
          />
        );
      })}
    </div>
  );
}

export default SolicitarTramite;
