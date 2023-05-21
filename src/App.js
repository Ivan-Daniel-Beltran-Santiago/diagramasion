import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginControlador from "./Controlador/LoginControlador";
import MenuUsuarioControlador from "./Controlador/MenuUsuarioControlador";
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
        <Route path="/Menu" element={<MenuUsuarioControlador />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
