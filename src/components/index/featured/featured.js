import React from 'react'
import { useGlobal } from 'reactn'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { animePage } from '../../../config/front-routes'
import { contentHeader } from '../../../config/api-routes'

import { bluray, HeaderPlaceholder } from '../../../config/theming/images'

import { Box, makeStyles, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Dotdotdot from 'react-dotdotdot'

const useStyles = makeStyles(theme => ({
    Container: {
        position: "relative",
        boxShadow: theme.shadows[6],
        display: "none"
    },
    ContainerActive: {
        display: "block"
    },
    ImageContainer: {
        position: "relative",
        paddingBottom: "30%",
        overflow: "hidden",
        '& img': {
            position: "absolute",
            objectFit: "cover",
            width: "100%",
            marginTop: "-10%"
        },
        [theme.breakpoints.down("xs")]: {
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
        bottom: theme.spacing(4),
        left: theme.spacing(5),
        backgroundColor: theme.palette.background.default + 'dd',
        width: "40%",
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        boxShadow: theme.shadows[6],
        [theme.breakpoints.down("xs")]: {
            width: "80%",
            bottom: theme.spacing(6),
        }
    },
    GenresContainer: {
        display: "flex",
        flexWrap: "wrap",
        '& span': {
            marginRight: 5,
        }
    },
    GenreBox: {
        backgroundColor: theme.palette.primary.light,
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: `0 ${theme.spacing(1)}px`,
        color: theme.palette.primary.contrastText
    },
    PremieredContainer: {
        position: "absolute",
        top: theme.spacing(2),
        right: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        boxShadow: theme.shadows[6]
    }
}))

export function FeaturedLoading() {
    const classes = useStyles()
    return (
        <>
            <div className={[classes.Container, classes.ContainerActive]}>
                <Skeleton variant="rect" width="100%" height={500} />
                <div className={classes.InfoContainer}>
                    <Skeleton variant="text" width="50%" height={30} animation="wave" />
                    <div className={classes.GenresContainer}>
                        <div>
                            <Skeleton variant="text" width="50px" height={20} animation="wave" />
                        </div>
                        <div>
                            <Skeleton variant="text" width="50px" height={20} animation="wave" />
                        </div>
                        <div>
                            <Skeleton variant="text" width="50px" height={20} animation="wave" />
                        </div>
                    </div>
                    <Typography variant="subtitle1">
                        <Dotdotdot clamp={5}>
                            <Skeleton variant="text" width="50%" height={14} animation="wave" />
                            <Skeleton variant="text" width="50%" height={14} animation="wave" />
                            <Skeleton variant="text" width="50%" height={14} animation="wave" />
                        </Dotdotdot>
                    </Typography>
                </div>
                <div className={classes.PremieredContainer}>
                    <Typography variant="h5">
                        <Skeleton variant="text" width="60px" height={20} animation="wave" />
                    </Typography>
                </div>
            </div>
        </>
    )
}

export default function Featured(props) {
    const { name, synopsis, slug, premiered, genres, version, display } = props
    const classes = useStyles(props)
    const [mobile] = useGlobal('mobile')

    return (
        <>
            <Link to={animePage(props.slug)}>
                <div className={display ? [classes.Container, classes.ContainerActive] : classes.Container}>
                    <div className={classes.ImageContainer}>
                        <img src={contentHeader("anime", slug)} onError={img => {
                            img.target.onerror = null
                            img.target.src = HeaderPlaceholder
                        }} alt={name + " toplu"} />
                    </div>
                    <div className={classes.InfoContainer}>
                        <Typography variant={mobile ? "h4" : "h2"} component="h1">
                            {name}
                        </Typography>
                        <div className={classes.GenresContainer}>
                            {genres.split(",").map((g, i) => (
                                <div key={i + "featured" + g} className={classes.GenreBox}>
                                    {g}
                                </div>
                            ))}
                        </div>
                        <Typography variant="subtitle1">
                            <Dotdotdot clamp={mobile ? 2 : 5}>
                                {synopsis}
                            </Dotdotdot>
                        </Typography>
                    </div>
                    {premiered ?
                        <div className={classes.PremieredContainer}>
                            <Typography variant="h5">
                                {premiered}
                            </Typography>
                        </div>
                        : ""}
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