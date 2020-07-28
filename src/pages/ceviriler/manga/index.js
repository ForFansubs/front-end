import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import ReactGA from 'react-ga';
import Metatags from '../../../components/helmet/index'
import { useTranslation } from 'react-i18next';

import axios from '../../../config/axios/axios'

import { MangaPage } from '../../../components/ceviriler/components'
import { mangaPage } from '../../../config/front-routes'
import { getMangaIndex } from '../../../config/api-routes'

import Loading from '../../../components/progress/index'

export default function (props) {
    const { t } = useTranslation('pages')
    const [manga, setManga] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios(
                getMangaIndex(props.match.params.slug),
            ).catch(res => res)

            if (res.status === 200) {
                if (res.data.translators)
                    res.data.translators = res.data.translators.split(',')
                if (res.data.editors)
                    res.data.editors = res.data.editors.split(',')
                if (res.data.genres) {
                    res.data.adult_modal = res.data.genres.search(/\+18/) !== -1 ? true : false
                    res.data.genres = res.data.genres.split(',')
                }
                if (res.data.authors)
                    res.data.authors = res.data.authors.split(',')

                setManga(res.data)
                setLoading(false)
            }
            else {
                setError(true)
                setLoading(false)
            }
        }

        fetchData()
        ReactGA.pageview(window.location.pathname)
    }, [props.match.params.slug]);

    if (loading && error) {
        return (
            <Redirect to="/404" />
        )
    }

    if (!loading) {
        return (
            <>
                <Metatags
                    title={t('manga.metadata.title', { site_name: process.env.REACT_APP_SITENAME, manga_name: manga.name })}
                    desc={t('manga.metadata.description', { site_name: process.env.REACT_APP_SITENAME, manga_name: manga.name, manga_synopsis: manga.synopsis })}
                    url={mangaPage(manga.slug)}
                    content="video.tv_show"
                    image={manga.cover_art} />
                <MangaPage {...manga} />
            </>
        )


    }
    else return (
        <Loading />
    )
}