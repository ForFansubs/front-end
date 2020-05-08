import React, { useState } from 'react'
import { useGlobal } from 'reactn'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Grid, Typography, Box, Button, makeStyles } from '@material-ui/core'
import DisqusBox from '../../components/disqus/disqus'

import { bluray } from '../../config/theming/images'
import { getAnimeWatchIndex } from '../../config/front-routes'
import { contentHeader, contentLogo } from '../../config/api-routes'

import { format } from 'date-fns'
import WarningBox from '../warningerrorbox/warning'

const useStyles = makeStyles(theme => ({
    LeftSideContent: {
        maxWidth: 225,
        minWidth: 225,
        [theme.breakpoints.down('sm')]: {
            maxWidth: "initial",
            minWidth: "initial"
        }
    },
    Container: {
        position: "relative"
    },
    BackgroundContainer: {
        overflow: "hidden",
        position: "relative",
        margin: theme.overrides.defaultMarginOverride,

        [theme.breakpoints.down("xs")]: {
            margin: theme.overrides.defaultMarginMobileOverride
        }
    },
    BackgroundImage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        overflow: "hidden",
        '& img': {
            position: "absolute",
            objectFit: "cover",
            width: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        },
        [theme.breakpoints.down("xs")]: {
            paddingBottom: "80%",

            '& img': {
                height: "100%",
                marginTop: 0
            }
        }
    },
    BackgroundImageOverlay: {
        background: theme.palette.background.default,
        background: `linear-gradient(90deg, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 35%, ${theme.palette.background.default}00 50%)`,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    LogoImage: {
        '& img': {
            width: 400
        }
    },
    AnimeContainer: {
        position: "relative",
        zIndex: 2,
        padding: theme.spacing(5)
    },
    PremieredContainer: {
        color: theme.palette.grey["400"]
    },
    TextContainer: {
        width: "45%"
    },
    SynopsisContainer: {
        whiteSpace: "pre-wrap"
    },
    ContentButton: {
        marginRight: theme.spacing(2)
    },
    BottomStuff: {
        marginTop: theme.spacing(4)
    },
    CoverArtContainer: {
        maxWidth: 225 - theme.spacing(2),
        width: 225 - theme.spacing(2),

        [theme.breakpoints.down('sm')]: {
            maxWidth: "70%",
            width: "70%"
        },

        '& img': {
            width: "inherit"
        }
    }
}))


function episodeParser(episodenumber, specialtype) {
    if (specialtype === "toplu")
        return `TOPLU LİNK ${episodenumber === "0" ? "" : episodenumber}`

    if (specialtype && specialtype !== "toplu") {
        return `${specialtype.toUpperCase()} ${episodenumber}`
    }
    else return `${episodenumber}. Bölüm`
}

function MetadataContainer(props) {
    const { title, titleM, list } = props
    return (
        <Box mr={1}>
            <Typography variant="body1" component="span">
                <b>{list.length > 1 ? `${titleM}: ` : `${title}: `}</b>
            </Typography>
            {list.length !== 0 ?
                <Typography variant="body1" component="span">
                    {list.join(', ')}
                </Typography>
                :
                <Typography variant="body1">${title} bulunamadı.</Typography>
            }
        </Box>
    )
}

function AnimePage(props) {
    const { id, name, slug, cover_art, premiered, version, episodes, translators, encoders, studios, release_date, genres, mal_link, synopsis, downloadLinks } = props
    const classes = useStyles(props)
    const [mobile] = useGlobal('mobile')
    const [imageError, setImageError] = useState(false)
    const [logoError, setLogoError] = useState(false)

    return (
        <>
            <div className={classes.Container}>
                <Box className={classes.BackgroundContainer}>
                    <Box className={classes.AnimeContainer}>
                        <Box className={classes.TextContainer}>
                            <Box mb={2}>
                                <Typography variant="h4" component="h6" className={classes.PremieredContainer}>
                                    {premiered
                                        ?
                                        premiered
                                        :
                                        null
                                    }
                                    {version === "bd"
                                        ?
                                        <img title="bd-logo" loading="lazy" src={bluray} alt="bd-logo" style={{ height: "1rem" }} />
                                        :
                                        null}
                                </Typography>
                                {logoError ?
                                    <Typography variant="h3" component="h1">
                                        {name}
                                    </Typography>
                                    :
                                    <Box className={classes.LogoImage}>
                                        <img
                                            title={name + " logoimage"}
                                            loading="lazy"
                                            alt={name + " logoimage"}
                                            src={contentLogo("anime", slug)}
                                            onError={img => {
                                                setLogoError(true)
                                                img.target.style.display = "none"
                                            }}></img>
                                    </Box>}
                                <Typography variant="body1" className={classes.SynopsisContainer}>
                                    {synopsis ? synopsis : "Konu bulunamadı."}
                                </Typography>
                            </Box>
                            <Box display="flex" flexWrap="wrap">
                                <MetadataContainer title="Çevirmen" titleM="Çevirmenler" list={translators} />
                                <MetadataContainer title="Encoder" titleM="Encoderlar" list={encoders} />
                            </Box>
                            <Box display="flex" flexWrap="wrap">
                                <MetadataContainer title="Stüdyo" titleM="Stüdyolar" list={studios} />
                                <MetadataContainer title="Çıkış Tarihi" titleM="" list={[format(new Date(release_date), "dd.MM.yyyy")]} />
                            </Box>
                            <MetadataContainer title="Tür" titleM="Türler" list={genres} />
                            <Box mt={2}>
                                {downloadLinks.length !== 0
                                    ?
                                    <Link to={getAnimeWatchIndex(slug)}>
                                        <Button variant="outlined" size="large" className={classes.ContentButton}>
                                            <Typography variant="h6">İzle</Typography>
                                        </Button>
                                    </Link>
                                    :
                                    null}
                                {mal_link ?
                                    <a href={mal_link} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outlined" size="large" className={classes.ContentButton}>
                                            <Typography variant="h6">MyAnimeList Konusu</Typography>
                                        </Button>
                                    </a>
                                    :
                                    null}
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.BackgroundImage}>
                        <img
                            title={name + " headerimage"}
                            loading="lazy"
                            alt={name + " headerimage"}
                            src={contentHeader("anime", slug)}
                            onError={img => {
                                img.target.style.display = "none"
                                setImageError(true)
                            }}></img>
                        <div className={classes.BackgroundImageOverlay} />
                    </Box>
                </Box>
                <div className={classes.BottomStuff}>
                    <Box mb={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4">İndirme Linkleri</Typography>
                                <ul>
                                    {downloadLinks.length !== 0 ?
                                        downloadLinks :
                                        <WarningBox>İndirme linki bulunamadı.</WarningBox>}
                                </ul>
                            </Grid>
                        </Grid>
                    </Box>
                    {process.env.REACT_APP_DISQUS_SHORTNAME
                        ?
                        <>
                            <Box>
                                <DisqusBox
                                    config={{
                                        identifier: 'anime/' + id,
                                        title: `${name} - ${process.env.REACT_APP_SITENAME} Anime`,
                                    }} />
                            </Box>
                        </>
                        :
                        ""}
                </div>
            </div>
        </>
    )
}

function MangaPage(props) {
    const { id, name, slug, cover_art, translators, editors, authors, release_date, genres, mal_link, synopsis, mos_link, download_link } = props
    const classes = useStyles(props)
    const [mobile] = useGlobal('mobile')

    return (
        <p>Deneme</p>
    )
}

export {
    AnimePage,
    MangaPage,
    episodeParser,
}