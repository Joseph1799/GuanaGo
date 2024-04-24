import axios from 'axios';

// Reemplaza esto con tu clave de API real
const API_KEY = 'AIzaSyA2-q3jpNjbRR0dW9tGJICK5mYhMqEeZZo';
const API_URL = 'https://translation.googleapis.com/language/translate/v2';

// Esta función realiza la traducción del texto
const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        q: text,
        target: targetLanguage,
      }
    );
    // Retorna el texto traducido de la respuesta
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la petición
    console.error("Error al traducir el texto:", error);
    return '';
  }
};

export default translateText;
