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
  estaAbiertoAlgo: boolean; // Variable booleana para manejar estados de apertura/cierre
  setEstaAbiertoAlgo: Dispatch<SetStateAction<boolean>>;
  abrirAlgo: () => void; // Función para abrir algo
  cerrarAlgo: () => void; // Función para cerrar algo

  // Variables de tipo string
  nombre: string; // Variable para almacenar un nombre
  setNombre: Dispatch<SetStateAction<string>>;

  // Variables de tipo fecha
  fechaInicio: Date | null; // Fecha de inicio seleccionada
  setFechaInicio: Dispatch<SetStateAction<Date | null>>;
  fechaFin: Date | null; // Fecha de fin seleccionada
  setFechaFin: Dispatch<SetStateAction<Date | null>>;

  // Variables de tipo número
  totalDias: number; // Total de días seleccionados
  setTotalDias: Dispatch<SetStateAction<number>>;
  precioPorNoche?: number; // Precio por noche (opcional)
  setPrecioPorNoche: Dispatch<SetStateAction<number | undefined>>;

  // Tarifa de servicio (opcional)
  tarifaServicio?: number; // Tarifa adicional al precio por noche
  setTarifaServicio: Dispatch<SetStateAction<number | undefined>>;

  // Total sin impuestos
  totalSinImpuestos?: number; // Total antes de aplicar impuestos
  setTotalSinImpuestos: Dispatch<SetStateAction<number | undefined>>;

  // Variables de visitantes
  Cantidad_Adultos: number; // Cantidad de adultos seleccionados
  setCantidad_Adultos: Dispatch<SetStateAction<number>>;
  Cantidad_Niños: number; // Cantidad de niños seleccionados
  setCantidad_Niños: Dispatch<SetStateAction<number>>;
  Cantidad_Bebes: number; // Cantidad de bebés seleccionados
  setCantidad_Bebes: Dispatch<SetStateAction<number>>;
  Cantidad_Mascotas: number; // Cantidad de mascotas seleccionadas
  setCantidad_Mascotas: Dispatch<SetStateAction<number>>;
}

// Crea el contexto con un valor inicial undefined
export const ContextoApp = createContext<ContextProps | undefined>(undefined);

// Props para el proveedor de variables
interface ProveedorVariablesProps {
  hijo: ReactNode; // Nodo hijo que será envuelto por el proveedor
}

//-------------------------------------------------------------------------------------
// 2. Proveedor de variables que utiliza el contexto
//-------------------------------------------------------------------------------------
export const ProveedorVariables: React.FC<ProveedorVariablesProps> = ({ hijo }) => {
  // Estado para abrir y cerrar el "Algo"
  const [estaAbiertoAlgo, setEstaAbiertoAlgo] = useState(false);
  const abrirAlgo = () => setEstaAbiertoAlgo(true); // Abre el estado
  const cerrarAlgo = () => setEstaAbiertoAlgo(false); // Cierra el estado

  // Estados para las variables de tipo string
  const [nombre, setNombre] = useState(''); // Almacena un nombre genérico

  // Estados para fechas
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null); // Fecha de inicio seleccionada
  const [fechaFin, setFechaFin] = useState<Date | null>(null); // Fecha de fin seleccionada

  // Estado para el total de días seleccionados
  const [totalDias, setTotalDias] = useState<number>(0);

  // Estado para el precio por noche
  const [precioPorNoche, setPrecioPorNoche] = useState<number | undefined>(undefined);

  // Estado para la tarifa de servicio (opcional)
  const [tarifaServicio, setTarifaServicio] = useState<number | undefined>(undefined);

  // Estado para el total sin impuestos
  const [totalSinImpuestos, setTotalSinImpuestos] = useState<number | undefined>(undefined);

  // Estados para las cantidades de visitantes
  const [Cantidad_Adultos, setCantidad_Adultos] = useState<number>(0); // Adultos
  const [Cantidad_Niños, setCantidad_Niños] = useState<number>(0); // Niños
  const [Cantidad_Bebes, setCantidad_Bebes] = useState<number>(0); // Bebés
  const [Cantidad_Mascotas, setCantidad_Mascotas] = useState<number>(0); // Mascotas

  //-------------------------------------------------------------------------------------
  // 3. Crea el objeto de contexto con los valores y funciones necesarios que quieres proveer
  //-------------------------------------------------------------------------------------
   const contextValue: ContextProps = {
    // Manejo de apertura y cierre
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

    // Cantidades de visitantes
    Cantidad_Adultos,
    setCantidad_Adultos,
    Cantidad_Niños,
    setCantidad_Niños,
    Cantidad_Bebes,
    setCantidad_Bebes,
    Cantidad_Mascotas,
    setCantidad_Mascotas,
  };

  
  // Renderiza el proveedor de contexto con el valor proporcionado
  return (
    <ContextoApp.Provider value={contextValue}>
      {hijo}
    </ContextoApp.Provider>
  );
};
