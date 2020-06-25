import React, { useEffect, useState } from 'react'
import { useGlobal } from 'reactn'
import useTheme from '@material-ui/styles/useTheme'
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet-async'

import axios from '../../config/axios/axios'
import { getIndexEpisodes, getIndexFeaturedAnime, getIndexBatchEpisodes } from '../../config/api-routes'

import { Grid, Typography } from '@material-ui/core'
import { useStyles } from '../../components/index/index'
import LatestAniManga, { LoadingDivAniManga } from '../../components/index/latest/latestanimanga'
import LatestEpisode, { LoadingDivEpisode } from '../../components/index/latest/latestepisode';
import FeaturedContainer from '../../components/index/featured/FeaturedContainer'
import LatestBatchLinks from '../../components/index/latest/latestbatchlinks';
import { logoRoute } from '../../config/front-routes';
import LatestMangaEpisode, { LoadingDivMangaEpisode } from '../../components/index/latest/latestmangaepisode';
import MotdContainer from '../../components/motd';

export default function IndexPage(props) {
    const theme = useTheme()
    const classes = useStyles()

    let latestAnimesWindow = []
    let latestMangasWindow = []
    let latestEpisodesWindow = []
    let latestMangaEpisodesWindow = []
    let featuredAnimeWindow = []
    let batchEpisodesWindow = []

    const [latestAnimes, setLatestAnimes] = useState([])
    const [latestMangas, setLatestMangas] = useState([])
    const [latestEpisodes, setLatestEpisodes] = useState([])
    const [latestMangaEpisodes, setLatestMangaEpisodes] = useState([])
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
                setLatestAnimes(res.data.animes)
                setLatestMangas(res.data.mangas)
                setLatestEpisodes(res.data.episodes)
                setLatestMangaEpisodes(res.data.manga_episodes)
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
            for (let i = 0; i < 24; i++) {
                latestAnimesWindow.push(LoadingDivAniManga(i + "loadingani"))
                latestMangasWindow.push(LoadingDivAniManga(i + "loadingman"))
            }
            for (let k = 0; k < 12; k++) {
                latestEpisodesWindow.push(LoadingDivEpisode(k + "loadingepi"))
                latestMangaEpisodesWindow.push(LoadingDivMangaEpisode(k + "loadingepi"))
            }
        }
        else {
            for (let i = 0; i < 8; i++) {
                latestAnimesWindow.push(LoadingDivAniManga(i + "loadingani"))
                latestMangasWindow.push(LoadingDivAniManga(i + "loadingman"))
            }
            for (let i = 0; i < 9; i++) {
                latestEpisodesWindow.push(LoadingDivEpisode(i + "loadingepi"))
                latestMangaEpisodesWindow.push(LoadingDivMangaEpisode(i + "loadingepi"))
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
            <LatestEpisode type="episode" {...episode} key={`${episode.anime_name} ${episode.episode_number} ${episode.special_type} episode`} theme={theme} />
        ))
        latestMangaEpisodesWindow = latestMangaEpisodes.map(episode => (
            <LatestMangaEpisode type="episode" {...episode} key={episode.manga_name + episode.episode_number + "manga episode"} theme={theme} />
        ))
    }

    //Öne çıkarılmışlar yükleniyor...
    featuredAnimeWindow = <FeaturedContainer list={featuredAnimes} loading={featuredLoading} />

    //Handle latest batch episodes
    batchEpisodesWindow = batchEpisodes.map(episode => <LatestBatchLinks
        loading={batchLoading}
        {...episode}
        key={episode.id + " batch"}
    />)

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
            <MotdContainer {...props} />
            <section className={classes.ContainerDiv}>
                {featuredAnimeWindow}
            </section>
            {batchEpisodesWindow.length ?
                <section className={classes.ContainerDiv}>
                    <Typography variant="h4" component="h2" >
                        Toplu Linkler
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Sisteme eklenen toplu linkleri sırasıyla burada bulabilirsiniz
                    </Typography>
                    <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                        {batchEpisodesWindow}
                    </Grid>
                </section>
                : ""}
            {latestAnimesWindow.length ?
                <section className={classes.ContainerDiv}>
                    <Typography variant="h2" component="h2" gutterBottom>
                        Animeler
                    </Typography>
                    <Grid container spacing={2} direction="row" justify="center">
                        {latestAnimesWindow}
                    </Grid>
                </section>
                : ""}
            {latestEpisodesWindow.length ?
                <section className={classes.ContainerDiv}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} lg={4} className={classes.TitleContainer}>
                            <Typography variant={mobile ? "h2" : "h1"} component="h2" noWrap>
                                En Yeni
                            </Typography>
                            <Typography variant={mobile ? "h2" : "h1"} component="h2">
                                Bölümler
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={8} lg={8}>
                            <Grid container spacing={2} direction="row" justify="center" alignItems="stretch">
                                {latestEpisodesWindow}
                            </Grid>
                        </Grid>
                    </Grid>
                </section>
                : ""}
            {latestMangasWindow.length ?
                <section className={classes.ContainerDiv}>
                    <Typography variant="h2" component="h2" gutterBottom>
                        Mangalar
                        </Typography>
                    <Grid container spacing={2} direction="row" justify="center" alignItems="stretch">
                        {latestMangasWindow}
                    </Grid>
                </section>
                : ""}
            {latestMangaEpisodesWindow.length ?
                <section className={classes.ContainerDiv}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3} lg={4} className={classes.TitleContainer}>
                            <Typography variant={mobile ? "h2" : "h1"} component="h2" noWrap>
                                En Yeni
                            </Typography>
                            <Typography variant={mobile ? "h2" : "h1"} component="h2">
                                Bölümler
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={9} lg={8}>
                            <Grid container spacing={2} direction="row" justify="center" alignItems="stretch">
                                {latestMangaEpisodesWindow}
                            </Grid>
                        </Grid>
                    </Grid>
                </section>
                : ""}
        </>
    )
}