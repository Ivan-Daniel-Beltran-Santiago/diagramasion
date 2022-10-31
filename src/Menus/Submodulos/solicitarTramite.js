import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import SolicitarRegistroTramite from "../../View/Secondary/solicitarTramiteReg";

function SolicitarTramite({ correoDest, UserApplication }) {
  const [transactionList, setTransactionList] = useState([{}]);
  const [activeRequest, setActiveRequest] = useState(false);

  const retrieveTransactions = useCallback(() => {
    axios
      .post("http://localhost:3001/RequestTransactionList")
      .then((response) => {
        setTransactionList(response.data);
      });
  }, []);

  useEffect(() => {
    retrieveTransactions();
    setActiveRequest(UserApplication.estatus > 0 ? true : false);
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
            allowNewRequest={activeRequest}
          />
        );
      })}
    </div>
  );
}

export default SolicitarTramite;
