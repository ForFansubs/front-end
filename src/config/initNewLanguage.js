import i18next from './i18n'

export function initNewLanguage(language) {
    document.documentElement.dir = i18next.dir(language);
    document.documentElement.lang = language;
}