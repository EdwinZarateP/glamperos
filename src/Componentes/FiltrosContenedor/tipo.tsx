// import React, { useContext } from 'react';
// import { ContextoApp } from '../../Contexto/index';
// import { GiCampingTent, GiHabitatDome, GiTreehouse, GiHut } from 'react-icons/gi';
// import { MdOutlineCabin } from "react-icons/md";
// import { FaCaravan } from "react-icons/fa";
// import './tipo.css';

// const FiltrosTipo: React.FC = () => {
//   const { filtros, setFiltros } = useContext(ContextoApp)!;

//   const opciones = [
//     { id: 'Tienda', label: 'Tienda', icono: <GiCampingTent /> },
//     { id: 'Domo', label: 'Domo', icono: <GiHabitatDome /> },
//     { id: 'Casa_arbol', label: 'Casa del árbol', icono: <GiTreehouse /> },
//     { id: 'Remolque', label: 'Remolque', icono: <FaCaravan /> },
//     { id: 'Cabaña', label: 'Cabaña', icono: <MdOutlineCabin /> },
//     { id: 'Choza', label: 'Choza', icono: <GiHut /> },
//   ];

//   const manejarSeleccion = (opcionId: string) => {
//     setFiltros((prev) => ({
//       ...prev,
//       tipoGlampingFiltrado: opcionId,
//     }));
//   };

//   return (
//     <div className="FiltrosContenedor-Tipo">
//       <label>Tipo de Glamping</label>
//       <div className="FiltrosContenedor-Tipo-opciones">
//         {opciones.map((opcion) => (
//           <div
//             key={opcion.id}
//             className={`FiltrosContenedor-Tipo-opcion ${filtros.tipoGlampingFiltrado === opcion.id ? 'seleccionado' : ''}`}
//             onClick={() => manejarSeleccion(opcion.id)}
//           >
//             <span className="FiltrosContenedor-Tipo-icono">{opcion.icono}</span>
//             <span>{opcion.label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FiltrosTipo;
