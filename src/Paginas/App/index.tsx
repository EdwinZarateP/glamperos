import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from '../Inicio/index';
import Registrarse from '../Registrarse/index';
import CreacionGlamping from '../CreacionGlamping/index';
import ExplorarGlamping from '../ExplorarGlamping/index';
import ColeccionImagenes from '../ColeccionImagenes/index';
import ListaDeseos from '../ListaDeseos/index';
import Modificacion from '../Modificacion/index';
import GestionarCuenta from '../GestionarCuenta/index';
import EdicionGlamping from '../EdicionGlamping/index';
import EdicionPerfil from '../EdicionPerfil/index';
import Reservar from '../Reservar/index';
import Mensajes from '../Mensajes/index';
import MensajesIndividuales from '../MensajesIndividuales/index';
import ReservasPropiedades from '../ReservasPropiedades/index';
import ReservasClientes from '../ReservasClientes/index';
import GestionarReserva from '../GestionarReserva/index';
import Ayuda from '../Ayuda/index';
import Gracias from '../Gracias/index';
import DatosEmpresariales from '../DatosEmpresariales/index';
import GestionBancos from '../GestionBancos/index';
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
        <Route path="/ExplorarGlamping/:glampingId/:fechaInicioUrl/:fechaFinUrl/:totalDiasUrl/:totalAdultosUrl/:totalNinosUrl/:totalBebesUrl/:totalMascotasUrl" element={<ExplorarGlamping />} />
        <Route path="/ColeccionImagenes/:glampingId" element={<ColeccionImagenes />} />
        <Route path="/CrearGlamping" element={<CreacionGlamping />} />  
        <Route path="/ListaDeseos" element={<ListaDeseos />} />          
        <Route path="/Modificacion/:glampingId" element={<Modificacion />} />            
        <Route path="/GestionarCuenta/" element={<GestionarCuenta />} />   
        <Route path="/EdicionGlamping/:glampingId" element={<EdicionGlamping />} />
        <Route path="/EdicionPerfil/" element={<EdicionPerfil />} />
        <Route path="/Reservar/:glampingId/:fechaInicioReservada/:fechaFinReservada/:precioConTarifa/:TarifaGlamperos/:totalDias/:totalAdultos/:totalNinos/:totalBebes/:totalMascotas" element={<Reservar />} />
        <Route path="/Mensajes/:idReceptor" element={<Mensajes />} />        
        <Route path="/MensajesIndividuales/:idReceptor" element={<MensajesIndividuales />} />
        <Route path="/ReservasPropiedades" element={<ReservasPropiedades />} />
        <Route path="/ReservasClientes" element={<ReservasClientes />} />
        <Route path="/GestionarReserva/:codigoReserva" element={<GestionarReserva />} />        
        <Route path="/Ayuda" element={<Ayuda />} />
        <Route path="/Gracias/:fechaInicioUrl/:fechaFinUrl" element={<Gracias />} />
        <Route path="/DatosEmpresariales" element={<DatosEmpresariales />} />
        <Route path="/GestionBancos" element={<GestionBancos />} />        
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </Router>
    }
  />
  );
}

export default App;
