import React from 'react'

import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'

import Dotdotdot from 'react-dotdotdot'
import { Link } from 'react-router-dom'
import { animePage, mangaPage } from '../../config/front-routes'

const PageContainer = styled(Box)``

const PagePlacer = styled(Grid)``

const PageTypeButton = styled(Button)`
    margin-bottom: 5px!important;
`

const PageGenreList = styled(Grid)``

const PageGenreButton = styled(Button)`
    .MuiButton-label {
        font-size: .7rem!important;
    }
`

const ContentPlacer = styled(Grid)``

const ContentInPlacer = styled.div`
    display: flex;
`

const ContentContainer = styled(Box)`

`

const ContentPremieredContainer = styled(Box)`
    border-top: ${props => props["data-bd"] ? `2px solid ${blue.A200}` : "none"}
`

const ContentPremieredText = styled(Typography)``

const ContentCover = styled(Box).attrs(props => ({
    style: {
        backgroundImage: `url(${props.bgimage})`,
    }
}))`
    width: 125px;
    height: auto;
    background-size: cover;
`

const ContentTextInfo = styled(Box)`
    padding: 5px 0 5px 10px;
    width: calc(100% - 125px)
`

const ContentTitle = styled(Typography)``

const ContentSynopsis = styled(Typography)`
    height:120px;
    overflow: hidden;

    padding-right: 6px;

    :hover {
        padding-right: 3px;
        overflow-y: auto;
    }

    :hover::-webkit-scrollbar {
        width: 3px;
    }
     
    ::-webkit-scrollbar-thumb {
      background-color: ${props => props.bgcolor};
    }

`

const ContentGenresContainer = styled(Box)``

const ContentGenres = styled.ul`
    margin-bottom: -3px;

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

const ContentWarning = styled(Box)`
    border-left: ${blue.A200} 4px solid;
    display: flex;
    align-items: center;
    svg {
        margin-right: 5px
    }
`

const ContentError = styled(Box)`
    border-left: ${red.A200} 4px solid;
    display: flex;
    align-items: center;
    svg {
        margin-right: 5px
    }
`

const defaultBoxProps = {
    boxShadow: 2, p: 0, mb: 1, bgcolor: "background.level2"
}

function AnimeContainer(props) {
    const d = props.data

    return (
        <ContentPlacer item xs={12} md={6} lg={4} xl={3} data-genres={d.genres.join(' ')}>
            <Link to={animePage(d.slug)}>
                <ContentContainer {...defaultBoxProps} mb={0}>
                    <ContentPremieredContainer p={1} bgcolor="background.level1" textAlign="center" data-bd={d.version === "bd" ? "true" : undefined}>
                        <ContentPremieredText variant="h6">{d.premiered ? d.premiered : "Bilgi bulunamadı"}</ContentPremieredText>
                    </ContentPremieredContainer>
                    <ContentInPlacer>
                        <ContentCover bgimage={d.cover_art} title={d.name + " Cover Art"} />
                        <ContentTextInfo>
                            <Dotdotdot clamp={2}>
                                <ContentTitle variant="h5">{d.name}</ContentTitle>
                            </Dotdotdot>
                            <ContentSynopsis
                                variant="subtitle2"
                                bgcolor={props.scrollbg}
                            >
                                {d.synopsis}
                            </ContentSynopsis>
                        </ContentTextInfo>
                    </ContentInPlacer>
                    <ContentGenresContainer p={1} bgcolor="background.level1" textAlign="center">
                        <ContentGenres bgcolor={props.genresbg}>
                            {d.genres.map(g =>
                                <li key={g + d.slug}>
                                    <Typography variant="h6">
                                        {g}
                                    </Typography>
                                </li>)
                            }
                        </ContentGenres>
                    </ContentGenresContainer>
                </ContentContainer>
            </Link>
        </ContentPlacer>
    )
}

function AnimeContainerPlaceholder(props) {

    return (
        <ContentPlacer item xs={12} md={6} lg={4} xl={3}>
            <div height="225px">
            </div>
        </ContentPlacer>
    )
}

function MangaContainer(props) {
    const d = props.data

    return (
        <ContentPlacer item xs={12} md={6} lg={4} xl={3} data-genres={d.genres.join(' ')}>
            <Link to={mangaPage(d.slug)}>
                <ContentContainer {...defaultBoxProps} mb={0}>
                    <ContentInPlacer>
                        <ContentCover bgimage={d.cover_art} title={d.name + " Cover Art"} />
                        <ContentTextInfo>
                            <Dotdotdot clamp={2}>
                                <ContentTitle variant="h5">{d.name}</ContentTitle>
                            </Dotdotdot>
                            <ContentSynopsis
                                variant="subtitle2"
                                bgcolor={props.scrollbg}
                            >
                                {d.synopsis}
                            </ContentSynopsis>
                        </ContentTextInfo>
                    </ContentInPlacer>
                    <ContentGenresContainer p={1} bgcolor="background.level1" textAlign="center">
                        <ContentGenres bgcolor={props.genresbg}>
                            {d.genres.map(g =>
                                <li key={g + d.slug}>
                                    <Typography variant="h6">
                                        {g}
                                    </Typography>
                                </li>)
                            }
                        </ContentGenres>
                    </ContentGenresContainer>
                </ContentContainer>
            </Link>
        </ContentPlacer>
    )
}

function MangaContainerPlaceholder(props) {
    return (
        <ContentPlacer item xs={12} md={6} lg={4} xl={3}>
            <ContentContainer {...defaultBoxProps} mb={0} height="187px">

            </ContentContainer>
        </ContentPlacer>
    )
}

export {
    PageContainer,
    PagePlacer,
    PageTypeButton,
    PageGenreList,
    PageGenreButton,
    ContentPlacer,
    ContentInPlacer,
    ContentContainer,
    ContentPremieredContainer,
    ContentPremieredText,
    ContentCover,
    ContentTextInfo,
    ContentTitle,
    ContentSynopsis,
    ContentGenresContainer,
    ContentGenres,
    ContentWarning,
    ContentError,
    AnimeContainer,
    AnimeContainerPlaceholder,
    MangaContainer,
    MangaContainerPlaceholder,
    defaultBoxProps
}