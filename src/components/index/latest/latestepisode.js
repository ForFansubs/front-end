import React from 'react'
import { Link } from 'react-router-dom'
import { episodePage } from '../../../config/front-routes'
import Dotdotdot from 'react-dotdotdot'

import styled, { css, keyframes } from 'styled-components'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import Format from '../../date-fns/format'
import episodeTitleParser from '../../../config/episode-title-parser'

const EpisodeDiv = styled(Box)`
    display: flex;
    min-height: 80px;
    transition: ${props => props.transition};
    :hover {
        background: ${props => props.hoverbg};
    }
`

const EpisodeCoverArt = styled.div.attrs(props => ({
    style: {
        backgroundImage: `url(${props.image})`,
    }
}))`
    width: 25%;
    background-size: cover;
    background-position: center;
`

const EpisodeInfo = styled.div`
    padding: 15px;
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const EpisodeTitle = styled(Typography)`
    line-height: 1rem!important;
    font-size: .8rem!important;
`
// eslint-disable-next-line
const EpisodeCredits = styled(Typography)`
    font-size: .8rem!important;
`

const EpisodeReleaseTime = styled(Typography)`
    font-size: .6rem!important;
`

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

const LoadingImage = styled.div`
    ${animated_background};
    width: 25%;
`

const LoadingTextContainer = styled.div`
    padding: 15px;
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const LoadingText = styled.div`
    ${animated_background};
    height: 10px;
    width: 100%;
    margin: 4px 0;
`

export const LoadingDivEpisode = (key) =>
    <Grid key={key} item xs={6} sm={6} md={6} lg={2}>
        <Box
            bgcolor="background.level2"
            boxShadow={2} display="flex" minHeight="80px">
            <Grid container>
                <LoadingImage />
                <LoadingTextContainer>
                    <LoadingText />
                    <LoadingText />
                    <LoadingText />
                </LoadingTextContainer>
            </Grid>
        </Box>
    </Grid>

export default function LatestEpisode(props) {
    const { theme } = props

    const episodeInfo = episodeTitleParser(props.anime_name, props.episode_number, props.special_type)

    return (
        <>
            <Grid item xs={6} sm={6} md={6} lg={2}>
                <Link to={episodePage(props.anime_slug, episodeInfo.slug)}>
                    <EpisodeDiv
                        bgcolor="background.level2"
                        boxShadow={2}
                        transition={theme.transitions.create('background', {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.short,
                        })}
                        hoverbg={theme.palette.background.paper}>
                        <EpisodeCoverArt image={props.cover_art} />
                        <EpisodeInfo>
                            <Dotdotdot clamp={2} useNativeClamp>
                                <EpisodeTitle variant="h6">{episodeInfo.title}</EpisodeTitle>
                            </Dotdotdot>
                            {/* <Dotdotdot clamp={1}>
                                <EpisodeCredits variant="subtitle1">{props.credits}</EpisodeCredits>
                            </Dotdotdot> */}
                            <Dotdotdot clamp={1}>
                                <EpisodeReleaseTime variant="subtitle2">
                                    {Format(new Date(props.created_time)).toUpperCase()} · {props.created_by ? props.created_by : "Silinmiş Kullanıcı"}
                                </EpisodeReleaseTime>
                            </Dotdotdot>
                        </EpisodeInfo>
                    </EpisodeDiv>
                </Link>
            </Grid>
        </>
    )
}