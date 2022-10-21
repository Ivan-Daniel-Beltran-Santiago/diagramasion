class ButtonValues {
  constructor() {
    this.Text = {
      1: "Bienvenida",
      2: "Administración de solicitudes",
      3: "Vista de solicitud",
      4: "Documentos de la solicitud",
      5: "Administración general",
      6: "Información de usuario",
      7: "Bienvenida",
      8: "Trámites",
      9: "Solicitud activa",
      10: "Información de usuario",
    };
    this.Redirection = {
      1: null,
      2: null,
      3: "/Menu-Solicitud",
      4: "/Menu-Solicitud",
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
    };
  }
}

export default ButtonValues;
