import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Si quiere usar una variable de aquí en alguna parte de la App, siga estos pasos:
// 1. En el componente elegido, import { useContext } from 'react';
// 2. En el componente elegido, traiga el proveedor así: import { ContextoApp } from '../../Contexto/index'
// 3. Antes del return del componente, cree lo siguiente: const almacenVariables = useContext(ContextoApp)
// 4. Use la variable que desee del ProveedorVariables, por ejemplo: almacenVariables.esFavorito

//-------------------------------------------------------------------------------------
// 1. Define la interfaz para el contexto
//-------------------------------------------------------------------------------------
interface ContextProps {
  // Abrir o cerrar cosas
  estaAbiertoAlgo: boolean;
  setEstaAbiertoAlgo: Dispatch<SetStateAction<boolean>>;
  abrirAlgo: () => void;
  cerrarAlgo: () => void;

  // Variables de tipo string
  nombreGlamping: string;
  setNombreGlamping: Dispatch<SetStateAction<string>>;
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

  // Estados para modales
  mostrarVisitantes: boolean;
  setMostrarVisitantes: Dispatch<SetStateAction<boolean>>;
  mostrarCalendario: boolean;
  setMostrarCalendario: Dispatch<SetStateAction<boolean>>;
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
  const [estaAbiertoAlgo, setEstaAbiertoAlgo] = useState(false);
  const abrirAlgo = () => setEstaAbiertoAlgo(true);
  const cerrarAlgo = () => setEstaAbiertoAlgo(false);

  const [nombreGlamping, setNombreGlamping] = useState('');
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

  // Estados para modales
  const [mostrarVisitantes, setMostrarVisitantes] = useState<boolean>(false);
  const [mostrarCalendario, setMostrarCalendario] = useState<boolean>(false);

  const contextValue: ContextProps = {
    estaAbiertoAlgo,
    setEstaAbiertoAlgo,
    abrirAlgo,
    cerrarAlgo,
    nombreGlamping,
    setNombreGlamping,
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
    mostrarVisitantes,
    setMostrarVisitantes,
    mostrarCalendario,
    setMostrarCalendario,
  };

  return <ContextoApp.Provider value={contextValue}>{hijo}</ContextoApp.Provider>;
};
