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
  nombre: string;
  setNombre: Dispatch<SetStateAction<string>>;

  // Variables de tipo fecha
  fechaInicio: Date | null;
  setFechaInicio: Dispatch<SetStateAction<Date | null>>;
  fechaFin: Date | null;
  setFechaFin: Dispatch<SetStateAction<Date | null>>;

  // Variables de tipo número
  totalDias: number;
  setTotalDias: Dispatch<SetStateAction<number>>;
  precioPorNoche?: number; // Precio por noche (opcional)
  setPrecioPorNoche: Dispatch<SetStateAction<number | undefined>>;

  // Tarifa de servicio (opcional)
  tarifaServicio?: number;
  setTarifaServicio: Dispatch<SetStateAction<number | undefined>>;

  // Total sin impuestos
  totalSinImpuestos?: number;
  setTotalSinImpuestos: Dispatch<SetStateAction<number | undefined>>;
}

// Crea el contexto con un valor inicial undefined
export const ContextoApp = createContext<ContextProps | undefined>(undefined);

// Props para el proveedor de variables
interface ProveedorVariablesProps {
  hijo: ReactNode;
}

//-------------------------------------------------------------------------------------
// 2. Proveedor de variables que utiliza el contexto
//-------------------------------------------------------------------------------------

export const ProveedorVariables: React.FC<ProveedorVariablesProps> = ({ hijo }) => {
  
  // Estado para abrir y cerrar el Algo
  const [estaAbiertoAlgo, setEstaAbiertoAlgo] = useState(false);
  const abrirAlgo = () => setEstaAbiertoAlgo(true);
  const cerrarAlgo = () => setEstaAbiertoAlgo(false);

  // Estados para las variables de tipo string
  const [nombre, setNombre] = useState('');

  // Estados para fechas
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaFin, setFechaFin] = useState<Date | null>(null);

  // Estado para el total de días
  const [totalDias, setTotalDias] = useState<number>(0);

  // Estado para el precio por noche
  const [precioPorNoche, setPrecioPorNoche] = useState<number | undefined>(undefined);

  // Estado para la tarifa de servicio
  const [tarifaServicio, setTarifaServicio] = useState<number | undefined>(undefined);

  // Estado para el total sin impuestos
  const [totalSinImpuestos, setTotalSinImpuestos] = useState<number | undefined>(undefined);

  //-------------------------------------------------------------------------------------
  // 3. Crea el objeto de contexto con los valores y funciones necesarios que quieres proveer
  //-------------------------------------------------------------------------------------
  
  const contextValue: ContextProps = {
    estaAbiertoAlgo,
    setEstaAbiertoAlgo,
    abrirAlgo,
    cerrarAlgo,
    
    // Variables de tipo string
    nombre,
    setNombre,

    // Variables de tipo fecha
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,

    // Variables de tipo número
    totalDias,
    setTotalDias,
    precioPorNoche,
    setPrecioPorNoche,

    // Tarifa de servicio
    tarifaServicio,
    setTarifaServicio,

    // Total sin impuestos
    totalSinImpuestos,
    setTotalSinImpuestos,
  };
  
  // Renderiza el proveedor de contexto con el valor proporcionado
  return (
    <ContextoApp.Provider value={contextValue}>
      {hijo}
    </ContextoApp.Provider>
  );
};
