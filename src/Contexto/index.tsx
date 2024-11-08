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
    
  };
  
  // Renderiza el proveedor de contexto con el valor proporcionado
  return (
    <ContextoApp.Provider value={contextValue}>
      {hijo}
    </ContextoApp.Provider>
  );
};
