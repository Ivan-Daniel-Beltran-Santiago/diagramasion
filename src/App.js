import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import MenuEncargada from "./Menus/menuEncargada";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Menu-Encargada" element={<MenuEncargada/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
