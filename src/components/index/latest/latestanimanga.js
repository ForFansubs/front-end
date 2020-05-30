import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { animePage, mangaPage } from '../../../config/front-routes'


import { Grid, Box, makeStyles, Popper } from '@material-ui/core';
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import { CoverPlaceholder } from '../../../config/theming/images';

const useStyles = makeStyles(theme => ({
    Container: {
        position: "relative",
        overflow: "hidden"
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
    PopperContainer: {
        zIndex: 1,
        '&[x-placement*="bottom"] $Arrow': {
            top: 0,
            left: 0,
            marginTop: '-0.9em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '0 1em 1em 1em',
                borderColor: `transparent transparent ${theme.palette.background.level1} transparent`,
            },
        },
        '&[x-placement*="top"] $Arrow': {
            bottom: 0,
            left: 0,
            marginBottom: '-0.9em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '1em 1em 0 1em',
                borderColor: `${theme.palette.background.level1} transparent transparent transparent`,
            },
        },
        '&[x-placement*="right"] $Arrow': {
            left: 0,
            marginLeft: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${theme.palette.background.level1} transparent transparent`,
            },
        },
        '&[x-placement*="left"] $Arrow': {
            right: 0,
            marginRight: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 0 1em 1em',
                borderColor: `transparent transparent transparent ${theme.palette.background.level1}`,
            },
        },
    },
    Arrow: {
        position: 'absolute',
        fontSize: 7,
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    },
    InfoBox: {
        backgroundColor: theme.palette.background.level1,
        borderRadius: 4,
        padding: theme.spacing(2),
        maxWidth: 500,
        minHeight: 200,
        maxHeight: 275,
        overflow: "hidden"
    },
    GenresContainer: {
        marginTop: -4,
        '& span': {
            display: "inline-block",
            padding: "2px 4px",
            margin: "0 4px 4px 0",
            backgroundColor: theme.palette.background.paper
        }
    },
    SynopsisContainer: {
        overflow: "hidden",
        lineHeight: "1.4em",
        maxHeight: "9.8em",
        backgroundPosition: "bottom center"
    }
}))

export const LoadingDivAniManga = (key) =>
    <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
        <p>Yükleniyor</p>
    </Grid>

export default function LatestAniManga(props) {
    const classes = useStyles()
    const { slug, cover_art, name, synopsis, release_date, version } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const [arrowEl, setArrowEl] = React.useState(null)
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
            <Grid item xs={6} sm={6} md={4} lg={2} xl={1} className={classes.Container}>
                <Link to={props.type === "anime" ? animePage(slug) : mangaPage(slug)}
                    onMouseEnter={handlePopperMouseEnter}
                    onMouseOver={handlePopperMouseEnter}
                    onMouseLeave={handlePopperMouseLeave}
                >
                    <Grid item xs={12} className={classes.Image} ref={refEl}>
                        <img
                            src={cover_art}
                            onError={img => {
                                img.target.onerror = null
                                img.target.src = CoverPlaceholder
                            }}
                            alt={`${name} Poster Resmi`} />
                    </Grid>
                </Link>
                <div>
                    <Popper
                        id={open ? name : undefined}
                        open={open}
                        anchorEl={anchorEl}
                        placement="right"
                        className={classes.PopperContainer}
                        modifiers={{
                            flip: {
                                enabled: true,
                            },
                            preventOverflow: {
                                enabled: true,
                                boundariesElement: 'scrollParent',
                            },
                            arrow: {
                                enabled: true,
                                element: arrowEl
                            },
                        }}
                        transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <div>
                                    <span className={classes.Arrow} ref={setArrowEl} />
                                    <Box className={classes.InfoBox}>
                                        <Typography variant="body1" component="p">
                                            <b>{name}{release_date ? ` - ${new Date(release_date).getFullYear()}` : ""}</b>
                                        </Typography>
                                        <Typography variant="body1" component="div" className={classes.GenresContainer}>
                                            {genres}
                                        </Typography>
                                        <Typography variant="subtitle1" component="p" className={classes.SynopsisContainer}>
                                            {synopsis}
                                        </Typography>
                                    </Box>
                                </div>
                            </Fade>
                        )}
                    </Popper>

                </div>
            </Grid>
        </>
    )
}