import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Metatags from '../../../components/helmet/index'
import ReactGA from 'react-ga';

import Loading from '../../../components/progress/index'

import { useGlobal } from 'reactn'
import useTheme from '@material-ui/styles/useTheme'

import axios from '../../../config/axios/axios'

import { AnimePage } from '../../../components/ceviriler/components'

import { episodeParser } from '../../../components/ceviriler/components'
import DownloadLink from '../../../components/ceviriler/anime/download-links'
import { animePage } from '../../../config/front-routes'
import { getAnimeIndex } from '../../../config/api-routes'

export default function (props) {
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
                if (res.data.translators)
                    res.data.translators = res.data.translators.split(',')
                else
                    res.data.translators = []

                if (res.data.encoders)
                    res.data.encoders = res.data.encoders.split(',')
                else
                    res.data.encoders = []

                if (res.data.genres)
                    res.data.genres = res.data.genres.split(',')
                else
                    res.data.genres = []

                if (res.data.studios)
                    res.data.studios = res.data.studios.split(',')
                else
                    res.data.studios = []

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
                    episodeid={data.id} />
                : null
        )

        // Delete null objects from downloadLinks
        downloadLinks = downloadLinks.filter(d => d)

        const title = `${process.env.REACT_APP_SITENAME} ${anime.name} Türkçe ${anime.episodes.length !== 0 ? "İzle ve İndir" : ""}`
        const desc = `${anime.name} Türkçe İzle & İndir - ${anime.synopsis}`
        return (
            <>
                <Metatags title={title} desc={desc} url={animePage(anime.slug)} content="video.tv_show" image={anime.cover_art} />
                <AnimePage {...anime} downloadLinks={downloadLinks} />
            </>
        )
    }
    else return (
        <Loading />
    )
} 