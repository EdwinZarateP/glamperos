import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from '../Inicio/index';
import Registrarse from '../Registrarse/index';
import CreacionGlamping from '../CreacionGlamping/index';
import ExplorarGlamping from '../ExplorarGlamping/index';
import ColeccionImagenes from '../ColeccionImagenes/index';
import ListaDeseos from '../ListaDeseos/index';
import EvaluacionFinal from '../EvaluacionFinal/index';
import Modificacion from '../Modificacion/index';
import GestionarCuenta from '../GestionarCuenta/index';
import EdicionGlamping from '../EdicionGlamping/index';
import EdicionPerfil from '../EdicionPerfil/index';
import Reservar from '../Reservar/index';
import Mensajes from '../Mensajes/index';
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
        <Route path="/ListaDeseos" element={<ListaDeseos />} />          
        <Route path="/Modificacion/:glampingId" element={<Modificacion />} />            
        <Route path="/EvaluacionFinal/:glampingId" element={<EvaluacionFinal />} />      
        <Route path="/GestionarCuenta/" element={<GestionarCuenta />} />   
        <Route path="/EdicionGlamping/:glampingId" element={<EdicionGlamping />} />
        <Route path="/EdicionPerfil/" element={<EdicionPerfil />} />
        <Route path="/Reservar/:glampingId/:fechaInicioReservada/:fechaFinReservada/:precioConTarifa/:TarifaGlamperos/:totalDias" element={<Reservar />} />
        <Route path="/Mensajes/:idReceptor" element={<Mensajes />} />        
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </Router>
    }
  />
  );
}

export default App;
