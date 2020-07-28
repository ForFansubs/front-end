import React, { useState } from 'react'
import { useGlobal } from 'reactn'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { animePage } from '../../../config/front-routes'
import { contentHeader, contentLogo } from '../../../config/api-routes'

import { HeaderPlaceholder } from '../../../config/theming/images'

import { makeStyles, Typography, fade } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Dotdotdot from 'react-dotdotdot'

const useStyles = makeStyles(theme => ({
    Container: {
        position: "relative",
        display: "none"
    },
    ContainerActive: {
        display: "block"
    },
    ImageContainer: {
        position: "relative",
        paddingBottom: "35%",
        overflow: "hidden",
        '& img': {
            position: "absolute",
            objectFit: "cover",
            width: "100%",
            height: "100%"
        },
        [theme.breakpoints.down("sm")]: {
            paddingBottom: "80%",

            '& img': {
                height: "100%",
                marginTop: 0
            }
        }
    },
    InfoContainer: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "35%",
        backgroundColor: fade(theme.palette.background.default, 0.7),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: theme.spacing(4),
        '& h1': {
            fontSize: "4.8rem",
            lineHeight: "3.6rem"
        },
        [theme.breakpoints.down('sm')]: {
            backgroundColor: "transparent",
            width: "100%"
        }
    },
    LogoContainer: {
        maxWidth: 400,
        width: "100%",
        [theme.breakpoints.down('sm')]: {
            maxWidth: 300
        }
    },
    SynopsisContainer: {
        display: "block",
        [theme.breakpoints.down('sm')]: {
            display: "none"
        }
    },
    GenresContainer: {
        display: "flex",
        flexWrap: "wrap",
        '& span': {
            marginRight: 5,
        }
    },
    GenreList: {
        display: "flex",
        flexWrap: "wrap"
    },
    GenreItem: {
        padding: `2px ${theme.spacing(1)}px`,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        borderRadius: theme.overrides.defaultBorderRadius,
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(1),
            marginTop: theme.spacing(1),
            padding: 4
        }
    }
}))

export function FeaturedLoading() {
    const classes = useStyles()
    return (
        <>
            <div className={[classes.Container, classes.ContainerActive]}>
                <Skeleton variant="rect" width="100%" style={{ paddingBottom: "35%" }} />
                <div className={classes.InfoContainer}>
                    <Skeleton variant="text" width="50%" height={100} animation="wave" />
                    <Typography variant="h5" component="ul" className={classes.GenreList}>
                        <Skeleton variant="text" width={80} height={40} animation="wave" className={classes.GenreItem} />
                        <Skeleton variant="text" width={80} height={40} animation="wave" className={classes.GenreItem} />
                        <Skeleton variant="text" width={80} height={40} animation="wave" className={classes.GenreItem} />
                    </Typography>
                </div>
            </div>
        </>
    )
}

export default function Featured(props) {
    const { name, slug, genres, display, synopsis } = props
    const classes = useStyles(props)
    const [logoError, setLogoError] = useState(false)

    return (
        <>
            <Link to={animePage(slug)}>
                <div className={clsx(classes.Container, {
                    [classes.ContainerActive]: display,
                })}>
                    <div className={classes.ImageContainer}>
                        <img src={contentHeader("anime", slug)} onError={img => {
                            img.target.onerror = null
                            img.target.src = HeaderPlaceholder
                        }} alt={name + " toplu"} />
                    </div>
                    <div className={classes.InfoContainer}>
                        {logoError ?
                            <Typography variant="h2">
                                <Dotdotdot clamp={2} useNativeClamp>
                                    {name.toUpperCase()}
                                </Dotdotdot>
                            </Typography>
                            : <img
                                className={classes.LogoContainer}
                                src={contentLogo("anime", slug)}
                                onError={_ => {
                                    setLogoError(true)
                                }}
                                alt=""
                                title={`${name} logo`} />}
                        <div className={classes.SynopsisContainer}>
                            <Typography variant="body1">
                                <Dotdotdot clamp={4} useNativeClamp>
                                    {synopsis.toUpperCase()}
                                </Dotdotdot>
                            </Typography>
                        </div>
                        <Typography variant="h6" component="ul" className={classes.GenreList}>
                            {genres.split(',').map(genre => <li key={name + genre} className={classes.GenreItem}>{genre}</li>)}
                        </Typography>
                    </div>
                </div>
            </Link>
        </>
    )
}

Featured.propTypes = {
    name: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    premiered: PropTypes.string,
    genres: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    display: PropTypes.bool.isRequired
}