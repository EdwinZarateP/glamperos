import axios from "axios";

export const GuardarGlamping = async ({
  ubicacion,
  ciudad_departamento,
  imagenesCargadas,
  tipoGlamping,
  Cantidad_Huespedes,
  Acepta_Mascotas,
  amenidadesGlobal,
  videoSeleccionado,
  nombreGlamping,
  descripcionGlamping,
  precioEstandar,
  descuento,
  idUsuario,
}: {
  ubicacion: string;
  ciudad_departamento: string;
  imagenesCargadas: File[];
  tipoGlamping: string;
  Cantidad_Huespedes: number;
  Acepta_Mascotas: boolean;
  amenidadesGlobal: string[];
  videoSeleccionado: string;
  nombreGlamping: string;
  descripcionGlamping: string;
  precioEstandar: number;
  descuento: number;
  idUsuario: string;
}) => {
  const formulario = new FormData();
  
  // Agregamos las propiedades al formulario
  formulario.append("nombreGlamping", nombreGlamping);
  formulario.append("tipoGlamping", tipoGlamping);
  formulario.append("Acepta_Mascotas", Acepta_Mascotas.toString());
  formulario.append("ubicacion", ubicacion);
  formulario.append("precioEstandar", precioEstandar.toString());
  formulario.append("Cantidad_Huespedes", Cantidad_Huespedes.toString());
  formulario.append("descuento", descuento.toString());
  formulario.append("descripcionGlamping", descripcionGlamping);
  formulario.append("amenidadesGlobal", amenidadesGlobal.join(", "));
  formulario.append("ciudad_departamento", ciudad_departamento);
  formulario.append("video_youtube", videoSeleccionado);
  formulario.append("propietario_id", idUsuario);

  // Adjuntamos las imágenes
  imagenesCargadas.forEach((imagen) => formulario.append("imagenes", imagen));

  try {
    const respuesta = await axios.post(
      "https://glamperosapi.onrender.com/glampings/",
      formulario,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return { exito: true, mensaje: "Glamping creado con éxito: " + respuesta.data.nombreGlamping };
  } catch (error) {
    return { exito: false, mensaje: "Error al crear el glamping: " + error };
  }
};
