import React, { useEffect, useState, useRef } from 'react'
import { useGlobal, useDispatch } from 'reactn'
import Metatags from '../../components/helmet/index'
import ReactGA from 'react-ga'
import axios from '../../config/axios/axios'
import Find from 'lodash-es/find'

import { useStyles, defaultBoxProps } from '../../components/manga-episode/index'
import { getMangaEpisodePageInfo, mangaPageImage } from '../../config/api-routes'
import { Grid, Typography, Box, Button, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core'
import { NavigateNext, NavigateBefore, Image, BurstMode } from '@material-ui/icons'
import ContentWarning from '../../components/warningerrorbox/warning'
import DisqusBox from '../../components/disqus/disqus'
import MotdContainer from '../../components/motd'

import { mangaEpisodePage, mangaPage } from '../../config/front-routes'
import Loading from '../../components/progress'
import { Link } from 'react-router-dom'

export default function MangaEpisodePage(props) {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [mangaData, setMangaData] = useState({
        manga_name: "",
        manga_slug: "",
        manga_cover: ""
    })
    const [episodeData, setEpisodeData] = useState([])
    const [activeEpisodeData, setActiveEpisodeData] = useState({
        id: null,
        manga_name: "",
        manga_cover: "",
        credits: "",
        created_by: "",
        episode_name: "",
        episode_number: "",
        pages: []
    })
    const [activePageNumber, setActivePageNumber] = useState(1)
    const [settings] = useGlobal('settings')
    const [mobile] = useGlobal('mobile')
    const setSettings = useDispatch('setSettings')

    const NavigatorRef = useRef()

    useEffect(() => {
        const { slug, episode_number, page_number } = props.match.params

        const fetchData = async () => {
            let pageInfo

            setMangaData({
                manga_slug: slug,
            })

            try {
                pageInfo = await axios.get(getMangaEpisodePageInfo(slug))
            } catch (err) {
                return setLoading(false)
            }

            if (pageInfo.data.length === 0 || pageInfo.status !== 200) {
                return setLoading(false)
            }

            setMangaData(state => ({
                ...state,
                manga_name: pageInfo.data[0].manga_name,
                manga_cover: pageInfo.data[0].manga_cover
            }))

            if (episode_number) {
                const newData = Find(pageInfo.data, { episode_number: episode_number })
                if (newData) {
                    const pages = newData.pages
                    setActiveEpisodeData(state => ({ ...state, ...newData, pages: pages }))
                    // Gelen sayfa numarası, var olan sayfalara uyuşuyor mu bak. Çok büyük
                    // ya da çok küçükse varolan değeri ata.
                    setActivePageNumber(state => (
                        page_number <= pages.length && page_number >= 1 ? Number(page_number) : state
                    ))
                }
            }

            setEpisodeData(pageInfo.data)
            setLoading(false)
        }

        fetchData()
    }, [])

    useEffect(() => {
        const { slug } = props.match.params

        window.history.replaceState("", "", mangaEpisodePage(slug, activeEpisodeData.episode_number, activePageNumber))
        ReactGA.pageview(window.location.pathname)
        // eslint-disable-next-line
    }, [activeEpisodeData, activePageNumber])

    function handleChange(event) {
        setActivePageNumber(1)
        const newData = Find(episodeData, { episode_number: event.target.value })
        setActiveEpisodeData(state => ({ ...state, ...newData, pages: newData.pages }));
    }

    function handleNavigateBeforeButton() {
        setActivePageNumber(state => (
            state === 1 ? 1 : state - 1
        ))
    }

    function handleNavigateNextButton() {
        setActivePageNumber(state => (
            state === activeEpisodeData.pages.length ? state : state + 1
        ))
    }

    function handleReadingStyleChangeButton() {
        // İki tür var. "pagebypage" ve "webtoon"
        if (settings.readingStyle === "pagebypage") setSettings("readingStyle", "webtoon")
        else setSettings("readingStyle", "pagebypage")
    }

    function handleCenteringPage() {
        // Header için 64 height ekle
        const offset = NavigatorRef.current.clientHeight + 48
        document.getElementById('scroll-node').scrollTo({
            top: offset
        })
    }

    if (!loading && episodeData.length !== 0) {

        const title = `${mangaData.manga_name} ${activeEpisodeData.episode_number ? `${activeEpisodeData.episode_number}. Bölüm` : ""} Türkçe Oku - ${process.env.REACT_APP_SITENAME} Manga`
        const desc = `${mangaData.manga_name} ${activeEpisodeData.episode_number ? `${activeEpisodeData.episode_number}. Bölüm` : ""} Türkçe Oku ve İndir - ${process.env.REACT_APP_SITENAME} Manga Oku`

        return (
            <>
                <Metatags title={title} desc={desc} url={process.env.REACT_APP_SITEURL + mangaEpisodePage(props.match.params.slug, mangaData.slug)} content="books.book" image={mangaData.manga_cover} />
                <Grid container spacing={2} justify="center" className={classes.Container}>
                    <Grid item xs={12}>
                        <MotdContainer {...props} content_type="manga-episode" content_id={activeEpisodeData.id} />
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.Navigator} ref={NavigatorRef}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="episode-selector">Okumak istediğiniz bölümü seçin</InputLabel>
                                <Select
                                    fullWidth
                                    native={mobile}
                                    value={`${activeEpisodeData.episode_number}`}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "episode",
                                        id: "episode-selector"
                                    }}
                                >
                                    {episodeData.map(d => mobile ? <option key={d.episode_number} value={`${d.episode_number}`}>{d.episode_number}. Bölüm: {d.episode_name}</option> : <MenuItem key={d.episode_number} value={`${d.episode_number}`}>{d.episode_number}. Bölüm: {d.episode_name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            {settings.readingStyle === "pagebypage" ?
                                <>
                                    <Button
                                        size="large"
                                        className={classes.NavigateBefore}
                                        variant="outlined"
                                        onClick={handleNavigateBeforeButton}
                                        disabled={activePageNumber !== 1 && activeEpisodeData.episode_number ? false : true}>
                                        <NavigateBefore />
                                    </Button>
                                    <Button
                                        size="large"
                                        className={classes.NavigateNext}
                                        variant="outlined"
                                        onClick={handleNavigateNextButton}
                                        disabled={activePageNumber !== activeEpisodeData.pages.length && activeEpisodeData.episode_number ? false : true}>
                                        <NavigateNext />
                                    </Button>
                                </>
                                : ""}
                            <div className={classes.ReadingStyleButtonContainer}>
                                <Button
                                    className={classes.PagebyPage}
                                    variant="outlined"
                                    onClick={handleReadingStyleChangeButton}>
                                    {settings.readingStyle === "pagebypage" ?
                                        <><BurstMode />Webtoon</>
                                        :
                                        <><Image />Sayfa Sayfa</>
                                    }
                                </Button>
                                <Link to={mangaPage(mangaData.manga_slug)}>
                                    <Button
                                        className={classes.ToManga}
                                        variant="outlined"
                                    >
                                        Mangaya git
                                    </Button>
                                </Link>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <div className={classes.ImageContainer}>
                            {activeEpisodeData.episode_number
                                ?
                                settings.readingStyle === "pagebypage" ?
                                    <>
                                        <img
                                            className={classes.MainPageImage}
                                            src={mangaPageImage(mangaData.manga_slug, activeEpisodeData.episode_number, activeEpisodeData.pages[(activePageNumber - 1)].filename)}
                                            alt={`${mangaData.manga_name} ${activeEpisodeData.episode_number}. Bölüm ${activePageNumber}. Sayfa`}
                                            onLoad={_ => {
                                                handleCenteringPage()
                                            }} />
                                        <div className={classes.ImageOverlayContainer}>
                                            <div
                                                className={classes.ImageOverlay}
                                                onClick={handleNavigateBeforeButton}
                                                title="Önceki Sayfa"
                                            />
                                            <div
                                                className={classes.ImageOverlay}
                                                onClick={handleNavigateNextButton}
                                                title="Sonraki Sayfa" />
                                        </div>
                                    </>
                                    :
                                    <div className={classes.WebtoonContainer}>
                                        {activeEpisodeData.pages.map((page, index) => (
                                            <img
                                                key={page.filename}
                                                loading="lazy"
                                                className={classes.MainPageImage}
                                                width="900px"
                                                height="1270px"
                                                src={mangaPageImage(mangaData.manga_slug, activeEpisodeData.episode_number, page.filename)}
                                                alt={`${mangaData.manga_name} ${activeEpisodeData.episode_number}. Bölüm ${index + 1}. Sayfa`} />
                                        ))}
                                    </div>
                                :
                                <ContentWarning
                                    {...defaultBoxProps}
                                    p={1}>
                                    Lütfen bölüm seçiniz.
                                </ContentWarning>
                            }
                        </div>
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