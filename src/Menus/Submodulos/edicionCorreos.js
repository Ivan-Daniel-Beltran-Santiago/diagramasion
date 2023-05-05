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

    //Colocar el valor del campo seleccionado en el area de texto para poder cambiarlo
    const ColocarMetadata = () => {
        var elemento = document.getElementById("seleccionMetadata");
        //console.log(elemento.options[elemento.selectedIndex].value)
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
                    <Requisito>Seleccione un documento en formato PDF</Requisito>
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