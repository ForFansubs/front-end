import React from 'react'

import Dotdotdot from 'react-dotdotdot'
import { Link } from 'react-router-dom'
import { Typography, Grid, makeStyles, Box } from '@material-ui/core'
import { animePage } from '../../../config/front-routes'
import { contentHeader } from '../../../config/api-routes'
import { HeaderPlaceholder } from '../../../config/theming/images'

const useStyles = makeStyles(theme => ({
    Container: {
        position: "relative",
        '&:hover': {
            '& $Backdrop': {
                opacity: 0.3
            },
            '& $Text': {
                opacity: 0
            }
        }
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
        zIndex: 3,
        padding: `0 ${theme.spacing(1)}px`,
        opacity: 1,
        transition: theme.transitions.create(["opacity"], { easing: theme.transitions.easing.easeInOut, duration: theme.transitions.duration.short })
    },
    Backdrop: {
        position: "absolute",
        backgroundColor: theme.palette.background.default + "cc",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 2,
        opacity: 1,
        transition: theme.transitions.create(["opacity"], { easing: theme.transitions.easing.easeInOut, duration: theme.transitions.duration.short })
    }
}))

export default (props) => {
    const { slug, name, loading } = props
    const classes = useStyles(props)

    if (loading) {
        console.log("batch yüklşeniyor")
        return (
            <>
                <p>Yükleniyor</p>
            </>
        )
    }
    else
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