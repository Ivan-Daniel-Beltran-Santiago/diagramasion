import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import Preferences from './Preferences/Preferences';

function App(props) {
  const [token, setToken] = useState();
  const isLoggedVisible = props.isLoggedVisible;
  if(isLoggedVisible) {
    return <Login setToken={setToken} />
  }
  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div class="login">
          <h2 class="title">Iniciar sesión</h2>
          <form>
            <h4>Matrícula/Número de control</h4>
            <input type="text" id="id number" placeholder="Matrícula/Número de control" />
            <h4>Contraseña</h4>
            <input type="password" id="password" placeholder="Contraseña"/>
            <input type="submit" id="save" value="Ingresar" class="ingress"/>
            <p>Si es tu primera vez en el sistema, la contraseña es tu matrícula</p>
          </form>
        </div>
      </header>
    </div>*/
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/Dashboard'>
            <Dashboard />
          </Route>
          <Route path='/Preferences'>
            <Preferences />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
