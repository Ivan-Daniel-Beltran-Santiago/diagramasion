import './App.css';
import React from 'react';
import logo from './Cabeza_Logo.jpg';

function App() {

  /*function openWindow(windowName) {
    var i;
    var x = document.getElementsByClassName("menuVista");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(windowName).style.display = "block";
  }*/

  const openWindow = (event) => {
    var i;
    var x = document.getElementsByClassName("modules");
    var y = event.target.id;
    for (i = 0; i < x.length; i++) {
      if (x[i].id === y) {
        x[i].style.display = "block";
      } else {
        x[i].style.display = "none";
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <div>
          <div className="content-section">
            <div className="contentSelector">
              <button id="bienvenidaEncargada" className="button" onClick={openWindow}>Bienvenida</button>
              <button id="administrarSolicitudes" className="button" onClick={openWindow}>Administración de Solicitudes</button>
              <button id="administracionGeneral" className="button" onClick={openWindow}>Administración General</button>
              <button id="informacionUsuario" className="button" onClick={openWindow}>Información de Usuario</button>
            </div>
            <div>
              <div className="content">
                <div id="bienvenidaEncargada" className="modules">
                  <p>
                    <span className="nuevasSolicitudes"> Aquí va el número de solicitudes nuevas</span>
                  </p>
                  <p>
                    <span className="requiereAtencion">Aquí va el número de solicitudes que requieren atención de la encargada para continuar</span>
                  </p>
                  <p>
                    <span className="requiereAjustes">
                      Aquí va el número de solicitudes que han encontrado impedimentos y no han sido atendidos por el estudiante
                    </span>
                  </p>
                </div>
                <div id="administrarSolicitudes" className="modules" style={{ display: 'none' }}>
                  <table className="tablas">
                    <tbody>
                      <tr className="Cabecera">
                        <th>ID de la Solicitud</th>
                        <th>Tramite Solicitado</th>
                        <th>Fecha de Solicitud</th>
                        <th>Estatus Actual</th>
                        <th>Fecha de Ultima Actualización</th>
                      </tr>
                      <tr>
                        <th>39</th>
                        <th>Orfandad</th>
                        <th>23/10/2077</th>
                        <th>Recien iniciada</th>
                        <th>-</th>
                      </tr>
                      <tr className="registroPar">
                        <th>666</th>
                        <th>Orfandad</th>
                        <th>01/01/0001</th>
                        <th>En espera del deposito</th>
                        <th>31/12/2021</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id="administracionGeneral" className="modules" style={{ display: 'none' }}>
                  <div className="dateContainer">
                    <p><label className="labelDate">Fecha de inicio</label></p>
                    <input type="date" className="dates"></input>
                    <p><label className="labelDate">Fecha de finalización</label></p>
                    <input type="date" className="dates"></input>
                    <button>Generar Informe Estadístico</button>
                  </div>
                  <div>
                    <form>
                      <input type="file" id="subirArchivos" name="Subir archivo Excel"></input>
                      <p><input type="submit" className="loadLogin" value="Cargar Inicios de Sesión"></input></p>
                    </form>
                  </div>
                </div>
                <div id="informacionUsuario" className="modules" style={{ display: 'none' }}>
                  <form className="info_usuario">
                    <label>Matricula</label>
                    <p>La matricula del usuario activo</p>
                    <label>Nombre: </label>
                    <p>El nombre completo del usuario activo</p>
                  </form>
                  <form className="info_usuario">
                    <p>
                      <label>Nueva contraseña: </label>
                      <input type="password" placeholder="Nueva contraseña"></input>
                    </p>
                    <p>
                      <label>Repetir nueva contraseña: </label>
                      <input type="password" placeholder="Nueva contraseña"></input>
                    </p>
                    <p>
                      <label>Contraseña actual: </label>
                      <input type="password" placeholder="Contraseña actual"></input>
                    </p>
                    <p>
                      <label>Correo electrónico: </label>
                      <input type="email" placeholder="Correo actual del usuario activo."></input>
                    </p>
                  </form>
                  <button className="confirmarCambios">Confirmar cambios</button>
                </div>
                <button id="salirButton" className="logout">Salir</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
