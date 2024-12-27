import { GiWashingMachine, GiFireplace, GiSmokeBomb, GiThermometerHot } from 'react-icons/gi';
import { IoWifi } from "react-icons/io5";
import { TbDeviceTv } from "react-icons/tb";
import { FaRegSnowflake, FaLaptopHouse, FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdOutdoorGrill, MdPool, MdOutlineBathtub } from "react-icons/md";
import { IoIosBonfire } from "react-icons/io";
import { FaFireExtinguisher, FaKitMedical, FaKitchenSet, FaHotTubPerson } from "react-icons/fa6";
import { FaUmbrellaBeach, FaTemperatureArrowUp } from "react-icons/fa6";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { BsTreeFill } from "react-icons/bs";
import { PiMountainsBold } from "react-icons/pi";
import { GiDesert, GiHiking, GiRiver, GiWaterfall} from "react-icons/gi";
import { BsFillProjectorFill } from "react-icons/bs";
import { GiCoffeeCup, GiFishingNet} from "react-icons/gi";
import { FaChess } from "react-icons/fa";
import { LuRefrigerator } from "react-icons/lu";





// Lista de opciones amenidades
export const opcionesAmenidades = [
  { id: 'Wifi', label: 'Wifi', icono: <IoWifi /> },  
  { id: 'Zona de trabajo', label: 'Zona de trabajo', icono: <FaLaptopHouse /> },
  { id: 'Desayuno', label: 'Desayuno', icono: <GiCoffeeCup /> },
  { id: 'Jacuzzi', label: 'Jacuzzi', icono: <FaHotTubPerson /> },
  { id: 'Tina', label: 'Tina', icono: <MdOutlineBathtub /> },
  { id: 'Piscina', label: 'Piscina', icono: <MdPool /> },  
  { id: 'Maya catamaran', label: 'Maya catamaran', icono: <GiFishingNet /> },    
  { id: 'Parrilla', label: 'Parrilla', icono: <MdOutdoorGrill /> },
  { id: 'Cocina', label: 'Cocina', icono: <FaKitchenSet /> },
  { id: 'Zona fogata', label: 'Zona fogata', icono: <IoIosBonfire /> },
  { id: 'Chimenea', label: 'Chimenea', icono: <GiFireplace /> },  
  { id: 'Mini bar', label: 'Mini bar', icono: <LuRefrigerator /> },
  { id: 'Tv', label: 'Tv', icono: <TbDeviceTv /> },
  { id: 'Proyector', label: 'Proyector', icono: <BsFillProjectorFill /> },  
  { id: 'Juegos de mesa', label: 'Juegos de mesa', icono: <FaChess /> },    
  { id: 'Lavadora', label: 'Lavadora', icono: <GiWashingMachine /> },
  { id: 'Clima Calido', label: 'Clima Calido', icono: <FaTemperatureArrowUp /> },
  { id: 'Aire acondicionado', label: 'Aire acondicionado', icono: <FaRegSnowflake /> },
  { id: 'Clima Frio', label: 'Clima Frio', icono: <FaTemperatureArrowDown /> },
  { id: 'Calefaccion', label: 'Calefaccion', icono: <GiThermometerHot /> },  
  { id: 'Ducha', label: 'Ducha', icono: <FaShower /> },
  { id: 'Detector de humo', label: 'Detector de humo', icono: <GiSmokeBomb /> },
  { id: 'Extintor', label: 'Extintor', icono: <FaFireExtinguisher /> },
  { id: 'Botiquin', label: 'Botiquin', icono: <FaKitMedical /> },
  { id: 'Playa', label: 'Playa', icono: <FaUmbrellaBeach /> },  
  { id: 'Naturaleza', label: 'Naturaleza', icono: <BsTreeFill /> },
  { id: 'Rio', label: 'Rio', icono: <GiRiver /> },
  { id: 'Cascada', label: 'Cascada', icono: < GiWaterfall /> },
  { id: 'En la montaña', label: 'En la montaña', icono: <PiMountainsBold /> },
  { id: 'Desierto', label: 'Desierto', icono: <GiDesert /> },
  { id: 'Caminata', label: 'Caminata', icono: <GiHiking /> },
  { id: 'Parqueadero', label: 'Parqueadero', icono: <AiTwotoneCar /> },

];
