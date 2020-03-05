import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga';

import Loading from '../../../components/progress/index'

import { useGlobal } from 'reactn'
import useTheme from '@material-ui/styles/useTheme'

import axios from '../../../config/axios/axios'

import { format } from 'date-fns'
import MangaIndexDesktop from './desktop'
import { mangaPage } from '../../../config/front-routes'
import { getMangaIndex } from '../../../config/api-routes'
import MangaIndexMobile from './mobile';



export default function MangaPage(props) {
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

        if (!mobile) {
            return (
                <>
                    <Helmet>
                        <title>{title}</title>
                        <meta name="title" content={title} />
                        <meta name="description" content={`${manga.name} Türkçe İzle & İndir - ${manga.synopsis}`} />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content={process.env.REACT_APP_SITEURL + mangaPage(manga.slug)} />
                        <meta property="og:title" content={title} />
                        <meta property="og:description" content={`${manga.name} Türkçe İzle & İndir - ${manga.synopsis}`} />
                        <meta property="og:image" content={manga.cover_art} />
                        <meta property="twitter:card" content="summary_large_image" />
                        <meta property="twitter:url" content={process.env.REACT_APP_SITEURL + mangaPage(manga.slug)} />
                        <meta property="twitter:title" content={title} />
                        <meta property="twitter:description" content={`${manga.name} Türkçe İzle & İndir - ${manga.synopsis}`} />
                        <meta property="twitter:image" content={manga.cover_art} />
                    </Helmet>
                    <MangaIndexDesktop manga={manga} theme={theme} releasedate={format(new Date(manga.release_date), "dd.MM.yyyy")} />
                </>
            )
        }

        else {
            return (
                <>
                    <Helmet>
                        <title>{title}</title>
                        <meta name="title" content={title} />
                        <meta name="description" content={`${manga.name} Türkçe İzle & İndir - ${manga.synopsis.substring(0, 80)}`} />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content={process.env.REACT_APP_SITEURL + mangaPage(manga.slug)} />
                        <meta property="og:title" content={title} />
                        <meta property="og:description" content={`${manga.name} Türkçe İzle & İndir - ${manga.synopsis.substring(0, 80)}`} />
                        <meta property="og:image" content={manga.cover_art} />
                        <meta property="twitter:card" content="summary_large_image" />
                        <meta property="twitter:url" content={process.env.REACT_APP_SITEURL + mangaPage(manga.slug)} />
                        <meta property="twitter:title" content={title} />
                        <meta property="twitter:description" content={`${manga.name} Türkçe İzle & İndir - ${manga.synopsis.substring(0, 80)}`} />
                        <meta property="twitter:image" content={manga.cover_art} />
                    </Helmet>
                    <MangaIndexMobile manga={manga} theme={theme} releasedate={format(new Date(manga.release_date), "dd.MM.yyyy")} />
                </>
            )
        }

    }
    else return (
        <Loading />
    )
}