//API uzantısına gerek yok, default axios importunda zaten ekleniyor
const indexURL = "/"
const isAdmin = "/user/adminpage"
const getIndexEpisodes = "/latest-works"
const getIndexFeaturedAnime = "/featured-anime"
const getAnimeIndex = (slug) => `/anime/${slug}`
const getMangaIndex = (slug) => `/manga/${slug}`
const getEpisodeDownloadLinks = (animeslug) => `/episode/download-links/${animeslug}`
const getSearchIndex = (type, page) => `${type}/arama-liste/${page}`
const getGenresList = "/genre-list"
const getFullSearchList = (type) => `/${type}/liste`
const getEpisodePageInfo = (slug) => `/episode/${slug}/watch`
const getEpisodeInfo = (slug, episode_data) => `/episode/${slug}/watch/${episode_data}`

const contentHeader = (type, slug) => `/api/images/${type}/${slug}-header.jpeg`

export {
    indexURL,
    isAdmin,
    getIndexEpisodes,
    getIndexFeaturedAnime,
    getAnimeIndex,
    getMangaIndex,
    getEpisodeDownloadLinks,
    getSearchIndex,
    getGenresList,
    getFullSearchList,
    getEpisodePageInfo,
    getEpisodeInfo,
    contentHeader
}