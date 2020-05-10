import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios/axios'
import { Helmet } from 'react-helmet-async'
import ReactGA from 'react-ga'

import find from 'lodash-es/find'
import Loading from '../../components/progress/index'

import { getEpisodePageInfo, getEpisodeInfo } from '../../config/api-routes'
import { episodePage, animePage } from '../../config/front-routes'

import {
    useStyles,
    EpisodeListParser,
    defaultBoxProps,
} from '../../components/episode/components'
import ContentError from '../../components/warningerrorbox/error'
import ContentWarning from '../../components/warningerrorbox/warning'
import DisqusBox from '../../components/disqus/disqus'

import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import CircularProgress from '../../components/progress/index'
import EpisodeLinkOverride from '../../config/episode-link-overrides'
import { Grid, Box, Button, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { format } from 'date-fns'
import Dotdotdot from 'react-dotdotdot'

export default function EpisodePage(props) {
    const classes = useStyles()
    let episodeDataMapped = "", watchLinksMapped = ""

    const [animeData, setAnimeData] = useState({
        name: "",
        cover_art: "",
        id: null,
        slug: ""
    })
    const [episodeData, setEpisodeData] = useState([])
    const [watchLinks, setWatchLinks] = useState([])
    const [activeEpisode, setActiveEpisode] = useState({
        episode_number: null,
        special_type: "",
        slug: "",
        title: "",
        credits: "",
        created_time: null
    })
    const [activeLink, setActiveLink] = useState(null)
    const [loading, setLoading] = useState(true)
    const [episodeLoading, setEpisodeLoading] = useState(false)
    const [iframeLoading, setIframeLoading] = useState(false)
    const [showWatchLinks, setShowWatchLinks] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const { slug, episodeInfo } = props.match.params

            const pageInfo = await axios.get(getEpisodePageInfo(slug))

            if (pageInfo.data.length === 0 || pageInfo.status !== 200) {
                return setLoading(false)
            }

            setAnimeData({
                name: pageInfo.data[0].anime_name,
                cover_art: pageInfo.data[0].cover_art,
                id: pageInfo.data[0].anime_id,
                slug: pageInfo.data[0].anime_slug
            }
            )
            setEpisodeData(pageInfo.data)

            if (episodeInfo) {
                const regex = new RegExp('([0-9])', 'g')
                const episode_number = episodeInfo.match(regex).join('')
                let special_type = episodeInfo.replace(episode_number, '')
                if (special_type === "bolum") special_type = ""

                let { slug, title, data } = EpisodeListParser(episode_number, special_type)
                const episode = find(pageInfo.data, { special_type, episode_number })
                if (episode) {
                    const { credits, created_time } = episode
                    handleEpisodeClick(slug, title, data, credits, created_time)
                }
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

    function handleEpisodeClick(slug, title, episode_data, credits, created_time) {
        setEpisodeLoading(true)
        setShowWatchLinks(true)
        handleMouseLeaveWatchLink()
        setActiveEpisode({
            episode_number: null,
            special_type: "",
            slug: "",
            title: ""
        })
        setActiveLink("")
        setWatchLinks([])

        let [special_type, episode_number] = episode_data.split('-')

        if (special_type === "bolum") special_type = ""

        const data = {
            slug: props.match.params.slug,
            episode_data
        }

        const fetchData = async () => {
            const episodeInfo = await axios.post(getEpisodeInfo, data)

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
            credits,
            created_time
        })
    }

    function handleMouseEnterWatchLink() {
        setShowWatchLinks(true)
    }

    function handleMouseLeaveWatchLink() {
        setTimeout(() => setShowWatchLinks(false), 3000)
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
                <Button
                    className={classes.EpisodeButtons}
                    last={data_length - 1 === i ? "true" : undefined}
                    fullWidth
                    variant="outlined"
                    onClick={() => handleEpisodeClick(slug, title, data, e.credits, e.created_time)}
                    color={e.special_type === activeEpisode.special_type && e.episode_number === activeEpisode.episode_number ? "secondary" : "default"}
                    key={e.id}>
                    {title}
                </Button>
            )
        })

        if (watchLinks.length !== 0) {
            watchLinksMapped = watchLinks.map((w, i) => (
                <Button
                    className={classes.LinksButton}
                    size="small"
                    last={watchLinks.length - 1 === i ? "true" : undefined}
                    variant="outlined"
                    key={w.id + w.type}
                    color={w.link === activeLink ? "secondary" : "default"}
                    onClick={() => handleLinkClick(w.link)}
                >
                    {w.type.toUpperCase()}
                </Button>
            ))
        }

        const title = `${animeData.name} ${activeEpisode.title} Türkçe İzle - ${process.env.REACT_APP_SITENAME} Anime`
        const desc = `${animeData.name} ${activeEpisode.title} Türkçe İzle ve İndir - ${process.env.REACT_APP_SITENAME} Anime İzle`

        return (
            <>
                <Helmet>
                    <title>{title}</title>
                    <meta name="title" content={title} />
                    <meta name="description" content={desc} />
                    <meta name="keywords" content={process.env.REACT_APP_META_KEYWORDS} />
                    <meta property="og:type" content="video.tv_show" />
                    <meta property="og:site_name" content={process.env.REACT_APP_SITEURL} />
                    <meta property="og:url" content={process.env.REACT_APP_SITEURL + episodePage(props.match.params.slug, activeEpisode.slug)} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={desc} />
                    <meta property="og:image" content={animeData.cover_art} />
                    <meta name="twitter:card" content="summary" />
                    <meta property="twitter:url" content={process.env.REACT_APP_SITEURL + episodePage(props.match.params.slug, activeEpisode.slug)} />
                    <meta property="twitter:title" content={title} />
                    <meta property="twitter:description" content={desc} />
                    <meta property="twitter:image:src" content={animeData.cover_art} />
                    <meta name="referrer" content="default" />
                </Helmet>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={9}>
                        <Box {...defaultBoxProps} className={classes.IframeContainer} bgcolor="background.level1">
                            {activeEpisode.episode_number
                                ?
                                watchLinks.length !== 0
                                    ?
                                    <>
                                        {/*TODO: Video ekranıyla link kutusunu bir dive al, ona background shadow ver.*/}
                                        {iframeLoading
                                            ?
                                            <Box className={classes.IframePlaceholder} bgcolor="common.black">
                                                <CircularProgress />
                                            </Box>
                                            :
                                            ""
                                        }
                                        {activeLink
                                            ?
                                            <iframe
                                                title="watch-screen"
                                                className={classes.Iframe}
                                                id="video-iframe"
                                                onLoad={() => setIframeLoading(false)}
                                                allowFullScreen
                                                data={""} />
                                            :
                                            ""
                                        }
                                        <div id="video-fallback" className={classes.FallbackContainer} />
                                    </>
                                    :
                                    episodeLoading ?
                                        ""
                                        :
                                        <ContentError
                                            {...defaultBoxProps}
                                            p={1}>
                                            <Typography variant="subtitle2">Link bulunamadı.</Typography>
                                        </ContentError>
                                :
                                <ContentWarning
                                    {...defaultBoxProps}
                                    p={1}>
                                    <Typography variant="subtitle2">Lütfen bölüm seçiniz.</Typography>
                                </ContentWarning>
                            }
                        </Box>
                        {watchLinksMapped.length !== 0
                            ?
                            <>
                                <Box
                                    {...defaultBoxProps}
                                    className={classes.LinksContainer}
                                    p={1}
                                    bgcolor="background.level1">
                                    <div className={classes.LinksButtonContainer}>
                                        {watchLinksMapped}
                                    </div>
                                </Box>
                            </>
                            :
                            ""
                        }
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box mb={2} className={classes.EpisodeContainer}>
                            {episodeDataMapped.length !== 0
                                ?
                                episodeDataMapped
                                :
                                ""
                            }
                        </Box>
                        <Box {...defaultBoxProps} mb={2} style={{ overflowWrap: "break-word" }}>
                            <Box>
                                <Grid container className={classes.MetadataContainer}>
                                    <Grid item xs={12} md={4}>
                                        <img src={animeData.cover_art} />
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Box p={2}>
                                            <Typography variant="h4" component="h1">
                                                <Dotdotdot clamp={2}>{animeData.name}</Dotdotdot>
                                            </Typography>
                                            {activeEpisode.credits ?
                                                <div>
                                                    <Typography variant="body1" component="span"><b>Emektar: </b></Typography>
                                                    <Typography variant="body1" component="span">{activeEpisode.credits}</Typography>
                                                </div>
                                                :
                                                ""
                                            }
                                            {activeEpisode.created_time ?
                                                <div>
                                                    <Typography variant="body1" component="span"><b>Eklenme Tarihi: </b></Typography>
                                                    <Typography variant="body1" component="span">{format(new Date(activeEpisode.created_time), "dd.MM.yyyy")}</Typography>
                                                </div>
                                                :
                                                ""
                                            }
                                        </Box>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Box>
                        <Box>
                            <Link to={animePage(props.match.params.slug)}>
                                <Button variant="contained" fullWidth>
                                    <Typography variant="h6">Animeye git</Typography>
                                </Button>
                            </Link>
                        </Box>
                    </Grid>
                    {activeEpisode.slug ?
                        <Grid item xs={12}>
                            <Box {...defaultBoxProps} p={2}>
                                <DisqusBox
                                    withButton
                                    config={{ identifier: `anime/${animeData.slug}/${activeEpisode.slug}` }} />
                            </Box>
                        </Grid>
                        : ""}
                </Grid>
            </>
        )
    }

    else if (!loading) {
        return (
            <>
                <Grid container>
                    <Typography variant="h1">Bölüm bulunamadı.</Typography>
                </Grid>
            </>
        )
    }

    else {
        return (
            <Loading />
        )
    }
}