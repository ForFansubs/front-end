import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import Find from 'lodash-es/find'
import { useStyles, defaultBoxProps } from '../../components/manga-episode/index'
import { getMangaEpisodePageInfo, mangaPageImage } from '../../config/api-routes'
import axios from '../../config/axios/axios'
import { Grid, Typography, Box, Button, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core'
import { NavigateNext, NavigateBefore } from '@material-ui/icons'
import ContentError from '../../components/warningerrorbox/error'
import ContentWarning from '../../components/warningerrorbox/warning'
import DisqusBox from '../../components/disqus/disqus'

import { mangaEpisodePage } from '../../config/front-routes'
import Loading from '../../components/progress'

export default function MangaEpisodePage(props) {
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
    const [activePageNumber, setActivePageNumber] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const { slug } = props.match.params

            const pageInfo = await axios.get(getMangaEpisodePageInfo(slug))

            if (pageInfo.data.length === 0 || pageInfo.status !== 200) {
                return setLoading(false)
            }

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

    function handleChange(event) {
        setActivePageNumber(0)
        const newData = Find(episodeData, { episode_number: event.target.value })
        setActiveEpisodeData(state => ({ ...state, ...newData, pages: JSON.parse(newData.pages) }));
    }

    function handleNavigateBeforeButton() {
        setActivePageNumber(state => (
            state === 0 ? 0 : state - 1
        ))
    }

    function handleNavigateNextButton() {
        setActivePageNumber(state => (
            state === activeEpisodeData.pages.length - 1 ? state : state + 1
        ))
    }

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
                    <Grid item xs={12}>
                        <Box className={classes.Navigator}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="episode-selector">Okumak istediğiniz bölümü seçin</InputLabel>
                                <Select
                                    fullWidth
                                    value={`${activeEpisodeData.episode_number}`}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "episode",
                                        id: "episode-selector"
                                    }}
                                >
                                    {episodeData.map(d => <MenuItem key={d.episode_number} value={`${d.episode_number}`}>{d.episode_number}. Bölüm - {d.episode_name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <div className={classes.NavigatorButtonContainer}>
                                <Button
                                    className={classes.NavigateBefore}
                                    fullWidth
                                    variant="outlined"
                                    onClick={handleNavigateBeforeButton}
                                    disabled={activePageNumber !== 0 && activeEpisodeData.episode_number ? false : true}>
                                    <NavigateBefore />
                                </Button>
                                <Button
                                    className={classes.NavigateNext}
                                    fullWidth
                                    variant="outlined"
                                    onClick={handleNavigateNextButton}
                                    disabled={activePageNumber !== activeEpisodeData.pages.length - 1 && activeEpisodeData.episode_number ? false : true}>
                                    <NavigateNext />
                                </Button>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Box display="flex" justifyContent="center">
                            {activeEpisodeData.episode_number
                                ?
                                <img
                                    className={classes.MainPageImage}
                                    src={mangaPageImage(mangaData.manga_slug, activeEpisodeData.episode_number, activeEpisodeData.pages[activePageNumber].filename)}
                                    alt={`${mangaData.manga_name} ${activeEpisodeData.episode_number}. Bölüm ${activePageNumber + 1}. Sayfa`} />
                                :
                                <ContentWarning
                                    {...defaultBoxProps}
                                    p={1}>
                                    Lütfen bölüm seçiniz.
                                </ContentWarning>
                            }
                        </Box>
                    </Grid>
                    {activeEpisodeData.episode_number ?
                        <Grid item xs={12}>
                            <Box {...defaultBoxProps} p={2}>
                                <DisqusBox
                                    withButton
                                    config={{ identifier: `manga/${mangaData.manga_slug}/${activeEpisodeData.episode_number}` }} />
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