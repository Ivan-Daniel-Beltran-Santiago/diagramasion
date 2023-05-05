import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { Toast } from "primereact/toast";

const Container = styled.div`padding: 1em;`;
const Requisito = styled.label`color: gray; font-size: 12px`

function EdicionCorreos() {

    const toast = useRef(null);
    const [selectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    const [errorMessage, setMessage] = useState("");

    const changeHandler = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile && selectedFile.type !== 'application/pdf') {
            setMessage('Solo se permiten archivos PDF');
            event.target.value = null;
        }
        else {

            //Si el archivo pesa más de 2MB
            if (selectedFile && selectedFile.size > 2000000) {
                setMessage(`El archivo es demasiado grande (máximo 2 MB).`);
                event.target.value = null;
                return;
            } 
            else {
                setIsSelected(true);
                setMessage("Presione el siguiente botón para guardar");
            }
        }
    };

    const handleSubmit = async (event) => {

        if (!selectedFile) {
            setMessage("Por favor, seleccione un archivo.");
            return;
          }

        try {
            const formData = new FormData();
            formData.append('archivo', selectedFile);

            const response = await fetch('', { method: 'POST', body: formData, });

            if (!response.ok) { setMessage('Hubo un problema. Inténtalo más tarde'); }

        }
        catch (errorMessage) {
            console.error(errorMessage);
            setMessage('Hubo un problema al subir el archivo al servidor.');
        }
    };

    return (
        <Container>
            <Toast ref={toast} position="top-right" />
            <div id="edicionCorreo" className="modules">
                <div>
                    <label>Seleccione el correo a editar:</label>
                    <span class="input-group-btn">
                        <select
                            type="button"
                            className="btn btn-primary"
                            id="seleccionCorreos"
                            onChange={null}>
                            <option id="Seleccionar">Seleccionar</option>
                        </select>
                    </span>

                    <br></br>
                    <Requisito>Inserte un correo válido</Requisito>
                    <hr></hr>
                    <label>Asunto:ㅤㅤ</label>
                    <input
                        type="text"
                        name="Asunto"
                        id="asunto"
                        onChange={null}>
                    </input>

                    <br></br>
                    <Requisito>Sólo se permiten caracteres A-Z y números</Requisito>
                    <br></br>
                    <br></br>

                    <label>Correo a enviar:ㅤ</label>
                    <input
                        type="text"
                        name="Destinatario"
                        id="correoDestinatario"
                        onChange={null}>
                    </input>
                    <br></br>
                    <Requisito>Inserte un correo válido</Requisito>

                    <br></br>
                    <br></br>

                    <label>Cuerpo:</label>
                    <textarea
                        className="form-control"
                        rows="5"
                        id="cuerpoCorreo"
                        placeholder="Texto del correo">
                    </textarea>

                    <br></br>
                    <br></br>

                    <label>Documentos:  </label>
                    <input 
                    type="file" 
                    id="subirArchivosCorreos" 
                    name="Subir documentos pdf"
                    accept="application/pdf"
                    onChange={changeHandler}>
                    </input>
                    {isSelected ? (
                         <br></br>
                    ) : (
                        <><br></br><Requisito>Seleccione un archivo en formato PDF, no mayor a 2MB</Requisito></>
                    )}
                    {errorMessage && <Requisito>{errorMessage}</Requisito>}
                    <input
                        type="submit"
                        className="cargarDocsCorreos"
                        value="Subir archivo"
                        onClick={handleSubmit}>
                    </input>
                </div>
            </div>
        </Container>
    );
}
export default EdicionCorreos;