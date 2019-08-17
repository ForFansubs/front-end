import React, { useState } from 'react'
import axios from '../../../config/axios/axios'

import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade';
import WarningIcon from '@material-ui/icons/Warning';
import styled, { css, keyframes } from 'styled-components'

import { ContentEpisodesLinksButton, ContentEpisodesError, defaultBoxProps } from '../components'

import { getEpisodeDownloadLinks } from '../../../config/api-routes'
import { Typography } from '@material-ui/core';

const loading_animation = keyframes`
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
`

const animated_background = css`
    height: 60px;
    width: 60px;
    animation-duration: 1.25s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${loading_animation};
    animation-timing-function: linear;
    background: #090909;
    background: linear-gradient(to right, #090909 8%, #2d2d2d 18%, #090909 33%);
    background-size: 800px 104px;
    height: 96px;
    position: relative;
`

const LoadingTextContainer = styled.div`
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const LoadingText = styled.div`
    ${animated_background};
    height: 10px;
    width: 60px;
    margin: 4px 0;
`

export default function DownloadLink(props) {
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
                        <ContentEpisodesLinksButton
                            boxShadow={2}
                            bgcolor="background.level1"
                            hoverbg={props.hoverbg}
                            px={3}
                            py={1}
                            mb={data.length === i + 1 ? 0 : 1}
                            transition={props.transition}
                        >
                            <Typography variant="h6">{d.type.toUpperCase()}</Typography>
                        </ContentEpisodesLinksButton>
                    </a>
                ))
            )

        else if (!loading && data.length === 0)
            return <ContentEpisodesError bgcolor="secondary.main" p={1} mb={0}><WarningIcon /><Typography variant="subtitle2">Link bulunamadı.</Typography></ContentEpisodesError>

        else return (
            <div>
                <ContentEpisodesLinksButton
                    boxShadow={2}
                    bgcolor="background.level1"
                    px={3}
                    py={1}
                    mb={1}
                >
                    <LoadingTextContainer>
                        <LoadingText />
                    </LoadingTextContainer>
                </ContentEpisodesLinksButton>
                <ContentEpisodesLinksButton
                    boxShadow={2}
                    bgcolor="background.level1"
                    px={3}
                    py={1}
                    mb={1}
                >
                    <LoadingTextContainer>
                        <LoadingText />
                    </LoadingTextContainer>
                </ContentEpisodesLinksButton>
                <ContentEpisodesLinksButton
                    boxShadow={2}
                    bgcolor="background.level1"
                    px={3}
                    py={1}
                    mb={1}
                >
                    <LoadingTextContainer>
                        <LoadingText />
                    </LoadingTextContainer>
                </ContentEpisodesLinksButton>
            </div>
        )
    }

    return (
        <>
            <Button variant="outlined" aria-describedby={id} onClick={handleShowEvent}>
                {props.title}
            </Button>
            <Popper placement="bottom-start" id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box boxShadow={2} {...defaultBoxProps} >
                            <DownloadLinkContainer />
                        </Box>
                    </Fade>
                )}
            </Popper>
        </>
    )
}