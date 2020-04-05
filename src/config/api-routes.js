//API uzantısına gerek yok, default axios importunda zaten ekleniyor
const indexURL = "/"
const isAdmin = "/kullanici/adminpage"
const getIndexEpisodes = "/latest-works"
const getIndexFeaturedAnime = "/featured-anime"
const getIndexBatchEpisodes = "/latest-batch-episodes"
const getAnimeIndex = (slug) => `/anime/${slug}`
const getMangaIndex = (slug) => `/manga/${slug}`
const getEpisodeDownloadLinks = (animeslug) => `/bolum/download-links/${animeslug}`
const getSearchIndex = (type, page) => `${type}/arama-liste/${page}`
const getGenresList = "/genre-list"
const getFullSearchList = (type) => `/${type}/liste`
const getEpisodePageInfo = (slug) => `/bolum/${slug}/watch`
const getEpisodeInfo = "/bolum/izleme-linkleri"

const loginRoute = "/kullanici/giris"
const registerRoute = "/kullanici/kayit"

const contentCover = (type, slug) => `/api/resimler/${type}/${slug}-cover`
const contentHeader = (type, slug) => `/api/resimler/${type}/${slug}-header`

export {
    indexURL,
    isAdmin,
    getIndexEpisodes,
    getIndexFeaturedAnime,
    getIndexBatchEpisodes,
    getAnimeIndex,
    getMangaIndex,
    getEpisodeDownloadLinks,
    getSearchIndex,
    getGenresList,
    getFullSearchList,
    getEpisodePageInfo,
    getEpisodeInfo,
    loginRoute,
    registerRoute,
    contentCover,
    contentHeader
}