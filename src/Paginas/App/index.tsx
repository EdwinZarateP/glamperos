import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from '../Inicio/index';
import Registrarse from '../Registrarse/index';
import CreacionGlamping from '../CreacionGlamping/index';
import ExplorarGlamping from '../ExplorarGlamping/index';
import ColeccionImagenes from '../ColeccionImagenes/index';
import NoEncontrado from '../NoEncontrado/index';
import { ProveedorVariables } from '../../Contexto/index';
import './estilos.css';

const App: React.FC = () => {
  return (
    // Encerramos todo en el ProveedorVariables para que puedan acceder a ellas
    <ProveedorVariables 
      hijo={
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Registrarse" element={<Registrarse />} />  
        <Route path="/ExplorarGlamping/:glampingId/:fechaInicioUrl/:fechaFinUrl/:totalDiasUrl" element={<ExplorarGlamping />} />
        <Route path="/ColeccionImagenes/:glampingId" element={<ColeccionImagenes />} />
        <Route path="/CrearGlamping" element={<CreacionGlamping />} />  
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </Router>
    }
  />
  );
}

export default App;
