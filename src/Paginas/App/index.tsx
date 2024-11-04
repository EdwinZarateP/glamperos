import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from '../Inicio/index';
import NoEncontrado from '../NoEncontrado/index';
import { ProveedorVariables } from '../../Contexto/index';
import './estilos.css';

const App: React.FC = () => {
  return (
    // Encerramos todo en el ProveedorVariables para que puedan acceder a ellas
    <ProveedorVariables 
      hijo={
    <Router basename="/glamperos">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </Router>
    }
  />
  );
}

export default App;
