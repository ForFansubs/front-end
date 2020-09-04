import React, { useState } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Grid, Typography, makeStyles } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { Skeleton } from '@material-ui/lab'
import Dotdotdot from 'react-dotdotdot'
import Format from '../../date-fns/format'
import EpisodeTitleParser from '../../../config/episode-title-parser'
import { CoverPlaceholder } from '../../../config/theming/images'

import { episodePage } from '../../../config/front-routes'
import { contentCover } from '../../../config/api-routes'

const useStyles = makeStyles(theme => ({
    Container: {
        position: "relative"
    },
    Image: {
        position: "relative",
        paddingBottom: "140%",
        overflow: "hidden",
        boxShadow: theme.shadows[6],
        '& img': {
            position: "absolute",
            objectFit: "cover",
            width: "100%",
            height: "100%"
        }
    },
    Metadata: {
        padding: `${theme.spacing(1)}px 0`,
        color: theme.palette.type === "dark" ? "inherit" : grey[700],
        '& *': {
            fontFamily: "'Overpass', sans-serif"
        }
    }
}))

export const LoadingDivEpisode = (key) =>
    <Skeleton width="100%" style={{ paddingBottom: "140%" }} variant="rect" />

export default function LatestEpisode(props) {
    const classes = useStyles()
    const { anime_name, episode_number, special_type, cover_art, created_by } = props
    const [imageError, setImageError] = useState(false)

    const episodeInfo = EpisodeTitleParser(anime_name, episode_number, special_type)

    const formattedDate = Format(new Date(props.created_time)).toUpperCase()

    return (
        <>
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
                            alt={`${anime_name} ${episodeInfo.title} Cover Art`} />
                    </Grid>
                    <Grid item xs={12} className={classes.Metadata}>
                        <Dotdotdot clamp={2} useNativeClamp>
                            <Typography variant="body2">
                                {episodeInfo.title}
                            </Typography>
                        </Dotdotdot>
                        <Typography variant="subtitle2">
                            {formattedDate} - {created_by}
                        </Typography>
                    </Grid>
                </Grid>
            </Link>
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