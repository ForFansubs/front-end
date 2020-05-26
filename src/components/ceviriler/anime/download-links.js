import React, { useState } from 'react'
import axios from '../../../config/axios/axios'

import { Button, Popper, Box, Fade, makeStyles, ClickAwayListener } from '@material-ui/core'

import { getEpisodeDownloadLinks } from '../../../config/api-routes'
import { Typography } from '@material-ui/core';
import WarningBox from '../../warningerrorbox/warning';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    Container: {
        backgroundColor: theme.palette.background.paper,
        zIndex: 4
    },
    Button: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
        boxShadow: theme.shadows[6]
    },
    LinkContainer: {
        backgroundColor: theme.palette.background.level1,
        '&:hover': {
            backgroundColor: theme.palette.background.paper
        }
    },
    Backdrop: {
        zIndex: 3,

    }
}))

export default function DownloadLink(props) {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    function handleShowEvent(event) {
        if (anchorEl) setAnchorEl(null)
        else {
            handleData()
            setAnchorEl(event.currentTarget)
        }
    }

    function handleCloseEvent() {
        setAnchorEl(null)
    }

    async function handleData() {
        if (data.length === 0) {
            const postData = {
                episode_id: props.episodeid
            }

            const res = await axios.post(getEpisodeDownloadLinks(props.animeslug), postData)

            setData(res.data)
            setLoading(false)
        }

    }

    function DownloadLinkContainer() {
        if (!loading && data.length !== 0)
            return (
                data.map((d, i) => (
                    <a href={d.link} target="_blank" rel="noopener noreferrer" key={d.link}>
                        <Box
                            className={classes.LinkContainer}
                            boxShadow={2}
                            px={3}
                            py={1}
                            mb={data.length === i + 1 ? 0 : 1}
                            transition={props.transition}
                        >
                            <Typography variant="h6">{d.type.toUpperCase()}</Typography>
                        </Box>
                    </a>
                ))
            )

        else if (!loading && data.length === 0)
            return <WarningBox bgcolor="background.level1">Link bulunamadı.</WarningBox>

        else return (
            <div>
                <Box
                    className={classes.LinkContainer}
                    boxShadow={2}
                    px={3}
                    py={1}
                    mb={1}
                >
                    <Skeleton variant="text" width="60px" height={20} animation="wave" />
                </Box>
                <Box
                    className={classes.LinkContainer}
                    boxShadow={2}
                    px={3}
                    py={1}
                    mb={1}
                >
                    <Skeleton variant="text" width="60px" height={20} animation="wave" />
                </Box>
                <Box
                    className={classes.LinkContainer}
                    boxShadow={2}
                    px={3}
                    py={1}
                >
                    <Skeleton variant="text" width="60px" height={20} animation="wave" />
                </Box>
            </div>
        )
    }

    return (
        <>
            <ClickAwayListener onClickAway={handleCloseEvent}>
                <Button variant="outlined" aria-describedby={id} onClick={handleShowEvent} className={classes.Button}>
                    {props.title}
                </Button>
            </ClickAwayListener>

            <Popper placement="bottom-start" id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box className={classes.Container} boxShadow={2} p={1}>
                            <DownloadLinkContainer />
                        </Box>
                    </Fade>
                )}
            </Popper>
        </>
    )
}