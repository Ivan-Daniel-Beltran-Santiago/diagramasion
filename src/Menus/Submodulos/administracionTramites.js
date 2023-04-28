import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
FALTA
	Control de Eventos
	Algun otro campo que falte 
*/

const saveChanges = (event) => {};
const importData = (event) => {}; //Mostrar el contenido en el primer cuadro
const importSheet = (event) => {}; //Importar datos del trámite

/*const handleInputChange = (event) => {
    setDateRanges({
      lowerRange: document.getElementById("lowerRange").value,
      upperRange: document.getElementById("upperRange").value,
    });
    validateInputChange(event);
  };*/

const Container = styled.div`padding: 1em;`;

function AdministracionTramites() {
	return (
		<Container>
			<div id="administracionTramites" className="modules">
			<div class="form-group">
			<label>Seleccione el trámite</label>
      		<span class="input-group-btn">
			  <select type="button" className="btn btn-primary">
					<option>Seleccionar</option>
					<option onClick={importSheet}>Doc</option>
					<option onClick={importSheet}>Daoc</option>
					<option onClick={importSheet}>Doc</option>
				</select>
      		</span>
			<hr></hr>
			<label>Seleccione el dato que desea cambiar</label>
      		<span class="input-group-btn">
			  <select type="button" className="btn btn-primary">
					<option>Seleccionar</option>
					<option onClick={importData}>Dato1</option>
					<option onClick={importData}>Dato2</option>
					<option onClick={importData}>Dato3</option>
				</select>
				<br></br>
      		</span>
			<br></br>
			<p>Nuevo contenido:</p>
  			<textarea className="form-control" rows="5" id="datacontents" placeholder="Inserte el dato actualizado aquí"></textarea>
  			<br></br>
			</div>
			<button type="button" className="btn btn-danger" onClick={saveChanges}>Guardar Cambios</button>
			</div>
		</Container>
	);
}

export default AdministracionTramites;