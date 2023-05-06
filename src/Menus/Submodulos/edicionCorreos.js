import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { Toast } from "primereact/toast";
import axios from "axios";
import ServerConnectionConfig from "../../Controller/ServerConnectionConfig";


const Container = styled.div`padding: 1em;`;
const Requisito = styled.label`color: gray; font-size: 12px`

function EdicionCorreos() {
    //Variables de entorno
    const [listaCorreos, setListaCorreos] = useState([]);
    const [titulos, setTitulos] = useState({
        0: "Correo de inicio",
        1: "Correo de seguimiento"
    });

    //Obtener todos los correos, para colocarlos en el botón de selección
    const ObtenerCorreos = () => {
        const srvDir = new ServerConnectionConfig();
        const srvReq = srvDir.getServer() + "/ObtenerListaJSON";
        axios
            .get(srvReq)
            .then((response) => {
                //Se añaden todos los trámites a el arreglo
                if (response.data.Code == 0) {
                    console.log("el codigo fue 0")
                }
                else {
                    //console.log(response.data)
                    setListaCorreos(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
                showToast(
                    "error",
                    "Listado de Correos",
                    "Ha ocurrido un error al obtener los correos, por favor contacte al administrador del sistema."
                );
            });
    };

    const guardarCorreo = () => {
        const srvDir = new ServerConnectionConfig();
        const srvReq = srvDir.getServer() + "/ModificarJSON";
        try {
            var elemento = document.getElementById("seleccionMetadata");
            var ID_Metadata = elemento.options[elemento.selectedIndex].value;
            let cuerpo = document.getElementById("cuerpoCorreo").value;
            let destinatario = document.getElementById("correoDestinatario").value;
            let asunto = document.getElementById("asunto").value;
            let adjuntos = "Archivos Adjuntos";
            let nombre_a = "";

            if (ID_Metadata !== "Seleccionar") {
                switch (ID_Metadata) {
                    case "0":
                        nombre_a = "inicio.json"
                        break;
                    case "1":
                        nombre_a = "seguimiento.json"
                        break;
                    default:
                        break;
                }
                axios
                    .post(srvReq, {
                        Cuerpo: cuerpo,
                        Destinatario: destinatario,
                        Asunto: asunto,
                        Adjuntos: adjuntos,
                        nombreArchivo: nombre_a
                    })
                    .then((result) => {
                        if (result.data.Code === 1) {
                            showToast(
                                "success",
                                "Actualizado",
                                "Los cambios han sido guardados"
                            );
                        }
                        else {
                            showToast(
                                "error",
                                "Error",
                                "Los cambios no han sido guardados"
                            );
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            if (ID_Metadata === "Seleccionar") {
                showToast(
                    "error",
                    "Error",
                    "Seleccione una opcion"
                );
            }
        } catch (exception) {
            showToast(
                "error",
                "Inicios de sesión",
                "Ha ocurrido un error inesperado." + exception
            );
        }
    };

    //Colocar el valor del campo seleccionado en el area de texto para poder cambiarlo
    const ColocarMetadata = () => {
        var elemento = document.getElementById("seleccionMetadata");
        console.log(elemento.options[elemento.selectedIndex].value)
        var ID_Metadata = elemento.options[elemento.selectedIndex].value;
        if (ID_Metadata !== "Seleccionar") {
            document.getElementById("asunto").value = listaCorreos[ID_Metadata].asunto;
            document.getElementById("correoDestinatario").value = listaCorreos[ID_Metadata].destinatario;
            document.getElementById("cuerpoCorreo").value = listaCorreos[ID_Metadata].cuerpo;
        }
        if (ID_Metadata === "Seleccionar") {
            document.getElementById("asunto").value = "";
            document.getElementById("correoDestinatario").value = "";
            document.getElementById("cuerpoCorreo").value = "";
        }
    };

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

    const showToast = (severityValue, summaryValue, detailValue) => {
        toast.current.show({
            closable: false,
            life: 5000,
            severity: severityValue,
            summary: summaryValue,
            detail: detailValue,
        });
    };

    //Funcion que carga lo interno al renderizar
    useEffect(() => {
        ObtenerCorreos();
        ObtenerCorreos();
        console.log(listaCorreos);
    }, []);

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
                            id="seleccionMetadata"
                            onChange={ColocarMetadata}>
                            <option id="Seleccionar">Seleccionar</option>
                            <option value="0">
                                {titulos[0]}
                            </option>
                            <option value="1">
                                {titulos[1]}
                            </option>
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
                <input
                    type="submit"
                    className="guardarCorreo"
                    value="Guardar Cambios"
                    onClick={guardarCorreo}>
                </input>
            </div>
        </Container>
    );
}
export default EdicionCorreos;