//API uzantısına gerek yok, default axios importunda zaten ekleniyor
const indexURL = "/"
const isAdmin = "/kullanici/adminpage"
const getIndexEpisodes = "/latest-works"
const getIndexFeaturedAnime = "/featured-anime"
const getIndexFeaturedManga = "/featured-manga"
const getIndexBatchEpisodes = "/latest-batch-episodes"
const getAnimeIndex = (slug) => `/anime/${slug}`
const getMangaIndex = (slug) => `/manga/${slug}`
const getEpisodeDownloadLinks = (animeslug) => `/bolum/download-links/${animeslug}`
const getSearchIndex = (type, page) => `${type}/arama-liste/${page}`
const getGenresList = "/genre-list"
const getFullSearchList = (type) => `/${type}/liste`
const getEpisodePageInfo = (slug) => `/bolum/${slug}/watch`
const getMangaEpisodePageInfo = (slug) => `/manga-bolum/${slug}/read`
const getEpisodeInfo = "/bolum/izleme-linkleri"
const getMotdInfo = (props) => {
    let params = ""
    if (props) {
        for (const prop in props) {
            if (props[prop])
                params += `${prop}=${props[prop]}&`
        }
    }
    return `/motd${params ? `?${params}` : ""}`
}
const getCalendarData = `/takvim/`
const getRegisterDone = `/kullanici/kayit-tamamla`
const getRegisterRefresh = `/kullanici/kayit-tamamla/yenile`

const loginRoute = "/kullanici/giris"
const registerRoute = "/kullanici/kayit"

// API gerekiyor çünkü normal src propu içinde istiyoruz
const contentCover = (type, slug, size) => `/api/resimler/${type}/${slug}-cover${size ? `?size=${size}` : ""}`
const contentHeader = (type, slug, size) => `/api/resimler/${type}/${slug}-header${size ? `?size=${size}` : ""}`
const contentLogo = (type, slug) => `/api/resimler/${type}/${slug}-logo?type=logo`
const contentMetadata = (type, slug) => `/api/resimler/metadata/${type}/${slug}`

const mangaPageImage = (slug, episode_number, filename) => `/api/resimler/manga/${slug}/oku/${episode_number}/${filename}`

const jikanAPI = ({ contentType, contentId, extraPath }) => `${process.env.REACT_APP_JIKAN_INSTANCE_URL || "https://api.jikan.moe/v3/"}${contentType}/${contentId}${extraPath ? `/${extraPath}` : ""}`
const youtubeEmbedLink = ({ videoId }) => `https://www.youtube.com/embed/${videoId}`

export {
    indexURL,
    isAdmin,
    getIndexEpisodes,
    getIndexFeaturedAnime,
    getIndexFeaturedManga,
    getIndexBatchEpisodes,
    getAnimeIndex,
    getMangaIndex,
    getEpisodeDownloadLinks,
    getSearchIndex,
    getGenresList,
    getFullSearchList,
    getEpisodePageInfo,
    getMangaEpisodePageInfo,
    getEpisodeInfo,
    getMotdInfo,
    getCalendarData,
    getRegisterDone,
    getRegisterRefresh,
    loginRoute,
    registerRoute,
    contentCover,
    contentHeader,
    contentLogo,
    contentMetadata,
    mangaPageImage,
    jikanAPI,
    youtubeEmbedLink
}