export default class ConfigurarConexion {
    constructor() {
        this.host = "http://localhost"; //Cambiar en producción
        this.port = "3001"; //Cambiar en producción
    }

    obtenerServidor() {
        return this.host + ":" + this.port;
    }
}
