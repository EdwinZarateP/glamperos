export async function obtenerGlampingPorId(glampingId: string) {
    try {
      const respuesta = await fetch(`https://glamperosapi.onrender.com/glampings/${glampingId}`);
  
      if (!respuesta.ok) {
        throw new Error("Error al obtener la información del glamping.");
      }
  
      const datos = await respuesta.json();
      return datos;
    } catch (error) {
      console.error("Error en la llamada a la API:", error);
      return null;
    }
  }
  