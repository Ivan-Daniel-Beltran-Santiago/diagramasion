import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { Toast } from "primereact/toast";
const Container = styled.div`padding: 1em;`;

function EdicionCorreos() {

    const toast = useRef(null);

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
                    <hr></hr>
                    <label>Asunto:ㅤㅤ</label>
                    <input
                        type="text"
                        name="Asunto"
                        id="asunto"
                        onChange={null}>
                    </input>
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
                    <br></br>
                    <label>Cuerpo:</label>
                    <textarea
                        className="form-control"
                        rows="5"
                        id="cuerpoCorreo"
                        placeholder="Texto del correo">
                    </textarea>
                    <br></br>
                    <label>Documentos:  </label>
                    <input
                        type="file"
                        id="subirArchivosCorreos"
                        name="Subir documentos pdf"
                        onChange={null}>
                    </input>
                    <br></br>
                    <input
                        type="button"
                        className="cargarDocsCorreos"
                        value="Guardar"
                        onClick={null}>
                    </input>
                </div>
            </div>
        </Container>
    );
}

export default EdicionCorreos;