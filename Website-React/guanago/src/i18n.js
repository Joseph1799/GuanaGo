// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './translations/en.json'; 
import translationES from './translations/es.json';

const resources = {
  en: { translation: translationEN },
  es: { translation: translationES },
};

i18n
  .use(initReactI18next) // pasa la instancia de i18next a react-i18next
  .init({
    resources,
    lng: 'en', // idioma por defecto a cargar
    interpolation: {
      escapeValue: false, // no es necesario escapar html en React
    },
    react: {
      useSuspense: false, // esta opción dependerá de tu estrategia para cargar los recursos
    },
  });

export default i18n;
