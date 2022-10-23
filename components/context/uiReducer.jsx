export const uiReducer = (state, accion) => {
  switch (accion) {
    case "solicitud":
      return {
        ...state,
        variable: "solicitud",
      };
    case "listar_solicitud":
      return {
        ...state,
        variable: "listar_solicitud",
      };
    case "inmueble_crear":
      return {
        ...state,
        variable: "inmueble_crear",
      };
    case "inmueble_listar":
      return {
        ...state,
        variable: "inmueble_listar",
      };
    case "crear-solicitud":
      return {
        ...state,
        variable: "crear-solicitud",
      };
    case 3:
      return {
        ...state,
        variable: 3,
      };
    default:
      return state;
  }
};
