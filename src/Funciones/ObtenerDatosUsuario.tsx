import { useEffect, useState } from "react";

type Usuario = {
  _id: string;
  nombre: string;
  email: string;
  telefono?: string;
};

type Props = {
  usuario_id: string;
  onTelefonoObtenido: (telefono: string) => void;
};

const ObtenerDatosUsuario = ({ usuario_id, onTelefonoObtenido }: Props) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`https://glamperosapi.onrender.com/usuarios/${usuario_id}`);
        if (!response.ok) {
          throw new Error("Usuario no encontrado");
        }
        const data = await response.json();
        setUsuario(data);
        onTelefonoObtenido(data.telefono || "573125443396"); // 📞 Usa el teléfono o el predeterminado
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [usuario_id, onTelefonoObtenido]);

  if (loading) return <p>Cargando usuario...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!usuario) return <p>No se encontraron datos del usuario.</p>;

  return (
    <div>
      <h2>Información del Usuario</h2>
      <p><strong>ID:</strong> {usuario._id}</p>
      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Teléfono:</strong> {usuario.telefono || "573125443396"}</p>
    </div>
  );
};

export default ObtenerDatosUsuario;
