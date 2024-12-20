import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define libraries como una constante global
const libraries: Libraries = ["places"];

// Si quiere usar una variable de aquí en alguna parte de la App, siga estos pasos:
// 1. En el componente elegido, import { useContext } from 'react';
// 2. En el componente elegido, traiga el proveedor así: import { ContextoApp } from '../../Contexto/index'
// 3. Antes del return del componente, cree lo siguiente: const almacenVariables = useContext(ContextoApp)
// 4. Use la variable que desee del ProveedorVariables, por ejemplo: almacenVariables.esFavorito

type Libraries = string[];

// Definir la interfaz de Filtros
interface Filtros {
  precioFiltrado?: number[]; // Suponiendo que sea un array de números
}

//-------------------------------------------------------------------------------------
// 1. Define la interfaz para el contexto
//-------------------------------------------------------------------------------------


interface ContextProps {
  //usuario logeado
  idUsuario: string | null;
  setIdUsuario: (id: string | null) => void;
  logueado: boolean;
  setLogueado: (estado: boolean) => void;
  nombreUsuario: string;
  setNombreUsuario: Dispatch<SetStateAction<string>>;
  correoUsuario: string;
  setCorreoUsuario: Dispatch<SetStateAction<string>>;

  //Variables boolean
  siono: boolean;
  setSiono: Dispatch<SetStateAction<boolean>>;

  // Variables de tipo string
  nombreGlamping: string;
  setNombreGlamping: Dispatch<SetStateAction<string>>;
  descripcionGlamping: string;
  setDescripcionGlamping: Dispatch<SetStateAction<string>>;
  ciudad_departamento: string;
  setCiudad_departamento: Dispatch<SetStateAction<string>>;
  ciudad_Elegida: string;
  setCiudad_Elegida: Dispatch<SetStateAction<string>>;

  // Variables de tipo fecha
  fechaInicio: Date | null;
  setFechaInicio: Dispatch<SetStateAction<Date | null>>;
  fechaFin: Date | null;
  setFechaFin: Dispatch<SetStateAction<Date | null>>;

  // Variables de tipo número
  totalDias: number;
  setTotalDias: Dispatch<SetStateAction<number>>;
  precioPorNoche?: number;
  setPrecioPorNoche: Dispatch<SetStateAction<number | undefined>>;

  tarifaServicio?: number;
  setTarifaServicio: Dispatch<SetStateAction<number | undefined>>;
  totalSinImpuestos?: number;
  setTotalSinImpuestos: Dispatch<SetStateAction<number | undefined>>;

  // Variables de visitantes
  Cantidad_Adultos: number;
  setCantidad_Adultos: Dispatch<SetStateAction<number>>;
  Cantidad_Niños: number;
  setCantidad_Niños: Dispatch<SetStateAction<number>>;
  Cantidad_Bebes: number;
  setCantidad_Bebes: Dispatch<SetStateAction<number>>;
  Cantidad_Mascotas: number;
  setCantidad_Mascotas: Dispatch<SetStateAction<number>>;
  totalHuespedes: number;
  setTotalHuespedes: Dispatch<SetStateAction<number>>;
  
  //Paso 3 
  Cantidad_Huespedes: number;
  setCantidad_Huespedes: Dispatch<SetStateAction<number>>;
  Acepta_Mascotas: boolean;
  setAcepta_Mascotas: Dispatch<SetStateAction<boolean>>;

  // Estados para modales
  mostrarVisitantes: boolean;
  setMostrarVisitantes: Dispatch<SetStateAction<boolean>>;
  mostrarCalendario: boolean;
  setMostrarCalendario: Dispatch<SetStateAction<boolean>>;

  //Tipo de glamping
  tipoGlamping: string;
  setTipoGlamping: Dispatch<SetStateAction<string>>;

  //latitud y longitud
  latitud: number;
  setLatitud: Dispatch<SetStateAction<number>>;
  longitud: number;
  setLongitud: Dispatch<SetStateAction<number>>;
  ubicacion: string;
  setUbicacion: Dispatch<SetStateAction<string>>;

  // Imagenes puntuales del glamping
  imagenesSeleccionadas: string[];
  setImagenesSeleccionadas: Dispatch<SetStateAction<string[]>>;

  imagenesCargadas: File[];
  setImagenesCargadas: Dispatch<SetStateAction<File[]>>;

  // Mapas
  libraries: Libraries;

  //amenidades elegidas por el dueño
  amenidadesGlobal: string[];
  setAmenidadesGlobal: Dispatch<SetStateAction<string[]>>;

  //Carga de fotos y video
  videoSeleccionado: string;
  setVideoSeleccionado: Dispatch<SetStateAction<string>>;
  fotosSeleccionadas: string[]; // Array de URLs o rutas de fotos seleccionadas
  setFotosSeleccionadas: Dispatch<SetStateAction<string[]>>; // Para actualizar las fotos
  
  //Precios
  precioEstandar: number;
  setPrecioEstandar: React.Dispatch<React.SetStateAction<number>>;
  descuento: number;
  setDescuento: React.Dispatch<React.SetStateAction<number>>;

  // Filtros
  activarFiltros: boolean;
  setActivarFiltros: Dispatch<SetStateAction<boolean>>;
  filtros: Filtros;
  setFiltros: Dispatch<SetStateAction<Filtros>>;
  mostrarFiltros: boolean;
  setMostrarFiltros: Dispatch<SetStateAction<boolean>>;
  precioFiltrado: number[];
  setPrecioFiltrado: Dispatch<SetStateAction<number[]>>;
  tipoGlampingFiltrado: string | undefined;
  setTipoGlampingFiltrado: Dispatch<SetStateAction<string | undefined>>;
  
}

// Crea el contexto con un valor inicial undefined
export const ContextoApp = createContext<ContextProps | undefined>(undefined);

interface ProveedorVariablesProps {
  hijo: ReactNode;
}

//-------------------------------------------------------------------------------------
// 2. Proveedor de variables que utiliza el contexto
//-------------------------------------------------------------------------------------
export const ProveedorVariables: React.FC<ProveedorVariablesProps> = ({ hijo }) => {
  const [idUsuario, setIdUsuario] = useState<string | null>(null);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [logueado, setLogueado] = useState<boolean>(false);
  const [nombreGlamping, setNombreGlamping] = useState('');
  const [descripcionGlamping, setDescripcionGlamping] = useState('');
  const [ciudad_departamento, setCiudad_departamento] = useState('');
  const [ciudad_Elegida, setCiudad_Elegida] = useState('');
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaFin, setFechaFin] = useState<Date | null>(null);
  const [totalDias, setTotalDias] = useState<number>(1);
  const [precioPorNoche, setPrecioPorNoche] = useState<number | undefined>(undefined);
  const [tarifaServicio, setTarifaServicio] = useState<number | undefined>(undefined);
  const [totalSinImpuestos, setTotalSinImpuestos] = useState<number | undefined>(undefined);
  const [Cantidad_Adultos, setCantidad_Adultos] = useState<number>(1);
  const [Cantidad_Niños, setCantidad_Niños] = useState<number>(0);
  const [Cantidad_Bebes, setCantidad_Bebes] = useState<number>(0);
  const [Cantidad_Mascotas, setCantidad_Mascotas] = useState<number>(0);
  const [totalHuespedes, setTotalHuespedes] = useState<number>(1);
  const [Cantidad_Huespedes, setCantidad_Huespedes] = useState<number>(1);  // Nueva variable para cantidad de huéspedes
  const [Acepta_Mascotas, setAcepta_Mascotas] = useState<boolean>(false);  // Nueva variable para aceptar mascotas
  const [siono, setSiono] = useState<boolean>(false); 
  
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState<string[]>([]);
  const [imagenesCargadas, setImagenesCargadas] = useState<File[]>([]);
  const [videoSeleccionado, setVideoSeleccionado] = useState<string>('');

  // Estados para modales
  const [mostrarVisitantes, setMostrarVisitantes] = useState<boolean>(false);
  const [mostrarCalendario, setMostrarCalendario] = useState<boolean>(false);

  //Tipo de glamping
  const [tipoGlamping, setTipoGlamping] = useState<string>('');

  //latitud y longitud
  const [latitud, setLatitud] = useState<number>(4.123456); // Estado predeterminado de latitud
  const [longitud, setLongitud] = useState<number>(-74.123456); // Estado predeterminado de longitud
  const [ubicacion, setUbicacion] = useState<string>('');

  //amenidades elegidas por el dueño
  const [amenidadesGlobal, setAmenidadesGlobal] = useState<string[]>([]);

  // Estado para el fotos
  const [fotosSeleccionadas, setFotosSeleccionadas] = useState<string[]>([]);

  //precios
  const [precioEstandar, setPrecioEstandar] = useState<number>(0);
  const [descuento, setDescuento] = useState<number>(0);
  
  // Estado para filtros
  const [activarFiltros, setActivarFiltros] = useState<boolean>(false);
  const [filtros, setFiltros] = useState<Filtros>({});
  const [mostrarFiltros, setMostrarFiltros] = useState<boolean>(false);
  const [precioFiltrado, setPrecioFiltrado] = useState<number[]>([100000,1000000]);
  const [tipoGlampingFiltrado, setTipoGlampingFiltrado] = useState<string | undefined>(undefined);

//-------------------------------------------------------------------------------------
// 3.  Nombra las variables
//-------------------------------------------------------------------------------------

  const contextValue: ContextProps = {
    idUsuario, 
    setIdUsuario,
    logueado,
    setLogueado,
    nombreUsuario,
    setNombreUsuario,
    correoUsuario,
    setCorreoUsuario,
    siono,
    setSiono,    
    nombreGlamping,
    setNombreGlamping,
    descripcionGlamping,
    setDescripcionGlamping,
    ciudad_departamento,
    setCiudad_departamento,
    ciudad_Elegida,
    setCiudad_Elegida,
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    totalDias,
    setTotalDias,
    precioPorNoche,
    setPrecioPorNoche,
    tarifaServicio,
    setTarifaServicio,
    totalSinImpuestos,
    setTotalSinImpuestos,
    Cantidad_Adultos,
    setCantidad_Adultos,
    Cantidad_Niños,
    setCantidad_Niños,
    Cantidad_Bebes,
    setCantidad_Bebes,
    Cantidad_Mascotas,
    setCantidad_Mascotas,
    totalHuespedes,
    setTotalHuespedes,
    Cantidad_Huespedes,
    setCantidad_Huespedes,
    Acepta_Mascotas,
    setAcepta_Mascotas,
    mostrarVisitantes,
    setMostrarVisitantes,
    mostrarCalendario,
    setMostrarCalendario,
    tipoGlamping,
    setTipoGlamping,
    latitud,
    setLatitud,
    longitud,
    setLongitud,
    ubicacion,
    setUbicacion,
    imagenesSeleccionadas,
    setImagenesSeleccionadas,
    imagenesCargadas, 
    setImagenesCargadas,
    libraries,
    amenidadesGlobal,
    setAmenidadesGlobal,
    videoSeleccionado,
    setVideoSeleccionado,
    fotosSeleccionadas,
    setFotosSeleccionadas,
    precioEstandar,
    setPrecioEstandar,
    descuento,
    setDescuento,
    activarFiltros,
    setActivarFiltros,
    filtros,
    setFiltros,
    mostrarFiltros, 
    setMostrarFiltros,
    precioFiltrado,
    setPrecioFiltrado,
    tipoGlampingFiltrado,
    setTipoGlampingFiltrado
  };

  return <ContextoApp.Provider value={contextValue}>{hijo}</ContextoApp.Provider>;
};
