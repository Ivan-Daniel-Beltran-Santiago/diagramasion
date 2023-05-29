import { useNavigate } from "react-router-dom";

const ComponenteRegresar = ({ navigateRoute }) => {
  const navigate = useNavigate();
  const destination = navigateRoute ? navigateRoute : "/";

  return (
    <button
      id="salirButton"
      className="logout"
      onClick={() => navigate(destination)}
    >
      Salir
    </button>
  );
};

export default ComponenteRegresar;
