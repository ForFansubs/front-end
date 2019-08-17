import React from 'react'
import { Link } from 'react-router-dom'
import { animePage, mangaPage } from '../../config/front-routes'
import Typography from '@material-ui/core/Typography'

import Dotdotdot from 'react-dotdotdot'

import styled, { css, keyframes } from 'styled-components'
import Grid from '@material-ui/core/Grid';

import Moment from 'react-moment'
import { calendarStrings } from '../../config/moment'
import { Box } from '@material-ui/core';

const ContentInfo = styled.div`
        padding: 0 15px;
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
`

const ContentAltInfo = styled.div`
    max-height: 0px;
    overflow: hidden;

    transition: ${props => props.transition};
`

const ContentTitle = styled(Typography)`
    font-size: 1rem!important;
`

const ContentDiv = styled(Box)`
        display: flex;
        min-height: 170px;
        transition: ${props => props.transition};

        :hover {
            background: ${props => props.hoverbg};

            ${ContentAltInfo} {
                max-height: 80px;
            }
    `

const ContentCoverArt = styled.div`
        width: 30%;
        background: url(${props => props.image});
        background-size: cover;
        background-position: center;
    `

const ContentGenres = styled.ul`
li {
    display: inline-block;
    padding: 2px 4px;
    background: ${props => props.bgcolor};
    margin: 0 3px 3px 0;

    h6 {
        font-size: .6rem;
        font-weight: 400!important;
    }
}
`

const ContentSynopsis = styled(Typography)`
        font-weight: bold,
    `

const ContentReleaseTime = styled(Typography)``

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
    min-height: 170px;
    width: 30%;
`

const LoadingTextContainer = styled.div`
    padding: 0 15px;
    width: 70%;
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

const LoadingGenreContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const LoadingGenre = styled.div`
    ${animated_background};
    height: 10px;
    width: 40px;
    margin: 4px 4px 4px 0;
`

export const LoadingDivAniManga = (key) =>
    <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
        <Box
            bgcolor="background.level2"
            boxShadow={2} display="flex">
            <Grid container>
                <LoadingImage />
                <LoadingTextContainer>
                    <LoadingText />
                    <LoadingGenreContainer>
                        <LoadingGenre />
                        <LoadingGenre />
                        <LoadingGenre />
                    </LoadingGenreContainer>
                </LoadingTextContainer>
            </Grid>
        </Box>
    </Grid>

export default function LatestAniManga(props) {
    const theme = props.theme

    const { slug, cover_art, name, synopsis, created_time, created_by } = props
    const genres = props.genres.split(',').map((d, i) => i < 5 ? (
        <li key={props.name + d}>
            <Typography variant="h6">
                {d}
            </Typography>
        </li>
    ) : null)

    switch (props.type) {
        case "anime":
            return (
                <>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Link to={animePage(slug)}>
                            <ContentDiv
                                bgcolor="background.level2"
                                boxShadow={2}
                                transition={theme.transitions.create('background', {
                                    easing: theme.transitions.easing.easeInOut,
                                    duration: theme.transitions.duration.short,
                                })}
                                hoverbg={theme.palette.background.paper}>
                                <ContentCoverArt image={cover_art} />
                                <ContentInfo>
                                    <ContentTitle
                                        variant="h6"
                                    >
                                        <Dotdotdot clamp={2}>
                                            {name}
                                        </Dotdotdot>
                                    </ContentTitle>
                                    <ContentGenres bgcolor={theme.palette.background.level1}>{genres}</ContentGenres>
                                    <ContentAltInfo
                                        transition={theme.transitions.create('max-height', {
                                            easing: theme.transitions.easing.ease,
                                            duration: theme.transitions.duration.short,
                                        })}>
                                        <Dotdotdot clamp={3}>
                                            <ContentSynopsis variant="subtitle2">
                                                {synopsis}
                                            </ContentSynopsis>
                                        </Dotdotdot>
                                        <ContentReleaseTime variant="subtitle2">
                                            <Moment calendar={calendarStrings} locale="tr">{created_time}</Moment> - {created_by}
                                        </ContentReleaseTime>
                                    </ContentAltInfo>
                                </ContentInfo>
                            </ContentDiv>
                        </Link>
                    </Grid>
                </>
            )
        case "manga":
            return (
                <>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Link to={mangaPage(props.slug)}>
                            <ContentDiv
                                bgcolor="background.level2"
                                boxShadow={2}
                                transition={theme.transitions.create('background', {
                                    easing: theme.transitions.easing.easeInOut,
                                    duration: theme.transitions.duration.short,
                                })}
                                hoverbg={theme.palette.background.paper}>
                                <ContentCoverArt image={cover_art} />
                                <ContentInfo>
                                    <ContentTitle
                                        variant="h6"
                                    >
                                        <Dotdotdot clamp={2}>
                                            {name}
                                        </Dotdotdot>
                                    </ContentTitle>
                                    <ContentGenres bgcolor={theme.palette.background.level1}>{genres}</ContentGenres>
                                    <ContentAltInfo
                                        transition={theme.transitions.create('max-height', {
                                            easing: theme.transitions.easing.ease,
                                            duration: theme.transitions.duration.short,
                                        })}>

                                        <Dotdotdot clamp={3}>
                                            <ContentSynopsis variant="subtitle2">
                                                {synopsis}
                                            </ContentSynopsis>
                                        </Dotdotdot>
                                        <ContentReleaseTime variant="subtitle2">
                                            <Moment calendar={calendarStrings} locale="tr">{created_time}</Moment> - {created_by}
                                        </ContentReleaseTime>
                                    </ContentAltInfo>
                                </ContentInfo>
                            </ContentDiv>
                        </Link>
                    </Grid>
                </>
            )
        default:
            return false
    }


}