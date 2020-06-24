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
const getRegisterDone = `/kullanici/kayit-tamamla`
const getRegisterRefresh = `/kullanici/kayit-tamamla/yenile`

const loginRoute = "/kullanici/giris"
const registerRoute = "/kullanici/kayit"

// API gerekiyor çünkü normal src propu içinde istiyoruz
const contentCover = (type, slug, size) => `/api/resimler/${type}/${slug}-cover${size ? `?size=${size}` : ""}`
const contentHeader = (type, slug, size) => `/api/resimler/${type}/${slug}-header${size ? `?size=${size}` : ""}`
const contentLogo = (type, slug) => `/api/resimler/${type}/${slug}-logo?type=logo`

const mangaPageImage = (slug, episode_number, filename) => `/api/resimler/manga/${slug}/oku/${episode_number}/${filename}`

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
    getMangaEpisodePageInfo,
    getEpisodeInfo,
    getMotdInfo,
    getRegisterDone,
    getRegisterRefresh,
    loginRoute,
    registerRoute,
    contentCover,
    contentHeader,
    contentLogo,
    mangaPageImage
}