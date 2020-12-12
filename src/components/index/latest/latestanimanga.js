import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { animePage, mangaPage } from '../../../config/front-routes'

import { Grid, makeStyles, Popper, Fade, Divider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors'
import Typography from '@material-ui/core/Typography'
import { CoverPlaceholder } from '../../../config/theming/images';
import { Skeleton } from '@material-ui/lab';
import Dotdotdot from 'react-dotdotdot';
import { contentCover } from '../../../config/api-routes';

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
        marginTop: theme.spacing(1),
        color: theme.palette.type === "dark" ? "inherit" : grey[700],
        "& .MuiTypography-body1": {
            fontFamily: "'Overpass', sans-serif",
            fontSize: "0.875rem",
            fontWeight: "bold"
        }
    },
    PopperContainer: {
        zIndex: 1
    },
    InfoBox: {
        backgroundColor: theme.palette.background.level1,
        borderRadius: 4,
        padding: theme.spacing(2),
        maxWidth: 500,
        minWidth: 350,
        minHeight: 200,
        maxHeight: 275,
        overflow: "hidden",
        "& h2": {
            fontFamily: "'Overpass', sans-serif",
            fontSize: "1rem"
        },
    },
    GenresContainer: {
        marginBottom: theme.spacing(1),
        '& span': {
            display: "inline-block",
            padding: "0 4px",
            margin: "0 4px 4px 0",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        }
    },
    SynopsisContainer: {
        fontSize: "0.875rem",
        marginTop: theme.spacing(1)
    }

}))

export const LoadingDivAniManga = (key) => {
    return (
        <Grid key={key} item xs={4} sm={3} md={2} lg={2} xl={1}>
            <Skeleton width="100%" style={{ paddingBottom: "140%" }} variant="rect" />
        </Grid>
    )
}


export default function LatestAniManga(props) {
    const classes = useStyles()
    const { slug, cover_art, name, synopsis, release_date, version } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const [imageError, setImageError] = useState(false)
    const refEl = useRef()

    const genres = props.genres.split(',').map((d, i) => i < 5 ? (
        <Typography key={props.name + d} variant="subtitle2" component="span">
            {d}
        </Typography>
    ) : null)

    function handlePopperMouseEnter() {
        setAnchorEl(refEl.current)
    }

    function handlePopperMouseLeave() {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)

    return (
        <>
            <Grid item xs={4} sm={3} md={2} lg={2} xl={1} className={classes.Container}>
                <Link to={props.type === "anime" ? animePage(slug) : mangaPage(slug)}
                    onMouseEnter={handlePopperMouseEnter}
                    onMouseOver={handlePopperMouseEnter}
                    onMouseLeave={handlePopperMouseLeave}
                >
                    <Grid item xs={12} className={classes.Image} ref={refEl}>
                        <img
                            src={contentCover(props.type, slug)}
                            onError={img => {
                                img.target.onerror = null
                                if (imageError) return img.target.src = CoverPlaceholder
                                img.target.src = cover_art
                                setImageError(true)
                            }}
                            alt="" />
                    </Grid>
                    <Grid item xs={12} className={classes.Title}>
                        <Dotdotdot clamp={2} useNativeClamp>
                            <Typography variant="body1">
                                {name}
                            </Typography>
                        </Dotdotdot>
                    </Grid>
                </Link>
                <div>
                    <Popper
                        id={open ? name : undefined}
                        open={open}
                        anchorEl={anchorEl}
                        placement="right"
                        className={classes.PopperContainer}
                        disablePortal={true}
                        modifiers={{
                            flip: {
                                enabled: true,
                            },
                            preventOverflow: {
                                enabled: true,
                                boundariesElement: 'scrollParent',
                            }
                        }}
                        transition>
                        {({ TransitionProps }) =>
                            (
                                <Fade {...TransitionProps} timeout={100} exit={false}>
                                    <div>
                                        <div className={classes.InfoBox}>
                                            <Dotdotdot clamp={2} useNativeClamp>
                                                <Typography variant="body1" component="h2">
                                                    <b>{name}{release_date ? ` - ${new Date(release_date).getFullYear()}` : ""}{version === "bd" ? ` - (Blu-ray)` : ""}</b>
                                                </Typography>
                                            </Dotdotdot>
                                            <Typography variant="body1" component="div" className={classes.GenresContainer}>
                                                {genres}
                                            </Typography>
                                            <Divider />
                                            <Dotdotdot clamp={7} useNativeClamp>
                                                <Typography variant="subtitle1" component="p" className={classes.SynopsisContainer}>
                                                    {synopsis}
                                                </Typography>
                                            </Dotdotdot>
                                        </div>
                                    </div>
                                </Fade>
                            )
                        }
                    </Popper>
                </div>
            </Grid>
        </>
    )
}