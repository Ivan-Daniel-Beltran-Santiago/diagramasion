function InformacionUsuario() {
  return (
    <div
      id="informacionUsuario"
      className="modules"
    >
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
          <input
            type="email"
            placeholder="Correo actual del usuario activo."
          ></input>
        </p>
      </form>
      <button className="confirmarCambios">Confirmar cambios</button>
    </div>
  );
}

export default InformacionUsuario;
