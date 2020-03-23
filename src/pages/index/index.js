import React, { useEffect, useState } from 'react'
import { useGlobal } from 'reactn'
import useTheme from '@material-ui/styles/useTheme'
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet-async'

import axios from '../../config/axios/axios'
import { getIndexEpisodes, getIndexFeaturedAnime, getIndexBatchEpisodes } from '../../config/api-routes'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import styled from 'styled-components'
import LatestAniManga, { LoadingDivAniManga } from '../../components/index/latestanimanga'
import LatestEpisode, { LoadingDivEpisode } from '../../components/index/latestepisode';
import Featured, { FeaturedLoading } from '../../components/index/featured'
import Slick from '../../components/index/slick'
import Error from '../../components/index/error'
import LatestBatchLinks from '../../components/index/latestbatchlinks';

const ContainerDiv = styled.div`
    margin: 0 0 40px 0;
`

const IndexHeader = styled(Typography)`
    ${props => props.aligncenter ? "text-align: center;" : ""}
    margin-bottom: 10px;
`

export default function IndexPage() {
    const theme = useTheme()

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
                console.log("Öne çıkarılmış animeleri yüklerken bir sorunla karşılaştık.")
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
            <LatestEpisode type="episode" {...episode} key={episode.id + "episode"} theme={theme} />
        ))
    }

    if (featuredLoading) {
        if (!mobile)
            for (let i = 0; i < 4; i++) {
                let active = i === 0 ? true : false
                featuredAnimeContent.push(FeaturedLoading(i + "loadingfea", active))
            }
        else {
            featuredAnimeContent.push(FeaturedLoading("1", false))
        }
        featuredAnimeWindow = <Slick content={featuredAnimeContent} type="featured-loading" />
    }

    //Handle featured animes
    if (!featuredLoading) {
        if (featuredAnimes.length) {
            featuredAnimeContent = featuredAnimes.map(anime => <Featured
                title={anime.name}
                synopsis={anime.synopsis}
                slug={anime.slug}
                premiered={anime.premiered}
                genres={anime.genres}
                version={anime.version}
                key={anime.id + " featured"}
                theme={theme}
            />)
            featuredAnimeWindow = <Slick content={featuredAnimeContent} type="featured" />
        }
        else
            featuredAnimeWindow = <Error type="featured" />
    }

    //Handle latest batch episodes
    if (!batchLoading) {
        if (batchEpisodes.length) {
            batchEpisodesWindow = batchEpisodes.map(episode => <LatestBatchLinks
                {...episode}
                key={episode.id + " batch"}
                theme={theme}
            />)
        }
        else
            batchEpisodesWindow = <Error type="featured" />
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
                <meta property="og:image" content="/512.png" />
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:url" content="/" />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={process.env.REACT_APP_META_DESCRIPTION} />
                <meta property="twitter:image" content="/512.png" />
                <meta name="author" content={process.env.REACT_APP_META_AUTHOR} />
            </Helmet>
            <ContainerDiv>
                <IndexHeader variant="h4">Öne Çıkarılmış Animeler</IndexHeader>
                {featuredAnimeWindow}
            </ContainerDiv>
            {batchEpisodesWindow.length ?
                <ContainerDiv>
                    <IndexHeader variant="h5" aligncenter="true" gutterBottom>Toplu Linkler</IndexHeader>
                    <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                        {batchEpisodesWindow}
                    </Grid>
                </ContainerDiv>
                : ""}
            {latestEpisodesWindow.length ?
                <ContainerDiv>
                    <IndexHeader variant="h4" gutterBottom>Son Bölümler</IndexHeader>
                    <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                        {latestEpisodesWindow}
                    </Grid>
                </ContainerDiv>
                : ""}
            {latestAnimesWindow.length ?
                <ContainerDiv>
                    <IndexHeader variant="h4" gutterBottom>Son Animeler</IndexHeader>
                    <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                        {latestAnimesWindow}
                    </Grid>
                </ContainerDiv>
                : ""}
            {latestMangasWindow.length ?
                <ContainerDiv>
                    <IndexHeader variant="h4" gutterBottom>Son Mangalar</IndexHeader>
                    <Grid container spacing={2} direction="row" justify="center" alignItems="stretch">
                        {latestMangasWindow}
                    </Grid>
                </ContainerDiv>
                : ""}
        </>
    )
}