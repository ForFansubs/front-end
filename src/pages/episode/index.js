import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios/axios'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga';

import Collection from 'lodash/collection'
import Loading from '../../components/progress/index'

import { getEpisodePageInfo, getEpisodeInfo } from '../../config/api-routes'
import { episodePage, animePage } from '../../config/front-routes'

import {
    PageContainer,
    PagePlacer,
    ContentIframeContainer,
    EpisodeListParser,
    ContentEpisodeButtons,
    ContentTitle,
    ContentIframe,
    ContentIframePlaceholder,
    ContentWarning,
    ContentError,
    defaultBoxProps,
    ContentLinksContainer,
    ContentLinksButtonContainer,
    ContentLinksButton,
    ContentFallback,
    ContentEpisodeContainer,
    ContentCommentsContainer,
    ContentCreditsContainer,
    ContentAnimeButton,
    Page
} from '../../components/episode/components';

import { useTheme } from '@material-ui/styles'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import EpisodeLinkOverride from '../../config/episode-link-overrides';

export default function EpisodePage(props) {
    const theme = useTheme()
    let episodeDataMapped = "", watchLinksMapped = ""

    const [animeData, setAnimeData] = useState({
        name: "",
        cover_art: "",
        id: null,
    })
    const [episodeData, setEpisodeData] = useState([])
    const [watchLinks, setWatchLinks] = useState([])
    const [activeEpisode, setActiveEpisode] = useState({
        episode_number: null,
        special_type: "",
        slug: "",
        title: "",
        credits: ""
    })
    const [activeLink, setActiveLink] = useState(null)
    const [loading, setLoading] = useState(true)
    const [episodeLoading, setEpisodeLoading] = useState(false)
    const [iframeLoading, setIframeLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const { slug, episodeInfo } = props.match.params

            const pageInfo = await axios.get(getEpisodePageInfo(slug))

            if (pageInfo.data.length === 0 || pageInfo.status !== 200) {
                return setLoading(false)
            }

            setAnimeData({ name: pageInfo.data[0].anime_name, cover_art: pageInfo.data[0].cover_art, id: pageInfo.data[0].anime_id })
            setEpisodeData(pageInfo.data)

            if (episodeInfo) {
                const regex = new RegExp('([0-9])', 'g')
                const episode_number = episodeInfo.match(regex).join('')
                let special_type = episodeInfo.replace(episode_number, '')
                if (special_type === "bolum") special_type = ""

                let { slug, title, data } = EpisodeListParser(episode_number, special_type)
                const { credits } = Collection.find(pageInfo.data, { special_type, episode_number })
                handleEpisodeClick(slug, title, data, credits)
            }

            setLoading(false)
        }

        fetchData()
        // eslint-disable-next-line
    }, [props.match.params.slug])

    useEffect(() => {
        const { slug } = props.match.params
        const episodeInfo = activeEpisode.slug

        window.history.replaceState("", "", episodePage(slug, episodeInfo))
        ReactGA.pageview(window.location.pathname)
        // eslint-disable-next-line
    }, [animeData, activeEpisode, activeLink])

    useEffect(() => {
        const ifr = document.getElementById("video-iframe")
        const fallback_div = document.getElementById("video-fallback")

        if (ifr && fallback_div && activeLink) {
            fallback_div.style.display = "none"
            fallback_div.innerHTML = ""

            const { link, func } = EpisodeLinkOverride(activeLink)
            if (ifr.contentWindow) {
                setIframeLoading(true)
                if (func) {
                    func(fallback_div)
                    setEpisodeLoading(false)
                    ifr.contentWindow.location.replace("about:blank")
                }
                if (link) ifr.contentWindow.location.replace(link)
            }
        }
    }, [activeLink, setIframeLoading])

    function handleEpisodeClick(slug, title, data, credits) {
        setEpisodeLoading(true)
        setActiveEpisode({
            episode_number: null,
            special_type: "",
            slug: "",
            title: ""
        })
        setActiveLink("")
        setWatchLinks([])

        let [special_type, episode_number] = data.split('-')

        if (special_type === "bolum") special_type = ""

        const fetchData = async () => {
            const episodeInfo = await axios.get(getEpisodeInfo(props.match.params.slug, data))

            if (episodeInfo.data.length === 0 || episodeInfo.status !== 200) {
                return setEpisodeLoading(false)
            }

            setWatchLinks(episodeInfo.data)
            handleFirstLinkMount(episodeInfo.data[0].link)
        }

        fetchData()

        setActiveEpisode({
            special_type,
            episode_number,
            slug,
            title,
            credits
        })
    }

    function handleFirstLinkMount(link) {
        handleLinkClick(link)
    }

    function handleLinkClick(link) {
        setActiveLink(link)
    }

    if (!loading && episodeData.length !== 0) {
        const data_length = episodeData.length

        episodeDataMapped = episodeData.map((e, i) => {
            let { slug, title, data } = EpisodeListParser(e.episode_number, e.special_type)

            return (
                <ContentEpisodeButtons
                    last={data_length - 1 === i ? "true" : undefined}
                    fullWidth
                    variant="outlined"
                    onClick={() => handleEpisodeClick(slug, title, data, e.credits)}
                    color={e.special_type === activeEpisode.special_type && e.episode_number === activeEpisode.episode_number ? "secondary" : "default"}
                    key={e.id}>
                    {title}
                </ContentEpisodeButtons>
            )
        })

        if (watchLinks.length !== 0) {
            watchLinksMapped = watchLinks.map((w, i) => (
                <ContentLinksButton
                    size="small"
                    last={watchLinks.length - 1 === i ? "true" : undefined}
                    variant="outlined"
                    key={w.id + w.type}
                    color={w.link === activeLink ? "secondary" : "default"}
                    onClick={() => handleLinkClick(w.link)}
                >
                    {w.type.toUpperCase()}
                </ContentLinksButton>
            ))
        }

        const title = `${animeData.name} ${activeEpisode.title} Türkçe İzle - PuzzleSubs Anime`
        const desc = `${animeData.name} ${activeEpisode.title} Türkçe İzle ve İndir - PuzzleSubs Anime İzle`

        return (
            <>
                <Helmet>
                    <title>{title}</title>
                    <meta name="title" content={title} />
                    <meta name="description" content={desc} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={process.env.REACT_APP_SITENAME + episodePage(props.match.params.slug, activeEpisode.slug)} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={desc} />
                    <meta property="og:image" content={animeData.cover_art} />
                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content={process.env.REACT_APP_SITENAME + episodePage(props.match.params.slug, activeEpisode.slug)} />
                    <meta property="twitter:title" content={title} />
                    <meta property="twitter:description" content={desc} />
                    <meta property="twitter:image" content={animeData.cover_art} />
                </Helmet>
                <Page theme={theme} container spacing={2}>
                    <PagePlacer item xs={12}>
                        <ContentTitle variant="h1">{animeData.name} {activeEpisode.title ? activeEpisode.title : "- Lütfen bölüm seçin"}</ContentTitle>
                    </PagePlacer>
                    <PagePlacer item xs={12} md={9}>
                        <ContentIframeContainer {...defaultBoxProps} bgcolor="background.level1">
                            {activeEpisode.episode_number
                                ?
                                watchLinks.length !== 0
                                    ?
                                    <>
                                        {iframeLoading
                                            ?
                                            <ContentIframePlaceholder bgcolor="background.level2">
                                                <CircularProgress color="secondary" />
                                            </ContentIframePlaceholder>
                                            :
                                            ""
                                        }
                                        {activeLink
                                            ?
                                            <ContentIframe
                                                id="video-iframe"
                                                onLoad={() => setIframeLoading(false)}
                                                allowFullScreen
                                                data={""} />
                                            :
                                            ""
                                        }
                                        <ContentFallback id="video-fallback" />
                                        {watchLinksMapped.length !== 0
                                            ?
                                            <ContentLinksContainer {...defaultBoxProps} p={1} bgcolor="background.level1">
                                                <ContentLinksButtonContainer>
                                                    {watchLinksMapped}
                                                </ContentLinksButtonContainer>
                                            </ContentLinksContainer>
                                            :
                                            ""
                                        }
                                    </>
                                    :
                                    episodeLoading ?
                                        ""
                                        :
                                        <ContentError
                                            {...defaultBoxProps}
                                            p={1}>
                                            <WarningIcon />
                                            <Typography variant="subtitle2">Link bulunamadı.</Typography>
                                        </ContentError>
                                :
                                <ContentWarning
                                    {...defaultBoxProps}
                                    p={1}><InfoIcon />
                                    <Typography variant="subtitle2">Lütfen bölüm seçiniz.</Typography>
                                </ContentWarning>
                            }
                        </ContentIframeContainer>
                    </PagePlacer>
                    <PagePlacer item xs={12} md={3}>
                        <ContentEpisodeContainer mb={2}>
                            {episodeDataMapped.length !== 0
                                ?
                                episodeDataMapped
                                :
                                ""
                            }
                        </ContentEpisodeContainer>
                        {activeEpisode.credits ?
                            <PageContainer {...defaultBoxProps} p={2} mb={2} style={{ overflowWrap: "break-word" }}>
                                <ContentCreditsContainer>
                                    <Typography variant="h4">Emektar</Typography>
                                    <Typography variant="h5">{activeEpisode.credits}</Typography>
                                </ContentCreditsContainer>
                            </PageContainer>
                            : ""}
                        <PageContainer>
                            <Link to={animePage(props.match.params.slug)}>
                                <ContentAnimeButton variant="contained" fullWidth>
                                    <Typography variant="h6">Animeye git</Typography>
                                </ContentAnimeButton>
                            </Link>
                        </PageContainer>
                    </PagePlacer>
                    {activeEpisode.slug ?
                        <PagePlacer item xs={12}>
                            <PageContainer {...defaultBoxProps} p={2}>
                                <ContentCommentsContainer
                                    withButton
                                    config={{ identifier: `anime/${activeEpisode.anime_id}/${activeEpisode.slug}` }} />
                            </PageContainer>
                        </PagePlacer>
                        : ""}
                </Page>
            </>
        )
    }

    else if (!loading) {
        return (
            <>
                <PagePlacer container>
                    <ContentTitle variant="h1">Bölüm bulunamadı.</ContentTitle>
                </PagePlacer>
            </>
        )
    }

    else {
        return (
            <Loading />
        )
    }
}