import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { episodePage } from '../../../config/front-routes'

import { Grid, Typography, makeStyles } from '@material-ui/core'

import Format from '../../date-fns/format'
import episodeTitleParser from '../../../config/episode-title-parser'
import { CoverPlaceholder } from '../../../config/theming/images'
import { contentCover } from '../../../config/api-routes'
import { useState } from 'reactn'
import { Skeleton } from '@material-ui/lab'
import Dotdotdot from 'react-dotdotdot'

const useStyles = makeStyles(theme => ({
    Container: {
        position: "relative",
        overflow: "hidden",
        boxShadow: theme.shadows[6],
        '&:hover': {
            '& $HiddenMetadata': {
                maxHeight: 1000
            }
        }
    },
    Image: {
        position: "relative",
        paddingBottom: "140%",
        overflow: "hidden",
        '& img': {
            position: "absolute",
            objectFit: "cover",
            width: "100%",
            height: "100%"
        }
    },
    Metadata: {
        position: "absolute",
        padding: theme.spacing(1),
        bottom: 0,
        left: 0,
        right: 0,
        background: `linear-gradient(0deg, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 0%, ${theme.palette.background.default}00 100%)`
    },
    HiddenMetadata: {
        maxHeight: 0,
        overflow: "hidden",
        transition: theme.transitions.create('max-height', {
            easing: theme.transitions.easing.easeInOut,
            duration: "500ms",
        })
    }
}))

export const LoadingDivEpisode = (key) =>
    <Grid key={key} item xs={4} sm={3} md={2} lg={2} xl={2}>
        <Skeleton width="100%" style={{ paddingBottom: "140%" }} variant="rect" />
    </Grid>

export default function LatestEpisode(props) {
    const classes = useStyles()
    const { anime_name, episode_number, special_type, cover_art, credits, created_by } = props
    const [imageError, setImageError] = useState(false)

    const episodeInfo = episodeTitleParser(anime_name, episode_number, special_type)

    const formattedDate = Format(new Date(props.created_time)).toUpperCase()

    return (
        <>
            <Grid item xs={4} sm={3} md={2} lg={2} xl={2}>
                <Link to={episodePage(props.anime_slug, episodeInfo.slug)}>
                    <Grid container className={classes.Container}>
                        <Grid item xs={12} className={classes.Image}>
                            <img
                                src={contentCover("anime", props.anime_slug)}
                                onError={img => {
                                    img.target.onerror = null
                                    if (imageError) return img.target.src = CoverPlaceholder
                                    img.target.src = cover_art
                                    setImageError(true)
                                }}
                                alt={`${anime_name} ${episodeInfo.title} Poster Resmi`} />
                        </Grid>
                        <Grid item xs={12} className={classes.Metadata}>
                            <Dotdotdot clamp={3}>
                                <Typography variant="body2" className={classes.HiddenMetadata} component="p">
                                    {anime_name}
                                </Typography>
                            </Dotdotdot>
                            <Typography variant="body2">
                                {episodeInfo.title}
                            </Typography>
                            <Typography variant="subtitle2" className={classes.HiddenMetadata}>
                                {formattedDate} - {created_by}
                            </Typography>
                        </Grid>
                    </Grid>
                </Link>
            </Grid>
        </>
    )
}

LatestEpisode.propTypes = {
    anime_name: propTypes.string.isRequired,
    episode_number: propTypes.string.isRequired,
    special_type: propTypes.string.isRequired,
    cover_art: propTypes.string.isRequired,
    credits: propTypes.string.isRequired,
    created_by: propTypes.string.isRequired,
    created_time: propTypes.string.isRequired
}