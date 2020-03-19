import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga';

import Loading from '../../../components/progress/index'

import { useGlobal } from 'reactn'
import useTheme from '@material-ui/styles/useTheme'

import axios from '../../../config/axios/axios'

import AnimeIndexDesktop from './desktop'
import AnimeIndexMobile from './mobile';

import { format } from 'date-fns'
import { episodeParser } from '../../../components/ceviriler/components'
import DownloadLink from '../../../components/ceviriler/anime/download-links'
import { animePage } from '../../../config/front-routes'
import { getAnimeIndex } from '../../../config/api-routes'

export default function AnimePage(props) {
    const theme = useTheme()

    const [anime, setAnime] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [mobile] = useGlobal('mobile')

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios(
                getAnimeIndex(props.match.params.slug)
            ).catch(res => res)
            if (res.status === 200) {
                res.data.translators = res.data.translators.split(',')
                res.data.encoders = res.data.encoders.split(',')
                res.data.genres = res.data.genres.split(',')
                res.data.studios = res.data.studios.split(',')

                setAnime(res.data)
                setLoading(false)
            }
            else {
                setError(true)
                setLoading(false)
            }
        }

        fetchData()
        ReactGA.pageview(window.location.pathname)
    }, [props.match.params.slug])

    if (loading && error) {
        return (
            <Redirect to="/404" />
        )
    }

    if (!loading) {
        let downloadLinks = anime.episodes.map(data =>
            data.seen_download_page ?
                <DownloadLink
                    key={data.id}
                    title={episodeParser(data.episode_number, data.special_type)}
                    animeslug={anime.slug}
                    episodeid={data.id}
                    hoverbg={theme.palette.background.paper}
                    transition={theme.transitions.create('background', {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.short,
                    })} />
                : null
        )

        // Delete null objects from downloadLinks
        downloadLinks = downloadLinks.filter(d => d)

        const title = `${process.env.REACT_APP_SITENAME} ${anime.name} Türkçe ${anime.episodes.length !== 0 ? "İzle ve İndir" : ""}`
        return (
            <>
                <Helmet>
                    <title>{title}</title>
                    <meta name="title" content={title} />
                    <meta name="description" content={`${anime.name} Türkçe İzle & İndir - ${anime.synopsis}`} />
                    <meta name="keywords" content={process.env.REACT_APP_META_KEYWORDS} />
                    <meta property="og:type" content="video.tv_show" />
                    <meta property="og:site_name" content={process.env.REACT_APP_SITEURL} />
                    <meta property="og:url" content={process.env.REACT_APP_SITEURL + animePage(anime.slug)} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={`${anime.name} Türkçe İzle & İndir - ${anime.synopsis}`} />
                    <meta property="og:image" content={anime.cover_art} />
                    <meta name="twitter:card" content="summary" />
                    <meta property="twitter:url" content={process.env.REACT_APP_SITEURL + animePage(anime.slug)} />
                    <meta property="twitter:title" content={title} />
                    <meta property="twitter:description" content={`${anime.name} Türkçe İzle & İndir - ${anime.synopsis}`} />
                    <meta property="twitter:image:src" content={anime.cover_art} />
                    <meta name="referrer" content="default" />
                </Helmet>
                {
                    mobile
                        ?
                        <AnimeIndexMobile anime={anime} theme={theme} releasedate={format(new Date(anime.release_date), "dd.MM.yyyy")} downloadLinks={downloadLinks} />
                        :
                        <AnimeIndexDesktop anime={anime} theme={theme} releasedate={format(new Date(anime.release_date), "dd.MM.yyyy")} downloadLinks={downloadLinks} />
                }
            </>
        )
    }
    else return (
        <Loading />
    )
} 