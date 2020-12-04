import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Metatags from '../../../components/helmet/index'
import ReactGA from 'react-ga';
import { useTranslation } from 'react-i18next';

import axios from '../../../config/axios/axios'

import { AnimePage } from '../../../components/ceviriler/components'
import { animePage } from '../../../config/front-routes'
import { contentMetadata, getAnimeIndex } from '../../../config/api-routes'

import Loading from '../../../components/progress/index'

export default function Anime(props) {
    const { t } = useTranslation('pages')
    const [anime, setAnime] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
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

                if (res.data.genres) {
                    res.data.adult_modal = res.data.genres.search(/\+18/) !== -1 ? true : false
                    res.data.genres = res.data.genres.split(',')
                }
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
        return (
            <>
                <Metatags
                    title={t('anime.metadata.title',
                        {
                            site_name: process.env.REACT_APP_SITENAME,
                            anime_name: anime.name
                        })}
                    desc={t('anime.metadata.description',
                        {
                            site_name: process.env.REACT_APP_SITENAME,
                            anime_name: anime.name,
                            anime_synopsis: anime.synopsis
                        })}
                    url={animePage(anime.slug)}
                    content="video.tv_show"
                    image={process.env.REACT_APP_SITEURL + contentMetadata("anime", anime.slug)}
                    twitter_card={"summary_large_image"} />
                <AnimePage {...anime} />
            </>
        )
    }
    else return (
        <Loading />
    )
} 