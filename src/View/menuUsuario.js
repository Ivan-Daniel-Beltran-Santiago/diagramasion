import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

import LogoHeader from "./Auxiliary/Logo_Header";
import RegresarMenu from "./Auxiliary/regresarMenu";
import CambiarMenu from "./Auxiliary/cambiarMenu";
import VistaMenuActual from "../Controller/cambiarVistas";

const MenuUsuario = () => {
  const [indexVisible, setIndexVisible] = useState({ index: -1 });

  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({
    controlNumber: 0,
    fullName: "",
    eMail: "",
    currentCarrer: "", //Opcional
    currentSemester: 0, //Opcional
  });

  useEffect(() => {
    setIndexVisible(location.state[0].loginType === 7 ? 7 : 1);
  }, []);

  return (
    <div className="App">
      <LogoHeader />
      <div>
        <div>
          <div className="content-section">
            <div className="contentSelector"></div>
            <div>
              <div className="content">
                <VistaMenuActual
                  VistaIndex={indexVisible}
                  currentUser={currentUser}
                />
                <RegresarMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuUsuario;
