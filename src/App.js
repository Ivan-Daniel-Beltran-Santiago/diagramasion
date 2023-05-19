import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginControlador from "./Controlador/LoginControlador";
import MenuEncargada from "./Menus/menuEncargada";
import MenuEstudiante from "./Menus/menuEstudiante";
import Footer from "./View/Auxiliary/footer";

import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/themes/saga-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginControlador />} />
        <Route path="/Menu-Encargada" element={<MenuEncargada />} />
        <Route path="/Menu-Estudiante" element={<MenuEstudiante />} />
        <Route path="/Menu/Solicitud" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
