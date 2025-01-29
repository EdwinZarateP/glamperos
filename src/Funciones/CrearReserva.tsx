// api.ts
export interface Reserva {
    idCliente: string;
    idPropietario:string;
    idGlamping: string;
    FechaIngreso: string; // Formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
    FechaSalida: string;  // Formato ISO
    Noches: number;
    ValorReserva: number;
    CostoGlamping: number;
    ComisionGlamperos: number;
    adultos: number;
    Ninos: number;
    bebes: number;
    mascotas: number;
    EstadoReserva: string;
  }
  
  export async function crearReserva(reserva: Reserva): Promise<any> {
    const API_URL = "https://glamperosapi.onrender.com/reservas";
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reserva),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      throw error;
    }
  }
  