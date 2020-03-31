import React from 'react'

import { Grid, Typography, Box, makeStyles } from '@material-ui/core'
import { red, blue } from '@material-ui/core/colors'

import Dotdotdot from 'react-dotdotdot'
import { Link } from 'react-router-dom'
import { animePage, mangaPage } from '../../config/front-routes'

const useStyles = makeStyles(theme => ({
    // ./pages/ara/index.js içerisinde kullanılan classlar
    PageTypeButton: {
        marginBottom: "5px!important"
    },
    ContentError: {
        borderLeft: `${red.A200} 4px solid`,
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        "& svg": {
            marginRight: 5
        }
    },
    ContentWarning: {
        borderLeft: `${blue.A200} 4px solid`,
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        "& svg": {
            marginRight: 5
        }
    },
    //Bu sayfadaki componentlar üzerinde kullanılan classlar
    ContentInPlacer: {
        display: "flex",
        backgroundColor: theme.palette.background.paper
    },
    ContentPremieredContainer: {
        textAling: "center",
        borderTop: props => props.version === "bd" ? `2px solid ${blue.A200}` : "none",
        backgroundColor: theme.palette.background.level1
    },
    ContentCover: {
        backgroundImage: props => `url(${props.cover_art})`,
        width: "125px",
        height: "auto",
        backgroundSize: "cover"
    },
    ContentGenres: {
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.level1,
        '& li': {
            display: "inline-block",
            padding: "2px 4px",
            backgroundColor: theme.palette.primary.main,
            margin: "0 3px",
            '& h6': {
                fontSize: ".6rem",
                fontWeight: "400!important"
            }
        }
    },
    ContentTextInfo: {
        padding: "5px 0 5px 10px",
        width: "calc(100% - 125px)"
    },
    ContentSynopsis: {
        height: "120px",
        overflow: "hidden",
        paddingRight: "6px",

        "&:hover": {
            paddingRight: 3,
            overflowY: "auto"
        },
        "&:hover::-webkit-scrollbar": {
            width: 3,
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.background.level1
        }
    }
}))

function AnimeContainer(props) {
    const { slug, name, synopsis, genres, premiered } = props.data
    const classes = useStyles(props.data)

    return (
        <Grid item xs={12} md={6} lg={4} xl={3}>
            <Link to={animePage(slug)}>
                <Box p={0} boxShadow={6}>
                    <Box className={classes.ContentPremieredContainer} p={1}>
                        <Typography variant="h6">
                            {premiered || "Bilgi bulunamadı"}
                        </Typography>
                    </Box>
                    <div className={classes.ContentInPlacer}>
                        <Box className={classes.ContentCover} title={name + " Cover Art"} />
                        <Box className={classes.ContentTextInfo}>
                            <Dotdotdot clamp={2}>
                                <Typography variant="h5">{name}</Typography>
                            </Dotdotdot>
                            <Typography
                                variant="subtitle2"
                                className={classes.ContentSynopsis}
                                bgcolor={props.scrollbg}
                            >
                                {synopsis || "Konu bulunamadı."}
                            </Typography>
                        </Box>
                    </div>
                    <div className={classes.ContentGenres}>
                        <ul>
                            {genres.map(g =>
                                <li key={g + slug}>
                                    <Typography variant="h6">
                                        {g}
                                    </Typography>
                                </li>)
                            }
                        </ul>
                    </div>
                </Box>
            </Link>
        </Grid>
    )
}

function AnimeContainerPlaceholder(props) {
    return (
        <Grid item xs={12} md={6} lg={4} xl={3}>
            <div height="225px">
            </div>
        </Grid>
    )
}

function MangaContainer(props) {
    const { slug, name, synopsis, genres } = props.data
    const classes = useStyles(props.data)

    return (
        <Grid item xs={12} md={6} lg={4} xl={3}>
            <Link to={mangaPage(slug)}>
                <Box p={0} boxShadow={6}>
                    <div className={classes.ContentInPlacer}>
                        <Box className={classes.ContentCover} title={name + " Cover Art"} />
                        <Box className={classes.ContentTextInfo}>
                            <Dotdotdot clamp={2}>
                                <Typography variant="h5">{name}</Typography>
                            </Dotdotdot>
                            <Typography
                                variant="subtitle2"
                                className={classes.ContentSynopsis}
                            >
                                {synopsis || "Konu bulunamadı."}
                            </Typography>
                        </Box>
                    </div>
                    <div className={classes.ContentGenres}>
                        <ul>
                            {genres.map(g =>
                                <li key={g + slug}>
                                    <Typography variant="h6">
                                        {g}
                                    </Typography>
                                </li>)
                            }
                        </ul>
                    </div>
                </Box>
            </Link>
        </Grid>
    )
}

function MangaContainerPlaceholder(props) {
    const classes = useStyles()

    return (
        <Grid item xs={12} md={6} lg={4} xl={3}>
            <Box className={classes.DefaultBox} mb={0} height="187px">

            </Box>
        </Grid>
    )
}

export {
    AnimeContainer,
    AnimeContainerPlaceholder,
    MangaContainer,
    MangaContainerPlaceholder,
    useStyles
}