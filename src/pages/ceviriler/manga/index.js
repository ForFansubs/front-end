import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ReactGA from 'react-ga';

import Loading from '../../../components/progress/index'

import { useGlobal } from 'reactn'
import useTheme from '@material-ui/styles/useTheme'

import axios from '../../../config/axios/axios'

import { MangaPage } from '../../../components/ceviriler/components'

import { mangaPage } from '../../../config/front-routes'
import { getMangaIndex } from '../../../config/api-routes'



export default (props) => {
    const theme = useTheme()

    const [manga, setManga] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [mobile] = useGlobal('mobile')

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios(
                getMangaIndex(props.match.params.slug),
            ).catch(res => res)

            if (res.status === 200) {
                res.data.translators = res.data.translators.split(',')
                res.data.editors = res.data.editors.split(',')
                res.data.genres = res.data.genres.split(',')
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
        const title = `${process.env.REACT_APP_SITENAME} ${manga.name} Türkçe ${manga.mos_link ? "Oku" : ""} ${manga.download_link ? "İndir" : ""}`

        return (
            <>
                <Helmet>
                    <title>{title}</title>
                    <meta name="title" content={title} />
                    <meta name="description" content={`${manga.name} Türkçe Oku & İndir - ${manga.synopsis}`} />
                    <meta name="keywords" content={process.env.REACT_APP_META_KEYWORDS} />
                    <meta property="og:type" content="books.book" />
                    <meta property="og:site_name" content={process.env.REACT_APP_SITEURL} />
                    <meta property="og:url" content={process.env.REACT_APP_SITEURL + mangaPage(manga.slug)} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={`${manga.name} Türkçe Oku & İndir - ${manga.synopsis}`} />
                    <meta property="og:image" content={manga.cover_art} />
                    <meta name="twitter:card" content="summary" />
                    <meta property="twitter:url" content={process.env.REACT_APP_SITEURL + mangaPage(manga.slug)} />
                    <meta property="twitter:title" content={title} />
                    <meta property="twitter:description" content={`${manga.name} Türkçe Oku & İndir - ${manga.synopsis}`} />
                    <meta property="twitter:image:src" content={manga.cover_art} />
                    <meta name="referrer" content="default" />
                </Helmet>
                <MangaPage {...manga} />
            </>
        )


    }
    else return (
        <Loading />
    )
}