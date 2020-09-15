import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { useTranslation } from "react-i18next"
import Find from "lodash-es/find"
import Slice from "lodash-es/slice"
import clsx from "clsx"
import { Grid, Typography, Box, Button, makeStyles, Divider, fade, Modal } from "@material-ui/core"
import { blue, grey, lime, purple, red } from "@material-ui/core/colors"
import { WarningSharp } from "@material-ui/icons"
import { ResponsiveBar } from "@nivo/bar";

import { bluray, CoverPlaceholder } from "../../config/theming/images"
import { getAnimeWatchIndex, mangaEpisodePage } from "../../config/front-routes"
import { contentHeader, contentLogo, contentCover, jikanAPI, youtubeEmbedLink } from "../../config/api-routes"

import DisqusBox from "../../components/disqus/disqus"
import WarningBox from "../warningerrorbox/warning"
import DownloadLink from "./anime/download-links"
import MotdContainer from "../motd"
import EpisodeTitleParser from "../../config/episode-title-parser"
import Format from "../date-fns/format"
import axios from "../../config/axios/axios"
import Loading from "../progress"
import Dotdotdot from "react-dotdotdot"

const useStyles = makeStyles((theme) => ({
    Container: {
        position: "relative",
    },
    BackgroundContainer: {
        overflow: "hidden",
        position: "relative",
        margin: theme.overrides.defaultMarginOverride,
        marginBottom: 0,

        [theme.breakpoints.down("sm")]: {
            margin: theme.overrides.defaultMarginMobileOverride,
            marginBottom: 0
        },
    },
    MetadataContainer: {
        position: "relative",
        margin: theme.overrides.defaultMarginOverride,
        marginTop: 0,
        marginBottom: 0,
        padding: `${theme.spacing(2)}px ${theme.spacing(7)}px`,
        backgroundColor: theme.palette.background.default,
        textAlign: "center",

        [theme.breakpoints.down("sm")]: {
            margin: theme.overrides.defaultMarginMobileOverride,
            marginTop: 0,
            marginBottom: 0
        }
    },
    JikanStatsContainer: {
        margin: theme.spacing(2, 0, 3)
    },
    BackgroundImage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        overflow: "hidden",
        "& img": {
            position: "absolute",
            objectFit: "cover",
            width: "70%",
            height: "100%",
            top: "50%",
            left: "65%",
            transform: "translate(-50%, -50%)",
        },
        [theme.breakpoints.down("xs")]: {
            paddingBottom: "80%",
            "& img": {
                marginTop: 0,
            },
        },
    },
    BackgroundImageOverlay: {
        //eslint-disable-next-line
        background: `linear-gradient(90deg, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 35%, ${fade(theme.palette.background.default, 0)} 50%)`,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        [theme.breakpoints.down("xs")]: {
            background: `linear-gradient(90deg, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 35%, ${fade(theme.palette.background.default, 0)} 100%)`,
        },
    },
    FallbackBackgroundImage: {
        filter: "blur(5px)",
        opacity: 0.8,
    },
    CoverArtContainer: {
        maxWidth: 225 - theme.spacing(2),
        width: 225 - theme.spacing(2),
        display: "none",
        [theme.breakpoints.down("sm")]: {
            maxWidth: "70%",
            width: "70%",
        },

        "& img": {
            width: "inherit",
        },
    },
    FallbackCoverArt: {
        display: "block",
        zIndex: 2,
        boxShadow: theme.shadows[6],
        height: "auto!important",
        [theme.breakpoints.down('sm')]: {
            display: "none"
        }
    },
    LogoImage: {
        "& img": {
            width: 400,
            [theme.breakpoints.down('sm')]: {
                width: "100%"
            }
        }
    },
    AnimeContainer: {
        position: "relative",
        zIndex: 2,
        padding: theme.spacing(7),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(3),
        }
    },
    PremieredContainer: {
        color: theme.palette.type === "dark" ? theme.palette.grey["400"] : theme.palette.text.primary,
    },
    TextContainer: {
        width: "45%",
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        }
    },
    SynopsisContainer: {
        whiteSpace: "pre-wrap",
    },
    ContentButton: {
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        boxShadow: theme.shadows[6]
    },
    BottomStuff: {
        margin: theme.spacing(2, 0)
    },
    DownloadLinkDivider: {
        marginBottom: theme.spacing(1),
    },
    ModalContainer: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        }
    },
    JikanStatsScoresChart: {
        padding: theme.spacing(0, 2, 2, 2),
        boxShadow: theme.shadows[6],
        backgroundColor: theme.palette.background.paper,
        "& text": {
            y: "-10px!important",
            fill: `${theme.palette.getContrastText(theme.palette.background.default)}!important`
        },
        "&:hover": {
            "& $JikanStatsScoresChartText": {
                display: "block"
            }
        }
    },
    JikanStatsScoresChartText: {
        display: "none"
    },
    JikanStatsStatusChart: {
        padding: theme.spacing(2),
        boxShadow: theme.shadows[6],
        backgroundColor: theme.palette.background.paper
    },
    JikanStatsStatusChartList: {
        display: "grid",
        gridAutoFlow: "column",
        justifyContent: "space-around",
        margin: theme.spacing(1, 0)
    },
    JikanStatsStatusChartItem: {
        textAlign: "center"
    },
    JikanStatsStatusChartItemHeaderText: {
        width: "100%",
        padding: theme.spacing(0.5, 2)
    },
    YoutubePreview: {
        boxShadow: theme.shadows[6],
        backgroundColor: theme.palette.background.paper,
        display: "flex"
    },
    JikanDataErrorBox: {
        height: 250,
        boxShadow: theme.shadows[6],
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "& svg": {
            fontSize: "3rem"
        }
    },
    CharactersStaffBoxList: {
        display: "grid",
        gridGap: theme.spacing(2),
        gridTemplateColumns: "repeat(3,1fr)",
        marginBottom: theme.spacing(1)
    },
    CharactersStaffBoxItem: {
        display: "inline-grid",
        height: theme.spacing(10),
        boxShadow: theme.shadows[6],
        backgroundColor: theme.palette.background.paper
    },
    CharactersStaffBoxCharacter: {
        gridTemplateColumns: "50% 50%",
        gridTemplateAreas: "'chr stff'"
    },
    CharactersStaffBoxStaff: {
        gridTemplateColumns: "100%",
        gridTemplateAreas: "stff"
    },
    CharactersStaffBoxItemImage: {
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%"
    },
    CharactersStaffBoxItemCharacter: {
        display: "inline-grid",
        gridTemplateColumns: "50% 50%",
        "& $CharactersStaffBoxItemText": {
            padding: theme.spacing(1, 0, 1, 1)
        }
    },
    CharactersStaffBoxItemStaff: {
        textAlign: "right",
        display: "inline-grid",
        gridTemplateColumns: "50% 50%",
        "& $CharactersStaffBoxItemText": {
            padding: theme.spacing(1, 1, 1, 0)
        }
    },
    CharactersStaffBoxStaffOverride: {
        gridTemplateColumns: "25% 75%",
    },
    CharactersStaffBoxItemText: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    CharactersStaffBoxShowMore: {
        textAlign: "right",
        marginBottom: theme.spacing(2)
    }
}))

function AnimePage(props) {
    const { t } = useTranslation(['components', 'common'])
    const {
        id,
        name,
        slug,
        cover_art,
        premiered,
        version,
        translators,
        pv,
        encoders,
        studios,
        release_date,
        genres,
        mal_link,
        synopsis,
        episodes,
        series_status,
        trans_status,
        episode_count } = props
    const classes = useStyles(props)
    const [headerError, setHeaderError] = useState(false)
    const [coverArtError, setCoverArtError] = useState(false)
    const [logoError, setLogoError] = useState(false)
    const [adultModal, setAdultModal] = useState(props.adult_modal)

    // Jikan States
    const [jikanScoreStatusDataLoading, setJikanScoreStatusDataLoading] = useState(true)
    const [jikanCharacterStaffDataLoading, setJikanCharacterStaffDataLoading] = useState(true)
    const [jikanScoreData, setJikanScoreData] = useState([])
    const [jikanStatusData, setJikanStatusData] = useState({})
    const [jikanCharactersData, setJikanCharactersData] = useState([])
    const [jikanStaffData, setJikanStaffData] = useState([])

    useEffect(() => {
        async function getJikanStatusData() {
            const tempData = []
            try {
                const res = await axios.get(jikanAPI({ contentType: "anime", contentId: mal_link.split("/")[4], extraPath: "stats" }))

                if (res.status === 200) {
                    for (const score in res.data.scores) {
                        tempData.push({
                            score: score,
                            "votesColor": getVoteColor(score),
                            ...res.data.scores[score]
                        })
                    }

                    setJikanScoreData(tempData)
                    setJikanStatusData({
                        completed: res.data.completed || 0,
                        watching: res.data.watching || 0,
                        dropped: res.data.dropped || 0,
                        on_hold: res.data.on_hold || 0,
                        plan_to_watch: res.data.plan_to_watch || 0,
                    })
                    setJikanScoreStatusDataLoading(false)
                }
                else {
                    setJikanScoreStatusDataLoading(false)
                }
            } catch (err) {
                setJikanScoreStatusDataLoading(false)
            }
        }

        async function getJikanCharactersData() {
            try {
                const res = await axios.get(jikanAPI({ contentType: "anime", contentId: mal_link.split("/")[4], extraPath: "characters_staff" }))

                if (res.status === 200) {
                    setJikanCharactersData(res.data.characters)
                    setJikanStaffData(res.data.staff)
                    setJikanCharacterStaffDataLoading(false)
                }
                else {
                    setJikanCharacterStaffDataLoading(false)
                }
            } catch (err) {
                setJikanCharacterStaffDataLoading(false)
            }
        }

        getJikanStatusData()
        getJikanCharactersData()
    }, [])

    let batchLinks = episodes.map((data) =>
        data.can_user_download && data.special_type === "toplu" ? (
            <DownloadLink
                key={data.id}
                title={EpisodeTitleParser(data.anime_name, data.episode_number, data.special_type).title}
                animeslug={slug}
                episodeid={data.id}
            />
        ) : null
    )

    let downloadLinks = episodes.map((data) =>
        data.can_user_download && data.special_type !== "toplu" ? (
            <DownloadLink
                key={data.id}
                title={EpisodeTitleParser(data.anime_name, data.episode_number, data.special_type).title}
                animeslug={slug}
                episodeid={data.id}
            />
        ) : null
    )

    function handleClose() {
        return setAdultModal(state => (!state))
    }

    // Delete null objects from downloadLinks
    batchLinks = batchLinks.filter((b) => b)
    downloadLinks = downloadLinks.filter((d) => d)

    return (
        <>
            <AdultModal open={adultModal} handleClose={handleClose} />
            <div className={classes.Container}>
                <div className={classes.BackgroundContainer}>
                    <div className={classes.AnimeContainer}>
                        <MotdContainer {...props} content_type="anime" content_id={id} />
                        <div className={classes.TextContainer}>
                            <Box mb={2}>
                                <Typography variant="h4" component="h6" className={classes.PremieredContainer}>
                                    {premiered ? premiered : null}
                                    {version === "bd" ? (
                                        <img
                                            loading="lazy"
                                            src={bluray}
                                            alt=""
                                            style={{ height: "1rem" }}
                                        />
                                    ) : null}
                                </Typography>
                                {logoError ? (
                                    <Typography variant="h3" component="h1">
                                        {name}
                                    </Typography>
                                ) : (
                                        <Box className={classes.LogoImage}>
                                            <img
                                                loading="lazy"
                                                alt=""
                                                src={contentLogo("anime", slug)}
                                                onError={(img) => {
                                                    setLogoError(true)
                                                    img.target.style.display =
                                                        "none"
                                                }}
                                            ></img>
                                        </Box>
                                    )}
                                <Typography
                                    variant="body1"
                                    className={classes.SynopsisContainer}
                                >
                                    {synopsis ? synopsis : t('common:warnings.not_found_synopsis')}
                                </Typography>
                            </Box>
                            <Box display="flex" flexWrap="wrap">
                                <MetadataContainer
                                    title={t('common:ns.translator', { count: translators.length })}
                                    list={translators}
                                />
                                <MetadataContainer
                                    title={t('common:ns.encoder', { count: encoders.length })}
                                    list={encoders}
                                />
                            </Box>
                            <Box display="flex" flexWrap="wrap">
                                <MetadataContainer
                                    title={t('common:ns.studio', { count: studios.length })}
                                    list={studios}
                                />
                                <MetadataContainer
                                    title={t('common:ns.release_date')}
                                    list={[
                                        Format(
                                            new Date(release_date)
                                        ),
                                    ]}
                                />
                            </Box>
                            <Box mt={2}>
                                {episodes.length !== 0 ? (
                                    <Link to={getAnimeWatchIndex(slug)}>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            className={classes.ContentButton}
                                        >
                                            {t('common:ns.watch')}
                                        </Button>
                                    </Link>
                                ) : null}
                                {mal_link ? (
                                    <a
                                        href={mal_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            className={classes.ContentButton}
                                        >
                                            {t('common:ns.mal_page')}
                                        </Button>
                                    </a>
                                ) : null}
                            </Box>
                        </div>
                    </div>
                    <div className={classes.BackgroundImage}>
                        {headerError ? (
                            <img
                                loading="lazy"
                                alt=""
                                src={contentCover("anime", slug)}
                                className={clsx(classes.CoverArtContainer, {
                                    [classes.FallbackCoverArt]: headerError,
                                })}
                                onError={(img) => {
                                    if (coverArtError) {
                                        img.target.src = CoverPlaceholder
                                        return null
                                    }
                                    img.target.src = cover_art
                                    setCoverArtError(true)
                                }}
                            />
                        ) : null}
                        <img
                            loading="lazy"
                            alt=""
                            src={contentHeader("anime", slug)}
                            className={clsx({
                                [classes.FallbackBackgroundImage]: headerError,
                            })}
                            onError={(img) => {
                                img.target.src = coverArtError ? cover_art : contentCover("anime", slug)
                                setHeaderError(true)
                            }}
                        ></img>
                        <div className={classes.BackgroundImageOverlay} />
                    </div>
                </div>
                <Box className={classes.MetadataContainer}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <MetadataContainer
                                type="genres"
                                title={t('common:ns.genre', { count: genres.length })}
                                list={genres}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MetadataContainer
                                title={t('common:ns.series_status')}
                                list={episode_count ? [t(`common:ns.${series_status}`), t('translations.anime.series_status', { episode_count: episode_count, count: episode_count })] : [t(`common:ns.${series_status}`)]}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MetadataContainer
                                title={t('common:ns.trans_status')}
                                list={[t(`common:ns.${trans_status}`)]}
                            />
                        </Grid>
                    </Grid>
                </Box>
                {/* Download Links */}
                <Box className={classes.BottomStuff}>
                    <Box mb={2}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h4" gutterBottom>
                                    {t('translations.anime.download_links')}
                                </Typography>
                                <ul>
                                    {batchLinks.length !== 0 ? (
                                        <>
                                            {batchLinks}
                                            {downloadLinks.length ===
                                                0 ? null : (
                                                    <Divider
                                                        className={
                                                            classes.DownloadLinkDivider
                                                        }
                                                    />
                                                )}
                                        </>
                                    ) : null}
                                    {downloadLinks.length !== 0 ? (
                                        downloadLinks
                                    ) : batchLinks.length !== 0 ? null : (
                                        <WarningBox>
                                            {t('translations.warnings.anime.not_found_download_links')}
                                        </WarningBox>
                                    )}
                                </ul>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* Jikan Stats */}
                <Box className={classes.JikanStatsContainer}>
                    <Typography variant="h4">
                        {t('translations.anime.stats')}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={6} xl={4}>
                            <JikanStatsScoresChart data={jikanScoreData} loading={jikanScoreStatusDataLoading} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={6} xl={4}>
                            <JikanStatsStatusChart data={jikanStatusData} loading={jikanScoreStatusDataLoading} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={6} xl={4}>
                            <PVBox link={pv} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={6}>
                            <CharactersStaffBox data={jikanCharactersData} type="characters" loading={jikanCharacterStaffDataLoading} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={6}>
                            <CharactersStaffBox data={jikanStaffData} type="staff" loading={jikanCharacterStaffDataLoading} />
                        </Grid>
                    </Grid>
                </Box>
                <Divider />
                {/* Disqus Box */}
                <Box className={classes.BottomStuff}>
                    {process.env.REACT_APP_DISQUS_SHORTNAME ? (
                        <>
                            <Box>
                                <DisqusBox
                                    config={{
                                        identifier: "anime/" + id,
                                        title: `${name} - ${process.env.REACT_APP_SITENAME} Anime`,
                                    }}
                                />
                            </Box>
                        </>
                    ) : (
                            ""
                        )}
                </Box>
            </div>
        </>
    )
}

function MangaPage(props) {
    const { t } = useTranslation(['components', 'common'])
    const { id, name, slug, cover_art, translators, editors, authors, release_date, genres, mal_link, synopsis, reader_link, download_link, series_status, trans_status, episode_count } = props
    const classes = useStyles(props)
    const [headerError, setHeaderError] = useState(false)
    const [coverArtError, setCoverArtError] = useState(false)
    const [logoError, setLogoError] = useState(false)
    const [adultModal, setAdultModal] = useState(props.adult_modal)

    // Jikan States
    const [jikanScoreStatusDataLoading, setJikanScoreStatusDataLoading] = useState(true)
    const [jikanCharacterStaffDataLoading, setJikanCharacterStaffDataLoading] = useState(true)
    const [jikanScoreData, setJikanScoreData] = useState([])
    const [jikanStatusData, setJikanStatusData] = useState({})
    const [jikanCharactersData, setJikanCharactersData] = useState([])
    const [jikanStaffData, setJikanStaffData] = useState([])

    useEffect(() => {
        async function getJikanStatusData() {
            const tempData = []
            try {
                const res = await axios.get(jikanAPI({ contentType: "manga", contentId: mal_link.split("/")[4], extraPath: "stats" }))

                if (res.status === 200) {
                    for (const score in res.data.scores) {
                        tempData.push({
                            score: score,
                            "votesColor": getVoteColor(score),
                            ...res.data.scores[score]
                        })
                    }

                    setJikanScoreData(tempData)
                    setJikanStatusData({
                        completed: res.data.completed || 0,
                        reading: res.data.reading || 0,
                        dropped: res.data.dropped || 0,
                        on_hold: res.data.on_hold || 0,
                        plan_to_read: res.data.plan_to_read || 0,
                    })
                    setJikanScoreStatusDataLoading(false)
                }
                else {
                    setJikanScoreStatusDataLoading(false)
                }
            } catch (err) {
                setJikanScoreStatusDataLoading(false)
            }
        }

        async function getJikanCharactersData() {
            try {
                const res = await axios.get(jikanAPI({ contentType: "manga", contentId: mal_link.split("/")[4], extraPath: "characters" }))

                if (res.status === 200) {
                    setJikanCharactersData(res.data.characters)
                    setJikanCharacterStaffDataLoading(false)
                }
                else {
                    setJikanCharacterStaffDataLoading(false)
                }
            } catch (err) {
                setJikanCharacterStaffDataLoading(false)
            }
        }

        getJikanStatusData()
        getJikanCharactersData()
    }, [])

    function handleClose() {
        return setAdultModal(state => (!state))
    }

    return (
        <>
            <AdultModal open={adultModal} handleClose={handleClose} />
            <div className={classes.Container}>
                <Box className={classes.BackgroundContainer}>
                    <Box className={classes.AnimeContainer}>
                        <MotdContainer {...props} content_type="manga" content_id={id} />
                        <Box className={classes.TextContainer}>
                            <Box mb={2}>
                                <Typography variant="h4" component="h6" className={classes.PremieredContainer}>
                                </Typography>
                                {logoError ? (
                                    <Typography variant="h3" component="h1">
                                        {name}
                                    </Typography>
                                ) : (
                                        <Box className={classes.LogoImage}>
                                            <img
                                                loading="lazy"
                                                alt=""
                                                src={contentLogo("manga", slug)}
                                                onError={(img) => {
                                                    setLogoError(true)
                                                    img.target.style.display =
                                                        "none"
                                                }}
                                            ></img>
                                        </Box>
                                    )}
                                <Typography
                                    variant="body1"
                                    className={classes.SynopsisContainer}
                                >
                                    {synopsis ? synopsis : t('common:warnings.not_found_synopsis')}
                                </Typography>
                            </Box>
                            <Box display="flex" flexWrap="wrap">
                                <MetadataContainer
                                    title={t('common:ns.translator', { count: translators.length })}
                                    list={translators}
                                />
                                <MetadataContainer
                                    title={t('common:ns.editor', { count: editors.length })}
                                    list={editors}
                                />
                            </Box>
                            <Box display="flex" flexWrap="wrap">
                                <MetadataContainer
                                    title={t('common:ns.author', { count: authors.length })}
                                    list={authors}
                                />
                                <MetadataContainer
                                    title={t('common:ns.release_date')}
                                    list={[
                                        Format(
                                            new Date(release_date)
                                        ),
                                    ]}
                                />
                            </Box>
                            <Box mt={2}>
                                {download_link ? (
                                    <a
                                        href={download_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            className={classes.ContentButton}
                                        >
                                            {t('common:ns.download')}
                                        </Button>
                                    </a>
                                ) : null}
                                {reader_link ? (
                                    <a
                                        href={reader_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            className={classes.ContentButton}
                                        >
                                            {t('common:ns.read')}
                                        </Button>
                                    </a>
                                )
                                    :
                                    episode_count ?
                                        <Link to={mangaEpisodePage(slug)}>
                                            <Button
                                                variant="outlined"
                                                size="large"
                                                className={classes.ContentButton}
                                            >
                                                {t('common:ns.read')}
                                            </Button>
                                        </Link>
                                        :
                                        ""
                                }
                                {mal_link ? (
                                    <a
                                        href={mal_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            className={classes.ContentButton}
                                        >
                                            {t('common:ns.mal_page')}
                                        </Button>
                                    </a>
                                ) : null}
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.BackgroundImage}>
                        {headerError ? (
                            <img
                                loading="lazy"
                                alt=""
                                src={contentCover("manga", slug)}
                                className={clsx(classes.CoverArtContainer, {
                                    [classes.FallbackCoverArt]: headerError,
                                })}
                                onError={(img) => {
                                    if (coverArtError) {
                                        img.target.src = CoverPlaceholder
                                        return null
                                    }
                                    img.target.src = cover_art
                                    setCoverArtError(true)
                                }}
                            />
                        ) : null}
                        <img
                            loading="lazy"
                            alt=""
                            src={contentHeader("manga", slug)}
                            className={clsx({
                                [classes.FallbackBackgroundImage]: headerError,
                            })}
                            onError={(img) => {
                                img.target.src = coverArtError ? cover_art : contentCover("manga", slug)
                                setHeaderError(true)
                            }}
                        ></img>
                        <div className={classes.BackgroundImageOverlay} />
                    </Box>
                </Box>
                <Box className={classes.MetadataContainer}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <MetadataContainer
                                type="genres"
                                title={t('common:ns.genre', { count: genres.length })}
                                list={genres}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MetadataContainer
                                title={t('common:ns.series_status')}
                                list={[t(`common:ns.${series_status}`)]}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MetadataContainer
                                title={t('common:ns.trans_status')}
                                list={[t(`common:ns.${trans_status}`)]}
                            />
                        </Grid>
                    </Grid>
                </Box>
                {/* Jikan Stats */}
                <Box className={classes.JikanStatsContainer}>
                    <Typography variant="h4">
                        {t('translations.anime.stats')}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={6} xl={4}>
                            <JikanStatsScoresChart data={jikanScoreData} loading={jikanScoreStatusDataLoading} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={6} xl={4}>
                            <JikanStatsStatusChart data={jikanStatusData} loading={jikanScoreStatusDataLoading} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={6} xl={4}>
                            <CharactersStaffBox data={jikanCharactersData} type="characters" loading={jikanCharacterStaffDataLoading} />
                        </Grid>
                    </Grid>
                </Box>
                <Divider />
                <div className={classes.BottomStuff}>
                    {process.env.REACT_APP_DISQUS_SHORTNAME ? (
                        <>
                            <Box>
                                <DisqusBox
                                    config={{
                                        identifier: "manga/" + id,
                                        title: `${name} - ${process.env.REACT_APP_SITENAME} Manga`,
                                    }}
                                />
                            </Box>
                        </>
                    ) : (
                            ""
                        )}
                </div>
            </div>
        </>
    )
}

function MetadataContainer(props) {
    const { t } = useTranslation(["components", "genres"])
    const { title, list, type } = props

    function getRenderBox() {
        switch (type) {
            case "genres": {
                return list.map((l, i) => `${t(`genres:${l}`)}${list.length - 1 !== i ? ", " : ""}`)
            }
            default: {
                return list.join(", ")
            }
        }
    }

    return (
        <Box mr={1}>
            <Typography variant="body1" component="span">
                <b>{title}: </b>
            </Typography>
            {list.length !== 0 ? (
                <Typography variant="body1" component="span">
                    {getRenderBox()}
                </Typography>
            ) : (
                    <Typography variant="body1">{t('translations.warnings.content_metadata.not_found', { title: title })}</Typography>
                )}
        </Box>
    )
}

function JikanStatsScoresChart(props) {
    const { t } = useTranslation(["common", "components"])
    const classes = useStyles()

    const { data, loading } = props

    return (
        <>
            <Typography variant="body1" align="left" gutterBottom><b>{t("ns.score_distribution")}</b></Typography>
            {data.length ?
                <div className={classes.JikanStatsScoresChart}>
                    {data.length ? (
                        <div style={{ height: 200 }}>
                            <ResponsiveBar
                                data={data}
                                keys={["votes"]}
                                height={200}
                                groupMode="stacked"
                                colors={d => getVoteColor({ value: d.index })}
                                indexBy="score"
                                colorBy="index"
                                labelFormat={d => <tspan className={classes.JikanStatsScoresChartText} y={-10}>{d}</tspan>}
                                labelTextColor={{ theme: 'labels.text.fill' }}
                                enableGridY={false}
                                margin={{ top: 30, right: 0, bottom: 30, left: 0 }}
                                padding={0.6}
                                isInteractive={false}
                                axisTop={null}
                                axisRight={null}
                                axisLeft={null}
                                axisBottom={{
                                    tickSize: 0,
                                    tickPadding: 10,
                                    format: d => <tspan className={classes.JikanStatsScoresChartText}>{d}</tspan>
                                }}
                            />
                        </div>
                    ) : (
                            ""
                        )}
                    <Typography variant="subtitle2" align="right">
                        <a href="https://jikan.moe/" target="_blank" rel="noopener noreferrer">jikan API</a>
                    </Typography>
                </div> :
                loading ?
                    <div className={classes.JikanDataErrorBox}>
                        <Loading />
                    </div>
                    :
                    <div className={classes.JikanDataErrorBox}>
                        <WarningSharp fontSize="large" />
                        <Typography variant="body1">
                            {t("components:translations.jikan_errors.couldnt_reach_data")}
                        </Typography>
                    </div>}
        </>
    )
}

function JikanStatsStatusChart(props) {
    const { t } = useTranslation(["common", "components"])
    const classes = useStyles()
    const { data, loading } = props

    return (
        <>
            <Typography variant="body1" align="left" gutterBottom><b>{t("ns.status_distribution")}</b></Typography>
            {Object.keys(data).length ?
                <div className={classes.JikanStatsStatusChart}>
                    <div className={classes.JikanStatsStatusChartList}>
                        {Object.keys(data).map(key => (
                            <div key={key} className={classes.JikanStatsStatusChartItem}>
                                <div style={{ backgroundColor: getStatusColor({ value: key }) }} className={classes.JikanStatsStatusChartItemHeaderText}>
                                    <Typography variant="body2">
                                        <b>{t(`ns.${key}`)}</b>
                                    </Typography>
                                </div>
                                <div>
                                    {data[key]}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Typography variant="subtitle2" align="right">
                        <a href="https://jikan.moe/" target="_blank" rel="noopener noreferrer">jikan API</a>
                    </Typography>
                </div> :
                loading ?
                    <div className={classes.JikanDataErrorBox}>
                        <Loading />
                    </div>
                    :
                    <div className={classes.JikanDataErrorBox}>
                        <WarningSharp fontSize="large" />
                        <Typography variant="body1">
                            {t("components:translations.jikan_errors.couldnt_reach_data")}
                        </Typography>
                    </div>}
        </>
    )
}

function PVBox(props) {
    const { t } = useTranslation(["common", "components"])
    const classes = useStyles()
    let { link } = props

    if (link) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\??v?=?))([^#\&\?]*).*/
        let match = link.match(regExp);
        if (match && match[7].length === 11) link = youtubeEmbedLink({ videoId: match[7] })
        else link = ""
    }

    return (
        <>
            <Typography variant="body1" align="left" gutterBottom><b>{t("ns.youtube_preview")}</b></Typography>
            {link ?
                <>

                    <div className={classes.YoutubePreview}>
                        <iframe
                            width="100%"
                            height="250"
                            title={link}
                            src={link}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </>
                :
                <>
                    <div className={classes.JikanDataErrorBox}>
                        <WarningSharp fontSize="large" />
                        <Typography variant="body1">
                            {t("components:translations.warnings.youtube_pv.not_found")}
                        </Typography>
                    </div>
                </>}
        </>
    )
}

function CharactersStaffBox(props) {
    const { t } = useTranslation("common")
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [currentData, setCurrentData] = useState([])

    let { data, type, loading } = props

    useEffect(() => {
        if (!open) setCurrentData(Slice(data, 0, 6))
        else setCurrentData(data)
    }, [open, data])

    function handleOpenButton() {
        setOpen(state => !state)
    }

    return (
        <>
            <Typography variant="body1" align="left" gutterBottom><b>{t(`ns.${type}`)}</b></Typography>
            {currentData.length ?
                <>
                    <div className={classes.CharactersStaffBoxList}>
                        {currentData.map(d => {
                            const va = Find(d.voice_actors, { language: "Japanese" })
                            return (
                                <div key={d.url} className={`${classes.CharactersStaffBoxItem} ${type === "characters" ? `${classes.CharactersStaffBoxCharacter}` : `${classes.CharactersStaffBoxStaff}`} `}>
                                    <div className={`${classes.CharactersStaffBoxItemCharacter} ${type === "characters" ? "chr" : `${classes.CharactersStaffBoxStaffOverride} stff`} `}>
                                        <a href={d.url} target="_blank" rel="noopener noreferrer" >
                                            <div style={{ backgroundImage: `url(${d.image_url})` }} className={classes.CharactersStaffBoxItemImage} />
                                        </a>
                                        <div className={classes.CharactersStaffBoxItemText}>
                                            <Typography variant="subtitle2">
                                                <a href={d.url} target="_blank" rel="noopener noreferrer">
                                                    <Dotdotdot clamp={3} useNativeClamp>
                                                        {d.name.replace(",", "")}
                                                    </Dotdotdot>
                                                </a>
                                            </Typography>
                                            {d.role ?
                                                <Typography variant="subtitle2">
                                                    <a href={d.url} target="_blank" rel="noopener noreferrer">
                                                        <Dotdotdot clamp={3} useNativeClamp>
                                                            {d.role}
                                                        </Dotdotdot>
                                                    </a>
                                                </Typography> : ""
                                            }
                                            {d.positions ?
                                                <Typography variant="subtitle2">
                                                    <a href={d.url} target="_blank" rel="noopener noreferrer">
                                                        {d.positions ? d.positions.map((p, i) => d.positions.length - 1 !== i ? `${p}, ` : `${p} `) : ""}
                                                    </a>
                                                </Typography>
                                                : ""}
                                        </div>
                                    </div>
                                    {type === "characters" && va && open ?
                                        <div className={`${classes.CharactersStaffBoxItemStaff} stff`}>
                                            <div className={classes.CharactersStaffBoxItemText}>
                                                <Typography variant="subtitle2">
                                                    <a href={va.url} target="_blank" rel="noopener noreferrer">
                                                        {va ? va.name.replace(",", "") : ""}
                                                    </a>
                                                </Typography>
                                            </div>
                                            <a href={va.url} target="_blank" rel="noopener noreferrer">
                                                <div style={{ backgroundImage: `url(${va ? va.image_url : ""})` }} className={classes.CharactersStaffBoxItemImage} />
                                            </a>
                                        </div> :
                                        ""}
                                </div>
                            )
                        })}
                    </div>
                    {data.length > 6 ?
                        <div className={classes.CharactersStaffBoxShowMore}>
                            <Button variant="outlined" size="small" onClick={handleOpenButton}>
                                {open ? t("ns.show_less") : t("ns.show_more")}
                            </Button>
                        </div>
                        : ""}
                    <Typography variant="subtitle2" align="right">
                        <a href="https://jikan.moe/" target="_blank" rel="noopener noreferrer">jikan API</a>
                    </Typography>
                </>
                : loading ?
                    <div className={classes.JikanDataErrorBox}>
                        <Loading />
                    </div>
                    :
                    <div className={classes.JikanDataErrorBox}>
                        <WarningSharp fontSize="large" />
                        <Typography variant="body1">
                            {t("components:translations.jikan_errors.couldnt_reach_data")}
                        </Typography>
                    </div>}
        </>
    )
}

function AdultModal(props) {
    const { t } = useTranslation('components')
    const classes = useStyles()
    const { open, handleClose } = props

    useEffect(() => {
        if (open)
            document.getElementById("scroll-node").style.filter = "blur(50px)"
        else document.getElementById("scroll-node").style.removeProperty('filter')
        return function cleanup() {
            document.getElementById("scroll-node").style.removeProperty('filter')
        }
    })

    return (
        <Modal
            className={classes.Modal}
            open={open}
        >
            <div className={classes.ModalContainer}>
                <Typography variant="body1" gutterBottom>
                    {t('translations.warnings.+18.header_text')}
                </Typography>
                <Link to="/">
                    <Button variant="outlined" style={{ marginRight: 8 }}>
                        {t('translations.buttons.+18.no')}
                    </Button>
                </Link>
                <Button variant="outlined" style={{ color: "red" }} onClick={handleClose}>
                    {t('translations.buttons.+18.yes')}
                </Button>
            </div>
        </Modal>
    )
}

function getVoteColor({ value }) {
    switch (String(value + 1)) {
        case "1": {
            return "hsl(10, 65%, 50%)"
        }
        case "2": {
            return "hsl(20, 65%, 50%)"
        }
        case "3": {
            return "hsl(30, 65%, 50%)"
        }
        case "4": {
            return "hsl(40, 65%, 50%)"
        }
        case "5": {
            return "hsl(50, 65%, 50%)"
        }
        case "6": {
            return "hsl(60, 65%, 50%)"
        }
        case "7": {
            return "hsl(70, 65%, 50%)"
        }
        case "8": {
            return "hsl(80, 65%, 50%)"
        }
        case "9": {
            return "hsl(90, 65%, 50%)"
        }
        case "10": {
            return "hsl(100, 65%, 50%)"
        }
        default: {
            return "hsl(10, 65%, 50%)"
        }
    }
}

function getStatusColor({ value }) {
    const hue = 700

    switch (value) {
        case "completed": {
            return lime[hue]
        }
        case "dropped": {
            return purple[hue]
        }
        case "plan_to_watch": {
            return blue[hue]
        }
        case "plan_to_read": {
            return blue[hue]
        }
        case "on_hold": {
            return grey[hue]
        }
        case "watching": {
            return red[hue]
        }
        case "reading": {
            return red[hue]
        }
        default: {
            return red[900]
        }
    }
}

export { AnimePage, MangaPage, JikanStatsScoresChart }
