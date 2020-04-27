import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import ReactGA from 'react-ga';
import Metatags from '../../../components/helmet/index'

import Loading from '../../../components/progress/index'

import { useGlobal } from 'reactn'
import useTheme from '@material-ui/styles/useTheme'

import axios from '../../../config/axios/axios'

import { MangaPage } from '../../../components/ceviriler/components'

import { mangaPage } from '../../../config/front-routes'
import { getMangaIndex } from '../../../config/api-routes'



export default function (props) {
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
        const desc = `${manga.name} Türkçe Oku & İndir - ${manga.synopsis}`
        return (
            <>
                <Metatags title={title} desc={desc} url={mangaPage(manga.slug)} content="books.book" image={manga.cover_art} />
                <MangaPage {...manga} />
            </>
        )


    }
    else return (
        <Loading />
    )
}