import axios from 'axios';

export const guardarGlamping = async (glampingData: any): Promise<void> => {
  try {
    const response = await axios.post('https://glamperosapi.onrender.com/glampings/', glampingData);
    console.log('Glamping guardado exitosamente:', response.data);
  } catch (error) {
    console.error('Error al guardar el glamping:', error);
  }
};
