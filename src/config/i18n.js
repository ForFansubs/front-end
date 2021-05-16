import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

function getLoadPath([ns]) {
    switch (ns) {
        case "days": {
            return "/locales/common/{{lng}}/{{ns}}.json";
        }
        case "genres": {
            return "/locales/common/{{lng}}/{{ns}}.json";
        }
        case "common": {
            return "/locales/common/{{lng}}/{{ns}}.json";
        }
        default: {
            return "/locales/front-end/{{lng}}/{{ns}}.json";
        }
    }
}

i18next
    .use(initReactI18next)
    .use(Backend)
    .use(LanguageDetector)
    .init({
        backend: {
            loadPath: (_, ns) => getLoadPath(ns),
            allowMultiLoading: false,
            crossDomain: false,
        },
        ns: ["common", "components", "days", "genres", "pages"],
        debug: process.env.NODE_ENV === "development" ? true : false,
        logging: process.env.NODE_ENV === "development" ? true : false,
        interpolation: { escapeValue: false },
        supportedLngs: ["tr", "en"],
        fallbackLng: process.env.REACT_APP_DEFAULT_LANG,
    });

export default i18next;
