function MenuBienvenidaEncargada() {
  return (
    <div id="bienvenidaEncargada" className="modules">
      <p>
        <span className="nuevasSolicitudes">
          {" "}
          Aquí va el número de solicitudes nuevas
        </span>
      </p>
      <p>
        <span className="requiereAtencion">
          Aquí va el número de solicitudes que requieren atención de la
          encargada para continuar
        </span>
      </p>
      <p>
        <span className="requiereAjustes">
          Aquí va el número de solicitudes que han encontrado impedimentos y no
          han sido atendidos por el estudiante
        </span>
      </p>
    </div>
  );
}
export default MenuBienvenidaEncargada;
