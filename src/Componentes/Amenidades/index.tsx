import { GiWashingMachine, GiFireplace, GiSmokeBomb, GiThermometerHot } from 'react-icons/gi';
import { IoWifi } from "react-icons/io5";
import { TbDeviceTv } from "react-icons/tb";
import { FaRegSnowflake, FaLaptopHouse, FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdOutdoorGrill, MdPool, MdOutlineBathtub } from "react-icons/md";
import { IoIosBonfire } from "react-icons/io";
import { FaFireExtinguisher, FaKitMedical, FaKitchenSet, FaHotTubPerson } from "react-icons/fa6";

// Lista de opciones amenidades
export const opcionesAmenidades = [
  { id: 'Wifi', label: 'Wifi', icono: <IoWifi /> },
  { id: 'Jacuzzi', label: 'Jacuzzi', icono: <FaHotTubPerson /> },
  { id: 'Tv', label: 'Tv', icono: <TbDeviceTv /> },
  { id: 'Cocina', label: 'Cocina', icono: <FaKitchenSet /> },
  { id: 'Lavadora', label: 'Lavadora', icono: <GiWashingMachine /> },
  { id: 'Aire acondicionado', label: 'Aire acondicionado', icono: <FaRegSnowflake /> },
  { id: 'Zona de trabajo', label: 'Zona de trabajo', icono: <FaLaptopHouse /> },
  { id: 'Parqueadero', label: 'Parqueadero', icono: <AiTwotoneCar /> },
  { id: 'Parrilla', label: 'Parrilla', icono: <MdOutdoorGrill /> },
  { id: 'Zona fogata', label: 'Zona fogata', icono: <IoIosBonfire /> },
  { id: 'Chimenea', label: 'Chimenea', icono: <GiFireplace /> },
  { id: 'Ducha', label: 'Ducha', icono: <FaShower /> },
  { id: 'Detector de humo', label: 'Detector de humo', icono: <GiSmokeBomb /> },
  { id: 'Extintor', label: 'Extintor', icono: <FaFireExtinguisher /> },
  { id: 'Botiquin', label: 'Botiquin', icono: <FaKitMedical /> },
  { id: 'Piscina', label: 'Piscina', icono: <MdPool /> },
  { id: 'Tina', label: 'Tina', icono: <MdOutlineBathtub /> },
  { id: 'Calefaccion', label: 'Calefaccion', icono: <GiThermometerHot /> },
];
