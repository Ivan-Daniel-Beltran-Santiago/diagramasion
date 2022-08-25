import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import Preferences from "./Preferences/Preferences";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Preferences" element={<Preferences />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
