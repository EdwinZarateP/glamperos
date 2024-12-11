
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ContextoApp } from '../../../Contexto/index';

import "./estilos.css";

const guardarGlampingP: React.FC = () => {
  const [formulario, setFormulario] = useState({
    nombreGlamping: "",
    tipoGlamping: "",
    Acepta_Mascotas: false,
    ubicacion: "", // Ubicación se llenará automáticamente
    precioEstandar: 0,
    Cantidad_Huespedes: 1,
    descuento: 0,
    descripcionGlamping: "",
    amenidadesGlobal: "",
    ciudad_departamento: "",
    video_youtube: "",
    propietario_id: "",
  });

  const { ubicacion,ciudad_departamento, imagenesCargadas, tipoGlamping,Cantidad_Huespedes, Acepta_Mascotas, amenidadesGlobal, videoSeleccionado, nombreGlamping, descripcionGlamping, precioEstandar, descuento} = useContext(ContextoApp)!; // Obtenemos la ubicación y las imágenes desde el contexto
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Sincroniza la ubicación automáticamente al formulario cuando la variable global cambia
  useEffect(() => {
    if (ubicacion) {
      setFormulario((prev) => ({
        ...prev,
        ubicacion, // Actualizamos la ubicación directamente
      }));
    }
  }, [ubicacion]);

   // Sincroniza la ciudad_departamento automáticamente al formulario cuando la variable global cambia
   useEffect(() => {
    if (ciudad_departamento) {
      setFormulario((prev) => ({
        ...prev,
        ciudad_departamento, // Actualizamos la ciudad_departamento directamente
      }));
    }
  }, [ciudad_departamento]);

    // Sincroniza la tipoGlamping automáticamente al formulario cuando la variable global cambia
    useEffect(() => {
      if (tipoGlamping) {
        setFormulario((prev) => ({
          ...prev,
          tipoGlamping, // Actualizamos la tipoGlamping directamente
        }));
      }
    }, [tipoGlamping]);

    // Sincroniza la Cantidad_Huespedes automáticamente al formulario cuando la variable global cambia
    useEffect(() => {
      if (Cantidad_Huespedes) {
        setFormulario((prev) => ({
          ...prev,
          Cantidad_Huespedes, // Actualizamos la Cantidad_Huespedes directamente
        }));
      }
    }, [Cantidad_Huespedes]);

      // Sincroniza la Acepta_Mascotas automáticamente al formulario cuando la variable global cambia
      useEffect(() => {
        if (Acepta_Mascotas) {
          setFormulario((prev) => ({
            ...prev,
            Acepta_Mascotas, // Actualizamos la Acepta_Mascotas directamente
          }));
        }
      }, [Acepta_Mascotas]);

      // Sincroniza la nombreGlamping automáticamente al formulario cuando la variable global cambia
      useEffect(() => {
        if (nombreGlamping) {
          setFormulario((prev) => ({
            ...prev,
            nombreGlamping, // Actualizamos la nombreGlamping directamente
          }));
        }
      }, [nombreGlamping]);

      // Sincroniza la descripcionGlamping automáticamente al formulario cuando la variable global cambia
      useEffect(() => {
        if (descripcionGlamping) {
          setFormulario((prev) => ({
            ...prev,
            descripcionGlamping, // Actualizamos la descripcionGlamping directamente
          }));
        }
      }, [descripcionGlamping]);

      // Sincroniza la precioEstandar automáticamente al formulario cuando la variable global cambia
      useEffect(() => {
        if (typeof precioEstandar === 'number') {
          setFormulario((prev) => ({
            ...prev,
            precioEstandar, // Actualizamos la precioEstandar directamente
          }));
        }
      }, [precioEstandar]);

      // Sincroniza la descuento automáticamente al formulario cuando la variable global cambia
      useEffect(() => {
        if (typeof descuento === 'number') {
          setFormulario((prev) => ({
            ...prev,
            descuento, // Actualizamos la descuento directamente
          }));
        }
      }, [descuento]);
      

      // Añadir un nuevo useEffect para sincronizar "amenidadesGlobal" automáticamente al formulario cuando cambia
      useEffect(() => {
        if (amenidadesGlobal) {
          setFormulario((prev) => ({
            ...prev,
            amenidadesGlobal: amenidadesGlobal.join(", "), // Actualizamos "amenidadesGlobal" como un string separado por comas
          }));
        }
      }, [amenidadesGlobal]);

      // Sincroniza la videoSeleccionado automáticamente al formulario cuando la variable global cambia
      useEffect(() => {
        if (videoSeleccionado) {
          setFormulario((prev) => ({
            ...prev,
            video_youtube: videoSeleccionado|| "", // Actualizamos la videoSeleccionado directamente o lo mandamos vacio
          }));
        }
      }, [videoSeleccionado]);
  
      // Sincroniza la Cantidad_Huespedes automáticamente al formulario cuando la variable global cambia
      useEffect(() => {
        if (Cantidad_Huespedes) {
          setFormulario((prev) => ({
            ...prev,
            Cantidad_Huespedes, // Actualizamos la Cantidad_Huespedes directamente
          }));
        }
      }, [Cantidad_Huespedes]);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setFormulario({
        ...formulario,
        [name]: e.target.checked,
      });
    } else {
      setFormulario({
        ...formulario,
        [name]: value,
      });
    }
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje("");

    const formData = new FormData();
    Object.entries(formulario).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    
    // Adjuntamos las imágenes del contexto en el FormData
    imagenesCargadas.forEach((imagen) => formData.append("imagenes", imagen));

    try {
      const respuesta = await axios.post("https://glamperosapi.onrender.com/glampings/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMensaje("Glamping creado con éxito: " + respuesta.data.nombreGlamping);
    } catch (error) {
      setMensaje("Error al crear el glamping: " + error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="guardarGlampingP-contenedor">
      <h1 className="guardarGlampingP-titulo">Crear Nuevo Glamping</h1>
      <form className="guardarGlampingP-formulario" onSubmit={manejarEnvio}>

             
        <label className="guardarGlampingP-label">
          ID del Propietario:
          <input
            type="text"
            name="propietario_id"
            value={formulario.propietario_id}
            onChange={manejarCambio}
            className="guardarGlampingP-input"
            required
          />
        </label>

        <button type="submit" className="guardarGlampingP-boton" disabled={cargando}>
          {cargando ? "Enviando..." : "Crear Glamping"}
        </button>
      </form>

      {mensaje && <p className="guardarGlampingP-mensaje">{mensaje}</p>}
    </div>
  );
};

export default guardarGlampingP;