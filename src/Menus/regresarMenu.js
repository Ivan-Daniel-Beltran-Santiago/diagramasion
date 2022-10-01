import { useNavigate } from "react-router-dom";

const RegresarMenu = ({navigateRoute}) => {
  const navigate = useNavigate();
  let destination = navigateRoute ? navigateRoute : "/";
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

export default RegresarMenu;
