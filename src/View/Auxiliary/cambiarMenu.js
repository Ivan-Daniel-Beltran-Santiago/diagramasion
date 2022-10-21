const CambiarMenu = ({ indexValue, setIndexVisible, buttonText }) => {
  const buttonID = "MenuButton" + indexValue;
  return (
    <button
      id={buttonID}
      className="button"
      onClick={() => setIndexVisible(indexValue)}
    >
      {buttonText}
    </button>
  );
};

export default CambiarMenu;
