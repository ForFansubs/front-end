import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import styled, { keyframes } from 'styled-components'
import DisqusBox from '../../components/disqus/disqus'

import yellow from '@material-ui/core/colors/yellow'
import red from '@material-ui/core/colors/red'

const fadeout = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const fadein = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const PagePlacer = styled(Grid)``

const PageContainer = styled(Box)``

const ContentTitle = styled(Typography)`
    font-size: 2rem!important;
`

const ContentIframePlaceholder = styled(Box)`
    position: absolute;
    top: 0; 
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ContentLinksContainer = styled(Box)`
    position: absolute;
    top: 20px;
    left: 20px;
    margin-right: 20px;
    margin-bottom: -4px;
    z-index: 3;
    animation: ${fadeout} 500ms 2s both;

    button {
        margin-bottom: 4px;
    }
`

const ContentIframeContainer = styled(Box)`
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;

    :hover {
        ${ContentLinksContainer} {
            animation: ${fadein} 500ms both;
        }
    }
`

const ContentIframe = styled.iframe`
    position: absolute;
    top: 0; 
    left: 0;
    width: 100%;
    height: 100%;
`

const ContentFallback = styled.div`
    position: absolute;
    top: 0; 
    left: 0;
    width: 100%;
    height: 100%;
`

const ContentLinksButtonContainer = styled.div`
    margin-bottom: -4px;
`

const ContentLinksButton = styled(Button)`
    margin-right: ${props => props.last ? "0" : "4px"}!important;

    span {
        font-size: .7rem;
    }
`

const ContentEpisodeContainer = styled(Box)`
    max-height: 200px;
    overflow: auto;
`

const ContentEpisodeButtons = styled(Button)`
    margin-bottom: ${props => props.last === "true" ? "0" : "5px"}!important;
`

const ContentCreditsContainer = styled(Box)`
`

const ContentCommentsContainer = styled(DisqusBox)`
`

const ContentAnimeButton = styled(Button)``

const ContentWarning = styled(Box)`
    border-left: ${yellow.A200} 4px solid;
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

const Page = styled(Grid)`
@media(max-width:${props => props.theme.breakpoints.values.sm}px) {
    ${ContentLinksContainer} {
        display: block;
        overflow: auto;
        animation: none;
        right: 20px;
        margin-right: 0;
    }

    ${ContentLinksButtonContainer} {
        display: flex;
        overflow-x: auto;
        width: fit-content;
    }

    ${ContentIframeContainer} {
        :hover {
            ${ContentLinksContainer} {
                animation: none;
            }
        }
    }
}
`

function EpisodeListParser(episodenumber, specialtype) {

    if (specialtype && specialtype !== "toplu") {
        return {
            title: `${specialtype.toUpperCase()} ${episodenumber}`,
            slug: `${specialtype}${episodenumber}`,
            data: `${specialtype}-${episodenumber}`
        }
    }
    else return {
        title: `${episodenumber}. Bölüm`,
        slug: `bolum${episodenumber}`,
        data: `bolum-${episodenumber}`
    }
}

const defaultBoxProps = {
    boxShadow: 2, bgcolor: "background.level2"
}

export {
    Page,
    PagePlacer,
    PageContainer,
    ContentTitle,
    ContentIframeContainer,
    ContentIframe,
    ContentFallback,
    ContentIframePlaceholder,
    ContentLinksContainer,
    ContentLinksButtonContainer,
    ContentLinksButton,
    ContentEpisodeContainer,
    ContentEpisodeButtons,
    ContentCreditsContainer,
    ContentCommentsContainer,
    ContentAnimeButton,
    ContentWarning,
    ContentError,
    EpisodeListParser,
    defaultBoxProps
}