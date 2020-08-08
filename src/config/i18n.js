import i18next from "i18next"
import { initReactI18next } from "react-i18next"

// Import locale files
import common_tr from '../locales/tr/common.json'
import pages_tr from '../locales/tr/pages.json'
import components_tr from '../locales/tr/components.json'
import common_en from '../locales/en/common.json'
import pages_en from '../locales/en/pages.json'
import components_en from '../locales/en/components.json'

i18next
    .use(initReactI18next)
    .init({
        debug: process.env.NODE_ENV === "development" ? true : false,
        logging: process.env.NODE_ENV === "development" ? true : false,
        interpolation: { escapeValue: true },
        lng: JSON.parse(localStorage.getItem('app-settings')).language,
        supportedLngs: ["tr", "en"],
        fallbackLng: process.env.REACT_APP_DEFAULT_LANG,
        resources: {
            tr: {
                common: common_tr,
                pages: pages_tr,
                components: components_tr
            },
            en: {
                common: common_en,
                pages: pages_en,
                components: components_en
            }
        }
    })

export default i18next;