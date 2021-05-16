import { useState } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { mangaEpisodePage } from '../../../config/front-routes'

import { Grid, Typography, makeStyles } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

import Format from '../../date-fns/format'
import { CoverPlaceholder } from '../../../config/theming/images'
import { contentCover } from '../../../config/api-routes'
import { Skeleton } from '@material-ui/lab'
import { useTranslation } from 'react-i18next'

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
    Title: {
        fontSize: "0.875rem"
    },
    Metadata: {
        padding: `${theme.spacing(1)}px 0`,
        color: theme.palette.type === "dark" ? "inherit" : grey[700],
        '& *': {
            fontFamily: "'Overpass', sans-serif"
        },
        "& .MuiTypography-body1": {
            fontWeight: "bold"
        }
    }
}))

export const LoadingDivMangaEpisode = (key) =>
    <Skeleton width="100%" style={{ paddingBottom: "140%" }} variant="rect" />

export default function LatestMangaEpisode(props) {
    const { t } = useTranslation('common')
    const classes = useStyles()
    const { manga_name, manga_cover, manga_slug, episode_number, episode_name, created_by, created_time } = props
    const [imageError, setImageError] = useState(false)

    const formattedDate = Format(new Date(created_time)).toUpperCase()

    return (
        <>
            <Link to={mangaEpisodePage(manga_slug, episode_number)}>
                <Grid container className={classes.Container}>
                    <Grid item xs={12} className={classes.Image}>
                        <img
                            src={contentCover("manga", manga_slug)}
                            onError={img => {
                                img.target.onerror = null
                                if (imageError) return img.target.src = CoverPlaceholder
                                img.target.src = manga_cover
                                setImageError(true)
                            }}
                            alt="" />
                    </Grid>
                    <Grid item xs={12} className={classes.Metadata}>
                        <Typography variant="body1" className={classes.Title}>
                            {t('episode.episode_title', { episode_number: episode_number })}{episode_name ? `: ${episode_name}` : ""}
                        </Typography>
                        <Typography variant="subtitle2">
                            {formattedDate} - {created_by}
                        </Typography>
                    </Grid>
                </Grid>
            </Link>
        </>
    )
}

LatestMangaEpisode.propTypes = {
    manga_name: propTypes.string.isRequired,
    manga_cover: propTypes.string.isRequired,
    manga_slug: propTypes.string.isRequired,
    episode_number: propTypes.string.isRequired,
    episode_name: propTypes.string,
    created_by: propTypes.string.isRequired,
    created_time: propTypes.string.isRequired
}