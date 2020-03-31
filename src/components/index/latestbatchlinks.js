import React from 'react'

import Dotdotdot from 'react-dotdotdot'
import { Link } from 'react-router-dom'
import { Typography, Grid, makeStyles, Box } from '@material-ui/core'
import { animePage } from '../../config/front-routes'
import { contentHeader } from '../../config/api-routes'
import { HeaderPlaceholder } from '../../config/theming/images'

const useStyles = makeStyles(theme => ({
    Container: {
        position: "relative"
    },
    ImageContainer: {
        position: "relative",
        boxShadow: theme.shadows[6],
        paddingBottom: "25%",
        overflow: "hidden",
        '& img': {
            position: "absolute",
            objectFit: "cover",
            width: "100%",
            marginTop: "-12%"
        }
    },
    Text: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        textAlign: "center",
        zIndex: 3
    },
    Backdrop: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.8)",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 2,
        opacity: 1,
        transition: theme.transitions.create(["opacity"], { easing: theme.transitions.easing.easeInOut, duration: theme.transitions.duration.short }),
        '&:hover': {
            opacity: 0.5
        }
    }
}))

export default function LatestBatchLinks(props) {
    const { slug, name } = props
    const classes = useStyles(props)

    return (
        <>
            <Grid item xs={6} md={4} lg={2}>
                <Link to={animePage(slug)}>
                    <div className={classes.Container}>
                        <div className={classes.ImageContainer}>
                            <img src={contentHeader("anime", props.slug)} onError={img => {
                                img.target.onerror = null
                                img.target.src = HeaderPlaceholder
                            }} alt={name + " toplu"} />
                        </div>
                        <div className={classes.Text}>
                            <Dotdotdot clamp={1} useNativeClamp>
                                <Typography variant="h6">
                                    {name}
                                </Typography>
                            </Dotdotdot>
                        </div>
                        <div className={classes.Backdrop} />
                    </div>
                </Link>
            </Grid>
        </>
    )
}