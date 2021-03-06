const indexPage = `/`
const registerPage = "/kayit-ol"
const loginPage = "/giris-yap"
const searchPage = `/ara`
const calendarPage = `/takvim`
const faqPage = `/sss`
const recPage = `/ekip-alimlari`

const adminPage = process.env.NODE_ENV === "development" ? `${process.env.REACT_APP_DEV_ADMIN_URL || "http://localhost:3001"}/admin/` : `/admin/`

const animePage = (slug) => `/ceviriler/anime/${slug}`
const mangaPage = (slug) => `/ceviriler/manga/${slug}`
const getAnimeWatchIndex = (slug) => `/ceviriler/anime/${slug}/izle`
const episodePage = (slug, episodeSlug) => `/ceviriler/anime/${slug}/izle${episodeSlug ? `/${episodeSlug}` : ""}`
const mangaEpisodePage = (slug, episode_number, page_number) => {
    return `/ceviriler/manga/${slug}/oku${episode_number ? `/${episode_number}` : ""}${episode_number && page_number ? `/${page_number}` : ""}`
}

const logoRoute = "/logo.png"

export { indexPage, registerPage, loginPage, searchPage, calendarPage, faqPage, recPage, adminPage, animePage, getAnimeWatchIndex, mangaPage, episodePage, mangaEpisodePage, logoRoute }