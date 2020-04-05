import React, { useEffect, useState } from 'react'
import { useGlobal } from 'reactn'
import useTheme from '@material-ui/styles/useTheme'
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet-async'

import axios from '../../config/axios/axios'
import { getIndexEpisodes, getIndexFeaturedAnime, getIndexBatchEpisodes } from '../../config/api-routes'

import { Grid, Typography } from '@material-ui/core'
import { useStyles, TitleContainer } from '../../components/index/index'
import LatestAniManga, { LoadingDivAniManga } from '../../components/index/latest/latestanimanga'
import LatestEpisode, { LoadingDivEpisode } from '../../components/index/latest/latestepisode';
import FeaturedContainer from '../../components/index/featured/FeaturedContainer'
import LatestBatchLinks from '../../components/index/latest/latestbatchlinks';
import { logoRoute } from '../../config/front-routes';

export default () => {
    const theme = useTheme()
    const classes = useStyles()

    let latestAnimesWindow = []
    let latestMangasWindow = []
    let latestEpisodesWindow = []
    let featuredAnimeContent = []
    let featuredAnimeWindow = []
    let batchEpisodesWindow = []

    const [latestAnimes, setLatestAnimes] = useState([])
    const [latestMangas, setLatestMangas] = useState([])
    const [latestEpisodes, setLatestEpisodes] = useState([])
    const [featuredAnimes, setFeaturedAnimes] = useState([])
    const [batchEpisodes, setBatchEpisodes] = useState([])

    const [latestLoading, setLatestLoading] = useState(true)
    const [featuredLoading, setFeaturedLoading] = useState(true)
    const [batchLoading, setBatchLoading] = useState(true)
    const [mobile] = useGlobal('mobile')

    //Handle data fetch
    useEffect(() => {
        axios.get(getIndexEpisodes)
            .then(res => {
                if (mobile) {
                    res.data.animes = res.data.animes.slice(0, 4)
                    res.data.mangas = res.data.mangas.slice(0, 4)
                    res.data.episodes = res.data.episodes.slice(0, 8)
                }
                setLatestAnimes(res.data.animes)
                setLatestMangas(res.data.mangas)
                setLatestEpisodes(res.data.episodes)
                setLatestLoading(false)
            })
            .catch(_ => {
                console.log("Son konular yüklenirken bir sorunla karşılaştık.")
            })
        axios.get(getIndexFeaturedAnime)
            .then(res => {
                setFeaturedAnimes(res.data)
                setFeaturedLoading(false)
            })
            .catch(_ => {
                console.log("Öne çıkarılmış animeleri yüklerken bir sorunla karşılaştık.")
            })
        axios.get(getIndexBatchEpisodes)
            .then(res => {
                setBatchEpisodes(res.data)
                setBatchLoading(false)
            })
            .catch(_ => {
                console.log("Toplu linkleri yüklerken bir sorunla karşılaştık.")
            })
        ReactGA.pageview(window.location.pathname)
    }, [mobile])

    if (latestLoading) {
        if (!mobile) {
            for (let i = 0; i < 8; i++) {
                latestAnimesWindow.push(LoadingDivAniManga(i + "loadingani"))
                latestMangasWindow.push(LoadingDivAniManga(i + "loadingman"))
            }
            for (let i = 0; i < 18; i++) {
                latestEpisodesWindow.push(LoadingDivEpisode(i + "loadingepi"))
            }
        }
        else {
            for (let i = 0; i < 4; i++) {
                latestAnimesWindow.push(LoadingDivAniManga(i + "loadingani"))
                latestMangasWindow.push(LoadingDivAniManga(i + "loadingman"))
            }
            for (let i = 0; i < 8; i++) {
                latestEpisodesWindow.push(LoadingDivEpisode(i + "loadingepi"))
            }
        }
    }

    //Hande latest loading
    if (!latestLoading) {
        latestAnimesWindow = latestAnimes.map(anime => (
            <LatestAniManga type="anime" {...anime} key={anime.id + "anime"} theme={theme} />
        ))
        latestMangasWindow = latestMangas.map(manga => (
            <LatestAniManga type="manga" {...manga} key={manga.id + "manga"} theme={theme} />
        ))
        latestEpisodesWindow = latestEpisodes.map(episode => (
            <LatestEpisode type="episode" {...episode} key={episode.episode_id + "episode"} theme={theme} />
        ))
    }

    //Öne çıkarılmışlar yükleniyor...
    featuredAnimeWindow = <FeaturedContainer list={featuredAnimes} loading={featuredLoading} />

    //Handle latest batch episodes
    if (!batchLoading) {
        if (batchEpisodes.length) {
            batchEpisodesWindow = batchEpisodes.map(episode => <LatestBatchLinks
                {...episode}
                key={episode.id + " batch"}
            />)
        }
    }

    const title = `${process.env.REACT_APP_SITENAME} ${process.env.REACT_APP_INDEX_TITLE_TEXT}`

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta name="description" content={process.env.REACT_APP_META_DESCRIPTION} />
                <meta name="keywords" content={process.env.REACT_APP_META_KEYWORDS} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="/" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={process.env.REACT_APP_META_DESCRIPTION} />
                <meta property="og:image" content={logoRoute} />
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:url" content="/" />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={process.env.REACT_APP_META_DESCRIPTION} />
                <meta property="twitter:image" content={logoRoute} />
                <meta name="author" content={process.env.REACT_APP_META_AUTHOR} />
            </Helmet>
            <div className={classes.ContainerDiv}>
                {featuredAnimeWindow}
            </div>
            {batchEpisodesWindow.length ?
                <div className={classes.ContainerDiv}>
                    <Typography variant="h4" component="h2" >
                        Toplu Linkler
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Sisteme eklenen toplu linkleri sırasıyla burada bulabilirsiniz
                    </Typography>
                    <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                        {batchEpisodesWindow}
                    </Grid>
                </div>
                : ""}
            <TitleContainer>
                <Typography variant={mobile ? "h4" : "h3"} component="h2">En Son Eklenenler</Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Sisteme eklenen en yeni içerikleri burada bulabilirsiniz
                </Typography>
            </TitleContainer>
            {latestEpisodesWindow.length ?
                <div className={classes.ContainerDiv}>
                    <Typography variant="h4" component="h2" gutterBottom>Bölümler</Typography>
                    <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                        {latestEpisodesWindow}
                    </Grid>
                </div>
                : ""}
            {latestAnimesWindow.length ?
                <div className={classes.ContainerDiv}>
                    <Typography variant="h4" component="h2" gutterBottom>Animeler</Typography>
                    <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                        {latestAnimesWindow}
                    </Grid>
                </div>
                : ""}
            {latestMangasWindow.length ?
                <div className={classes.ContainerDiv}>
                    <Typography variant="h4" component="h2" gutterBottom>Mangalar</Typography>
                    <Grid container spacing={2} direction="row" justify="center" alignItems="stretch">
                        {latestMangasWindow}
                    </Grid>
                </div>
                : ""}
        </>
    )
}