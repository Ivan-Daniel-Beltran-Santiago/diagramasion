export default class ServerConnectionConfig {
  constructor() {
    this.host = "http://localhost"; //Cambiar en producción
    this.port = "3001"; //Cambiar en producción
  }

  getServer() {
    return this.host + ":" + this.port;
  }
}
