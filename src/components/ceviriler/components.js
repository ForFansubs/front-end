import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Grid, Typography, Box, Button, makeStyles, Divider, fade, Modal } from "@material-ui/core"
import clsx from "clsx"
import DisqusBox from "../../components/disqus/disqus"

import { bluray, CoverPlaceholder } from "../../config/theming/images"
import { getAnimeWatchIndex, mangaEpisodePage } from "../../config/front-routes"
import { contentHeader, contentLogo, contentCover } from "../../config/api-routes"

import { format } from "date-fns"
import WarningBox from "../warningerrorbox/warning"
import DownloadLink from "./anime/download-links"
import MotdContainer from "../motd"

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
    BottomContainer: {
        position: "relative",
        margin: theme.overrides.defaultMarginOverride,
        marginTop: 0,
        marginBottom: 0,
        padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`,
        backgroundColor: theme.palette.background.default,
        textAlign: "center",

        [theme.breakpoints.down("sm")]: {
            margin: theme.overrides.defaultMarginMobileOverride,
            marginTop: 0,
            marginBottom: 0
        }
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
        marginTop: theme.spacing(4),
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
    }
}))

function episodeParser(episodenumber, specialtype) {
    if (specialtype === "toplu")
        return `TOPLU LİNK ${episodenumber === "0" ? "" : episodenumber}`

    if (specialtype && specialtype !== "toplu") {
        return `${specialtype.toUpperCase()} ${episodenumber}`
    } else return `${episodenumber}. Bölüm`
}

function AdultModal(props) {
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
            aria-labelledby="+18 İçerik"
            aria-describedby="+18 içeriğe ulaşmak üzeresiniz..."
        >
            <div className={classes.ModalContainer}>
                <Typography variant="body1" gutterBottom>
                    +18 ögelere sahip bir içeriğe ulaşmak istediniz, devam etmek istiyor musunuz?
                </Typography>
                <Link to="/">
                    <Button variant="outlined" style={{ marginRight: 8 }}>
                        Ana sayfaya dön
                    </Button>
                </Link>
                <Button variant="outlined" style={{ color: "red" }} onClick={handleClose}>
                    Evet
                </Button>
            </div>
        </Modal>
    )
}

function MetadataContainer(props) {
    const { title, titleM, list } = props

    return (
        <Box mr={1}>
            <Typography variant="body1" component="span">
                <b>{list.length > 1 ? `${titleM}: ` : `${title}: `}</b>
            </Typography>
            {list.length !== 0 ? (
                <Typography variant="body1" component="span">
                    {list.join(", ")}
                </Typography>
            ) : (
                    <Typography variant="body1">${title} bulunamadı.</Typography>
                )}
        </Box>
    )
}

function AnimePage(props) {
    const {
        id,
        name,
        slug,
        cover_art,
        premiered,
        version,
        translators,
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

    let batchLinks = episodes.map((data) =>
        data.can_user_download && data.special_type === "toplu" ? (
            <DownloadLink
                key={data.id}
                title={episodeParser(data.episode_number, data.special_type)}
                animeslug={slug}
                episodeid={data.id}
            />
        ) : null
    )

    let downloadLinks = episodes.map((data) =>
        data.can_user_download && data.special_type !== "toplu" ? (
            <DownloadLink
                key={data.id}
                title={episodeParser(data.episode_number, data.special_type)}
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
                                            title="bd-logo"
                                            loading="lazy"
                                            src={bluray}
                                            alt="bd-logo"
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
                                                title={name + " logoimage"}
                                                loading="lazy"
                                                alt={name + " logoimage"}
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
                                    {synopsis ? synopsis : "Konu bulunamadı."}
                                </Typography>
                            </Box>
                            <Box display="flex" flexWrap="wrap">
                                <MetadataContainer
                                    title="Çevirmen"
                                    titleM="Çevirmenler"
                                    list={translators}
                                />
                                <MetadataContainer
                                    title="Encoder"
                                    titleM="Encoderlar"
                                    list={encoders}
                                />
                            </Box>
                            <Box display="flex" flexWrap="wrap">
                                <MetadataContainer
                                    title="Stüdyo"
                                    titleM="Stüdyolar"
                                    list={studios}
                                />
                                <MetadataContainer
                                    title="Çıkış Tarihi"
                                    titleM=""
                                    list={[
                                        format(
                                            new Date(release_date),
                                            "dd.MM.yyyy"
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
                                            İzle
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
                                            MyAnimeList Konusu
                                        </Button>
                                    </a>
                                ) : null}
                            </Box>
                        </div>
                    </div>
                    <div className={classes.BackgroundImage}>
                        {headerError ? (
                            <img
                                title={name + " cover_art"}
                                loading="lazy"
                                alt={name + " cover_art"}
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
                            title={name + " headerimage"}
                            loading="lazy"
                            alt={name + " headerimage"}
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
                <Box className={classes.BottomContainer}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <MetadataContainer
                                title="Tür"
                                titleM="Türler"
                                list={genres}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MetadataContainer
                                title="Seri Durumu"
                                titleM="Seri Durumu"
                                list={[series_status, `${episode_count} Bölüm`]}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MetadataContainer
                                title="Çeviri Durumu"
                                titleM=""
                                list={[trans_status]}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <div className={classes.BottomStuff}>
                    <Box mb={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4" gutterBottom>
                                    İndirme Linkleri
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
                                            İndirme linki bulunamadı.
                                        </WarningBox>
                                    )}
                                </ul>
                            </Grid>
                        </Grid>
                    </Box>
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
                </div>
            </div>
        </>
    )
}

function MangaPage(props) {
    const { id, name, slug, cover_art, translators, editors, authors, release_date, genres, mal_link, synopsis, reader_link, download_link, series_status, trans_status, episode_count } = props
    const classes = useStyles(props)
    const [headerError, setHeaderError] = useState(false)
    const [coverArtError, setCoverArtError] = useState(false)
    const [logoError, setLogoError] = useState(false)
    const [adultModal, setAdultModal] = useState(props.adult_modal)

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
                                                title={name + " logoimage"}
                                                loading="lazy"
                                                alt={name + " logoimage"}
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
                                    {synopsis ? synopsis : "Konu bulunamadı."}
                                </Typography>
                            </Box>
                            <Box display="flex" flexWrap="wrap">
                                <MetadataContainer
                                    title="Çevirmen"
                                    titleM="Çevirmenler"
                                    list={translators}
                                />
                                <MetadataContainer
                                    title="Editör"
                                    titleM="Editörler"
                                    list={editors}
                                />
                            </Box>
                            <Box display="flex" flexWrap="wrap">
                                <MetadataContainer
                                    title="Yazar"
                                    titleM="Yazarlar"
                                    list={authors}
                                />
                                <MetadataContainer
                                    title="Çıkış Tarihi"
                                    titleM=""
                                    list={[
                                        format(
                                            new Date(release_date),
                                            "dd.MM.yyyy"
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
                                            İndir
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
                                            Oku
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
                                                Oku
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
                                            MyAnimeList Konusu
                                        </Button>
                                    </a>
                                ) : null}
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.BackgroundImage}>
                        {headerError ? (
                            <img
                                title={name + " cover_art"}
                                loading="lazy"
                                alt={name + " cover_art"}
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
                            title={name + " headerimage"}
                            loading="lazy"
                            alt={name + " headerimage"}
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
                <Box className={classes.BottomContainer}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <MetadataContainer
                                title="Tür"
                                titleM="Türler"
                                list={genres}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MetadataContainer
                                title="Seri Durumu"
                                titleM="Seri Durumu"
                                list={[series_status]}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MetadataContainer
                                title="Çeviri Durumu"
                                titleM=""
                                list={[trans_status]}
                            />
                        </Grid>
                    </Grid>
                </Box>
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

export { AnimePage, MangaPage, episodeParser }
