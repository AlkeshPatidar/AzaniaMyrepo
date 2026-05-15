import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageDetector from 'i18next-browser-languagedetector';



import en from './en.json'
import hi from './hi.json'
import kn from './kn.json'

const resources = {
    en: { translation: en },
    hi: { translation: hi },
    kn: { translation: kn }
};


i18n
    .use(LanguageDetector) // Automatically detects the user language
    .use(initReactI18next) // Integrates with React
    .init({
        resources,
        lng: 'en', // Default language
        fallbackLng: 'en', // Fallback language
        keySeparator: false,
        interpolation: {
            escapeValue: false, // React already handles escaping
        },
        saveMissing: true,
        backend: {
            loadPath: '/locales/{{lng}}.json',
        },
        detection: {
            order: ['asyncStorage', 'languageDetector', 'navigator'],
            caches: ['asyncStorage'], // Save language in AsyncStorage
        },
    });

export default i18n;
