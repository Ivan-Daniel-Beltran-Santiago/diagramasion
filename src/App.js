import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuLoginControlador from "./Controlador/MenuLoginControlador";
import MenuUsuarioControlador from "./Controlador/MenuUsuarioControlador";

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
        <Route path="/" element={<MenuLoginControlador />} />
        <Route path="/Menu" element={<MenuUsuarioControlador />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
