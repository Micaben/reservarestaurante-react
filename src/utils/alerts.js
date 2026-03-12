import Swal from "sweetalert2";

export const alertaError = (mensaje) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
    confirmButtonColor: "#b30000"
  });
};

export const alertaOk = (mensaje) => {
  Swal.fire({
    icon: "success",
    title: "Correcto",
    text: mensaje,
    confirmButtonColor: "#b30000"
  });
};

export const alertaInfo = (mensaje) => {
  Swal.fire({
    icon: "info",
    title: "Información",
    text: mensaje,
    confirmButtonColor: "#b30000"
  });
};