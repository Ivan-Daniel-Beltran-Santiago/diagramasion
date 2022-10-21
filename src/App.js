import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./View/Login";
import MenuUsuario from "./View/menuUsuario";
import MenuEncargada from "./Menus/menuEncargada";
import MenuEstudiante from "./Menus/menuEstudiante";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Menu" element={<MenuUsuario />} />
        <Route path="/Menu-Encargada" element={<MenuEncargada />} />
        <Route path="/Menu-Estudiante" element={<MenuEstudiante />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
