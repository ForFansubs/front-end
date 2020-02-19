import React from 'react'
import { Link } from 'react-router-dom'
import { animePage } from '../../config/front-routes'
import { contentHeader } from '../../config/api-routes'


import styled, { keyframes, css } from 'styled-components'
import shadows from '../../config/theming/shadows'
import borders from '../../config/theming/borders'

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const FeaturedImage = styled(Box).attrs(props => props.slug ? ({
    style: {
        backgroundImage: `url(${contentHeader("anime", props.slug)})`,
    }
}) : "")`
        width: 100%;
        max-width: 100%;
        height: 200px;
        background-size: cover
        background-position: center;
        transition: ${props => props.transition};
        .slick-current & {
            transform: scale(1.16) translateX(6%);
            z-index: 3;
        }
    `

const FeaturedTitle = styled(Typography)`
    font-size: 1.2rem!important;
    color: white;
`

const FeaturedPremiered = styled(Typography)`
    font-weight: 200!important;
    color: white;
`

const FeaturedDivInner = styled.div`
        position: absolute;
        left:0;
        right: 0;
        text-align:center;
        bottom: 10px;
        transition: ${props => props.transition};
        ${FeaturedTitle} {
            text-shadow: ${shadows.text_shadows[0]};
        }
        .slick-current & {
            transform: scale(1.16) translateX(6%);
            bottom: 0px;
            z-index: 4;
            transform-origin: center top;
        }
        ${FeaturedPremiered} {
            font-size: 1rem;
            opacity: 0;
            transition: ${props => props.transition};
            text-shadow: ${shadows.text_shadows[0]};
            .slick-current & {
                opacity: 1;
            }
        }
    `

const FeaturedInfoDiv = styled.div`
        opacity: 0;
        max-height: 0;
        transition: ${props => props.transition};
        .slick-current & {
            opacity: 1;
            max-height: 80px;
        }
    `

const GenresUl = styled.ul`
        color: white;
        padding: 2px 10px 0;
        font-size: 0.875rem;
        display: flex;
        list-style: none;
        justify-content: center;
        flex-wrap: wrap;
        li {
            font-size: .6rem;
            font-weight: 200;
            padding: 2px 5px;
            margin: 0 3px 5px;
            background: ${props => props.bgcolor};
        }
    `

const FeaturedLoadingDiv = styled.div`
    min-height: 200px;
    width: 100%;
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
    background-size: 1000px 104px;
    height: 96px;
    position: relative;
`

const LoadingText = styled.div`
    ${animated_background};
    height: 20px;
    width: 80%;
    margin: 4px 10%;
`

const LoadingGenre = styled.div`
    ${animated_background};
    height: 15px;
    width: 40px;
    margin: 4px 4px 4px 0;
`

const FeaturedDiv = styled.div`
    margin: 0;
    
    @media(max-width:${props => props.theme.breakpoints.values.sm}px) {
        ${FeaturedDivInner} {
            .slick-current & {
                transform: scale(1);
                bottom: 10px;
                z-index: 4;
            }
        }

        ${FeaturedImage} {
            .slick-current & {
                transform: scale(1);
            }
        }

        ${GenresUl} {
            padding: 0;
        }
    }
`

export const FeaturedLoading = (key, active) => {
    return (
        <FeaturedLoadingDiv key={key} className={active ? "slick-current" : ""}>
            <Box
                position="relative"
                display="flex"
                justifyContent="center"
                flexDirection="row"
                boxShadow={0}
                my={2}
                mx={0}
                px={1}>
                <FeaturedImage boxShadow={2} bgcolor="background.level2" />
                <FeaturedDivInner>
                    <LoadingText />
                    <FeaturedInfoDiv>
                        <GenresUl>
                            <LoadingGenre />
                            <LoadingGenre />
                            <LoadingGenre />
                        </GenresUl>
                    </FeaturedInfoDiv>
                </FeaturedDivInner>
            </Box>
        </FeaturedLoadingDiv>
    )
}

export default function Featured(props) {
    const theme = props.theme

    return (
        <>
            <Link to={animePage(props.slug)}>
                <FeaturedDiv theme={theme}>
                    <Box
                        position="relative"
                        display="flex"
                        justifyContent="center"
                        flexDirection="row"
                        my={2}
                        mx={0}
                        p={1}
                        key={props.id}>
                        <FeaturedImage
                            boxShadow={2}
                            slug={props.slug}
                            transition={theme.transitions.create('all', {
                                easing: theme.transitions.easing.easing,
                                duration: theme.transitions.duration.short,
                            })} />
                        <FeaturedDivInner
                            transition={theme.transitions.create('all', {
                                easing: theme.transitions.easing.easeInOut,
                                duration: theme.transitions.duration.short,
                            })}>
                            {props.premiered ?
                                <FeaturedPremiered
                                    textcolor={theme.palette.common.white}
                                    variant="h3"
                                    transition={theme.transitions.create('opacity', {
                                        easing: theme.transitions.easing.easeInOut,
                                        duration: theme.transitions.duration.short,
                                    })}
                                >{props.premiered}</FeaturedPremiered>
                                :
                                null}
                            <FeaturedTitle variant="h2">{props.title}</FeaturedTitle>
                            <FeaturedInfoDiv
                                transition={theme.transitions.create('all', {
                                    easing: theme.transitions.easing.easeInOut,
                                    duration: theme.transitions.duration.short,
                                })}>
                                <GenresUl bgcolor={theme.palette.primary.main}>
                                    {props.genres.split(',').map(genre => <li key={genre + props.slug}>{genre}</li>)}
                                </GenresUl>
                            </FeaturedInfoDiv>
                        </FeaturedDivInner>
                    </Box>
                </FeaturedDiv>
            </Link>
        </>
    )
}