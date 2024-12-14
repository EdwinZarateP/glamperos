
import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ContextoApp } from '../../../Contexto/index';
import confetti from 'canvas-confetti'; 
import Lottie from "lottie-react"; 
import animationData from "../../../Imagenes/Animation.json"; // Ruta del archivo JSON
import "./estilos.css";

const guardarGlampingP: React.FC = () => {
  const navigate = useNavigate();
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

  const { ubicacion,ciudad_departamento, imagenesCargadas, tipoGlamping,Cantidad_Huespedes, Acepta_Mascotas, amenidadesGlobal, videoSeleccionado, nombreGlamping, descripcionGlamping, precioEstandar, descuento, idUsuario, correoUsuario} = useContext(ContextoApp)!; 
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const enviarCorreo = async (correo: string) => {
    try {
      await axios.post("https://glamperosapi.onrender.com/correos/send-email", { correo });
      console.log("Correo enviado con éxito");
    } catch (error) {
      console.error("Error al enviar el correo: ", error);
    }
  };
  

  // Sincroniza la idUsuario automáticamente al formulario cuando la variable global cambia
  useEffect(() => {
    if (idUsuario) {
      setFormulario((prev) => ({
        ...prev,
        propietario_id: idUsuario, // Actualizamos la idUsuario directamente
      }));
    }
  }, [idUsuario]);

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
  
    // Referencia al botón "Cerrar"
  const cerrarPopupRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (showPopup && cerrarPopupRef.current) {
      cerrarPopupRef.current.focus(); // Coloca el foco en el botón "Cerrar" cuando se activa el popup
    }
  }, [showPopup]);

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
      lanzarConfetti();
      setShowPopup(true);
      // Llamar a la función para enviar correo
      enviarCorreo(correoUsuario);
    } catch (error) {
      setMensaje("Error al crear el glamping: " + error);
    } finally {
      setCargando(false);
    }
  };

  // Función para lanzar confetti (explosión)
  const lanzarConfetti = () => {
    confetti({
      particleCount: 400, // Número de piezas de confeti
      spread: 70,         // Ángulo de dispersión
      origin: { y: 0.6 }, // Ajuste para la altura de la explosión
    });
  };

  const cerrarPopup = () => {
    setShowPopup(false); // Cierra el popup
    setTimeout(() => {
      navigate("/"); // Navega a la nueva página después de un breve retraso
    }, 50); // 50 ms de retraso (puedes ajustar este valor si es necesario)
  };
  

  return (
    <div className="guardarGlampingP-contenedor">
      <h1 className="guardarGlampingP-titulo">¡Ya casi eres parte de nuestra familia Glamperos!😊</h1>
      <p>Puedes dar pasos atrás y cambiar cualquier cosa antes de dar clic en "Terminar"</p>
      
      <form className="guardarGlampingP-formulario" onSubmit={manejarEnvio}>
      <button type="submit" className="guardarGlampingP-boton">
        {cargando ? (
          <div className="lottie-container" style={{ background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>            
            <Lottie 
              animationData={defaultOptions.animationData} 
              loop={defaultOptions.loop}
              autoplay={defaultOptions.autoplay} 
              style={{ width: 200, height: 200 }}  
            />
            <p className="cargando-mensaje">Estamos creando tu glamping...</p>
          </div>
        ) : (
          "Terminar"
        )}
      </button>

      </form>
  
      {mensaje && <p className="guardarGlampingP-mensaje">{mensaje}</p>}
  
      {showPopup && (
        <div className="popup-felicitaciones">
          <div className="popup-contenido">
            <h2>¡Felicitaciones!</h2>
            <p>Tu glamping se creó con éxito. 🎉</p>
            <button className="cerrar-popup" onClick={cerrarPopup} ref={cerrarPopupRef}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );  
};

export default guardarGlampingP;