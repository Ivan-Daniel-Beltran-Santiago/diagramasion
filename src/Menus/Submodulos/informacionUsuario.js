function InformacionUsuario({ currentUser }) {
  return (
    <div id="informacionUsuario" className="modules">
      <form className="info_usuario">
        <label>Matricula:</label>
        <p>{currentUser.controlNumber}</p>
        <label>Nombre: </label>
        <p>{currentUser.fullName}</p>
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
          <input type="email" placeholder={currentUser.eMail}></input>
        </p>
      </form>
      <button className="confirmarCambios">Confirmar cambios</button>
    </div>
  );
}

export default InformacionUsuario;
