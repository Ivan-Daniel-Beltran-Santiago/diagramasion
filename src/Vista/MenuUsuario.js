import React, { useEffect } from "react";
import { Toast } from "primereact/toast";

import "./MenuUsuario.css";
import LogoHeader from "../View/Auxiliary/Logo_Header";
import MenuControlador from "../Controlador/MenuControlador";
import RegresarMenu from "../View/Auxiliary/regresarMenu";

function MenuUsuario({
  MenuUsuarioTostado,
  MenuIndex,
  MenuCambiarIndex,
  MenuUsuarioUsuarioActivo,
  MenuUsuarioSetUsuarioActivo,
  MenuUsuarioObtenerInformacionUsuario,
}) {
  //Llamamos a la funcion para obtener los datos del usuario al momento de cargar la pagina.
  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      await MenuUsuarioObtenerInformacionUsuario();
    };
    obtenerDatosUsuario();
  }, [MenuUsuarioObtenerInformacionUsuario]);

  return (
    <div className="App">
      <LogoHeader />
      <div>
        <div>
          <Toast ref={MenuUsuarioTostado} position="top-right" />
          <div className="content-section">
            <div className="contentSelector">
              <div >
                {MenuUsuarioUsuarioActivo.Estudiante !== null && (
                  <div>
                    <button
                      id="bienvenidaEstudiante"
                      className="button"
                      onClick={() => MenuCambiarIndex(1)}
                    >
                      Bienvenida
                    </button>
                    <button
                      id="administrarSolicitudes"
                      className="botonTramite"
                      onClick={() => MenuCambiarIndex(2)}
                    >
                      Solicitar Tramite
                    </button>
                    <button
                      id="solicitudEstudiante"
                      className="button"
                      onClick={() => MenuCambiarIndex(3)}
                    >
                      Mis Solicitudes
                    </button>
                    <button
                      id="informacionUsuario"
                      className="button"
                      onClick={() => MenuCambiarIndex(4)}
                    >
                      Mi cuenta
                    </button>
                  </div>
                )}
                {MenuUsuarioUsuarioActivo.Estudiante === null && (
                  <div className="buttonContainer_menu">
                    <button
                      id="bienvenidaEncargada"
                      className="button"
                      onClick={() => {
                        MenuCambiarIndex(5);
                      }}
                    >
                      Bienvenida
                    </button>
                    <button
                      id="administrarSolicitudes"
                      className="button"
                      onClick={() => {
                        MenuCambiarIndex(6);
                      }}
                    >
                      Administración de Solicitudes
                    </button>
                    <button
                      id="administrarSolicitud"
                      className="button"
                      onClick={() => {
                        MenuCambiarIndex(7);
                      }}
                    >
                      Administrar Solicitud Individual
                    </button>
                    <button
                      id="administracionGeneral"
                      className="button"
                      onClick={() => {
                        MenuCambiarIndex(8);
                      }}
                    >
                      Informe Estadistico
                    </button>
                    <button
                      id="administracionUsuarios"
                      className="button"
                      onClick={() => {
                        MenuCambiarIndex(9);
                      }}
                    >
                      Administración de Usuarios
                    </button>
                    <button
                      id="administracionTramites"
                      className="button"
                      onClick={() => {
                        MenuCambiarIndex(10);
                      }}
                    >
                      Administración de Tramites
                    </button>
                    <button
                      id="edicionCorreos"
                      className="button"
                      onClick={() => {
                        MenuCambiarIndex(11);
                      }}
                    >
                      Administración de Correos
                    </button>
                    <button
                      id="informacionUsuario"
                      className="button"
                      onClick={() => {
                        MenuCambiarIndex(12);
                      }}
                    >
                      Mi cuenta
                    </button>
                  </div>
                )}
              </div>
              <div>
                <div className="content">
                  <MenuControlador
                    SubmenuIndex={MenuIndex}
                    SubmenuUsuario={MenuUsuarioUsuarioActivo}
                    SubmenuSetUsuarioActivo={MenuUsuarioSetUsuarioActivo}
                  />
                  <RegresarMenu />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuUsuario;
