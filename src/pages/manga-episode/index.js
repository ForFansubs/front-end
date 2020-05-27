import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { useStyles, defaultBoxProps } from '../../components/manga-episode/index'
import { getMangaEpisodePageInfo } from '../../config/api-routes'
import axios from '../../config/axios/axios'
import { Grid, Typography, Box } from '@material-ui/core'
import ContentError from '../../components/warningerrorbox/error'
import ContentWarning from '../../components/warningerrorbox/warning'
import DisqusBox from '../../components/disqus/disqus'

import { mangaEpisodePage } from '../../config/front-routes'
import Loading from '../../components/progress'

export default function (props) {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [mangaData, setMangaData] = useState({
        manga_name: "",
        manga_slug: "",
        cover_art: ""
    })
    const [episodeData, setEpisodeData] = useState([])
    const [activeEpisodeData, setActiveEpisodeData] = useState({
        manga_name: "",
        cover_art: "",
        credits: "",
        created_by: "",
        episode_name: "",
        episode_number: "",
        pages: []
    })

    useEffect(() => {
        const fetchData = async () => {
            const { slug } = props.match.params

            const pageInfo = await axios.get(getMangaEpisodePageInfo(slug))

            if (pageInfo.data.length === 0 || pageInfo.status !== 200) {
                return setLoading(false)
            }

            console.log(pageInfo)

            setMangaData({
                manga_name: pageInfo.data[0].manga_name,
                manga_slug: slug,
                cover_art: pageInfo.data[0].cover_art
            })

            setEpisodeData(pageInfo.data)

            setLoading(false)
        }

        fetchData()
    }, [])

    if (!loading && episodeData.length !== 0) {

        const title = `${mangaData.manga_name} ${activeEpisodeData.episode_number ? `${activeEpisodeData.episode_number}. Bölüm` : ""} Türkçe Oku - ${process.env.REACT_APP_SITENAME} Manga`
        const desc = `${mangaData.manga_name} ${activeEpisodeData.episode_number ? `${activeEpisodeData.episode_number}. Bölüm` : ""} Türkçe Oku ve İndir - ${process.env.REACT_APP_SITENAME} Manga Oku`

        return (
            <>
                <Helmet>
                    <title>{title}</title>
                    <meta name="title" content={title} />
                    <meta name="description" content={desc} />
                    <meta name="keywords" content={process.env.REACT_APP_META_KEYWORDS} />
                    <meta property="og:type" content="video.tv_show" />
                    <meta property="og:site_name" content={process.env.REACT_APP_SITEURL} />
                    <meta property="og:url" content={process.env.REACT_APP_SITEURL + mangaEpisodePage(props.match.params.slug, activeEpisodeData.slug)} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={desc} />
                    <meta property="og:image" content={activeEpisodeData.cover_art} />
                    <meta name="twitter:card" content="summary" />
                    <meta property="twitter:url" content={process.env.REACT_APP_SITEURL + mangaEpisodePage(props.match.params.slug, activeEpisodeData.slug)} />
                    <meta property="twitter:title" content={title} />
                    <meta property="twitter:description" content={desc} />
                    <meta property="twitter:image:src" content={activeEpisodeData.cover_art} />
                    <meta name="referrer" content="default" />
                </Helmet>
                <Grid container spacing={2} justify="center">
                    <Grid xs={12}>

                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Box {...defaultBoxProps} className={classes.IframeContainer} bgcolor="background.level1">
                            {activeEpisodeData.episode_number
                                ?
                                <p>Deneme</p>
                                :
                                <ContentWarning
                                    {...defaultBoxProps}
                                    p={1}>
                                    <Typography variant="subtitle2">Lütfen bölüm seçiniz.</Typography>
                                </ContentWarning>
                            }
                        </Box>
                    </Grid>
                    {activeEpisodeData.episode_number ?
                        <Grid item xs={12}>
                            <Box {...defaultBoxProps} p={2}>
                                <DisqusBox
                                    withButton
                                    config={{ identifier: `manga/${mangaData.slug}/${activeEpisodeData.episode_number}` }} />
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