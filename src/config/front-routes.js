const indexPage = `/`
const searchPage = `/ara`
const faqPage = `/sss`
const recPage = `/ekip-alimlari`

const adminPage = process.env.NODE_ENV === "development" ? `http://192.168.1.100:3001/admin/` : `/admin/`

const animePage = (slug) => `/ceviriler/anime/${slug}`
const mangaPage = (slug) => `/ceviriler/manga/${slug}`
const getAnimeWatchIndex = (slug) => `/ceviriler/anime/${slug}/izle`
const episodePage = (slug, episodeSlug) => `/ceviriler/anime/${slug}/izle${episodeSlug ? `/${episodeSlug}` : ""}`

const logoRoute = "/logo.png"

export { indexPage, searchPage, faqPage, recPage, adminPage, animePage, getAnimeWatchIndex, mangaPage, episodePage, logoRoute }