import React from 'react'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { Background } from 'react-parallax'
import { bluray } from '../../../config/theming/images'

import {
    ContentHeader,
    ContentHeaderImage,
    ContentLeft,
    ContentImage,
    ContentMetadata,
    ContentGenres,
    ContentRight,
    ContentTitle,
    ContentTitleBadge,
    ContentRightAltTitle,
    ContentSynopsis,
    ContentEpisodesContainer,
    ContentEpisodes,
    ContentLinks,
    ContentLinksButton,
    ContentCommentsContainer,
    defaultBoxProps,
    MetadataHeader
} from '../../../components/ceviriler/components'
import WarningBox from '../../../components/warningerrorbox/warning';

import { getAnimeWatchIndex } from '../../../config/front-routes'
import { contentHeader } from '../../../config/api-routes'


export default function AnimeIndexDesktop(props) {
    const { anime, theme, downloadLinks, releasedate } = props

    return (
        <Grid container spacing={2}>
            <ContentHeader item xs={12}>
                <Box boxShadow={2}>
                    <ContentHeaderImage
                        strength={-300}
                    >
                        <Background>
                            <img
                                title={anime.name + " headerimage"}
                                loading="lazy"
                                alt={anime.name + " headerimage"}
                                src={contentHeader("anime", anime.slug)}
                                onError={() => {
                                    document.getElementsByClassName('react-parallax')[0].style.height = "0px"
                                }}></img>
                        </Background>
                    </ContentHeaderImage>
                </Box>
            </ContentHeader>
            <ContentLeft item>
                <ContentImage
                    component="img"
                    title={anime.name + " Cover Art"}
                    loading="lazy"
                    alt={anime.name + " Cover Art"}
                    boxShadow={2}
                    spacingvalue={theme.spacing(2)}
                    src={anime.cover_art}
                    mb={0} />
                <MetadataHeader variant="body2">Çevirmen</MetadataHeader>
                <ContentMetadata {...defaultBoxProps}>
                    {anime.translators.length !== 0 ?
                        anime.translators.map(data =>
                            <Typography variant="body2" key={data + "translator"}>{data}</Typography>)
                        :
                        <Typography variant="body2">Çevirmen bulunamadı.</Typography>
                    }
                </ContentMetadata>
                <MetadataHeader variant="body2">Encoder</MetadataHeader>
                <ContentMetadata {...defaultBoxProps}>
                    {anime.encoders.length !== 0 ?
                        anime.encoders.map(data =>
                            <Typography variant="body2" key={data + "encoder"}>{data}</Typography>)
                        :
                        <Typography variant="body2">Encoder bulunamadı.</Typography>
                    }
                </ContentMetadata>
                <MetadataHeader variant="body2">Stüdyo</MetadataHeader>
                <ContentMetadata {...defaultBoxProps}>
                    {anime.studios.length !== 0 ?
                        anime.studios.map(data =>
                            <Typography variant="body2" key={data + "stüdyo"}>{data}</Typography>)
                        :
                        <Typography variant="body2">Stüdyo bulunamadı.</Typography>
                    }
                </ContentMetadata>
                <MetadataHeader variant="body2">Çıkış Zamanı</MetadataHeader>
                <ContentMetadata {...defaultBoxProps}>
                    <Typography variant="body2">
                        {anime.release_date ?
                            releasedate
                            :
                            <Typography variant="body2">Çıkış tarihi bulunamadı.</Typography>
                        }
                    </Typography>
                </ContentMetadata>
                <MetadataHeader variant="body2">Türler</MetadataHeader>
                <ContentMetadata {...defaultBoxProps}>
                    <ContentGenres bgcolor={theme.palette.primary.main}>
                        {anime.genres.length !== 0 ?
                            anime.genres.map(data =>
                                <li key={data + "genre"}>
                                    <Typography variant="body2">
                                        {data}
                                    </Typography>
                                </li>)
                            :
                            <Typography variant="body2">Tür bulunamadı.</Typography>}
                    </ContentGenres>
                </ContentMetadata>
            </ContentLeft>
            <ContentRight item xs={12} md>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                    <ContentTitle theme={theme} variant="h1" gutterBottom>
                        {anime.name}
                    </ContentTitle>
                    {anime.version === "bd"
                        ?
                        <ContentTitleBadge>
                            <img title="bd-logo" loading="lazy" src={bluray} alt="bd-logo" style={{ height: "2rem" }} />
                        </ContentTitleBadge>
                        :
                        null}
                    {anime.premiered
                        ?
                        <ContentTitleBadge
                            borderRadius="borderRadius"
                            bgcolor="background.paper"
                            boxShadow={2}
                        >
                            <Typography variant="body2">
                                {anime.premiered}
                            </Typography>
                        </ContentTitleBadge>
                        :
                        null
                    }
                </Grid>
                <Box mb={2}>
                    <ContentRightAltTitle variant="h4" aftercolor={theme.palette.text.primary}>Özet</ContentRightAltTitle>
                    <ContentSynopsis variant="body1">
                        {anime.synopsis ? anime.synopsis : "Konu bulunamadı."}
                    </ContentSynopsis>
                </Box>
                <Box mb={2}>
                    <Grid container spacing={2}>
                        <ContentEpisodesContainer item xs={12} md={8}>
                            <ContentRightAltTitle variant="h4" aftercolor={theme.palette.text.primary}>İndirme Linkleri</ContentRightAltTitle>
                            <ContentEpisodes spacing={theme.spacing(1)}>
                                {downloadLinks.length !== 0 ?
                                    downloadLinks :
                                    <WarningBox>İndirme linki bulunamadı.</WarningBox>}
                            </ContentEpisodes>
                        </ContentEpisodesContainer>
                        <ContentLinks item xs >
                            {anime.mal_link ?
                                <a href={anime.mal_link} target="_blank" rel="noopener noreferrer">
                                    <ContentLinksButton variant="contained">
                                        <Typography variant="h6">MyAnimeList Konusu</Typography>
                                    </ContentLinksButton>
                                </a> :
                                null}
                            {anime.episodes.length !== 0
                                ?
                                <Link to={getAnimeWatchIndex(anime.slug)}>
                                    <ContentLinksButton variant="contained">
                                        <Typography variant="h6">İzle</Typography>
                                    </ContentLinksButton>
                                </Link>
                                :
                                null}
                        </ContentLinks>
                    </Grid>
                </Box>
                {process.env.REACT_APP_DISQUS_SHORTNAME
                    ?
                    <>
                        <ContentRightAltTitle variant="h4" aftercolor={theme.palette.text.primary}>Yorumlar</ContentRightAltTitle>
                        <Box p={2}>
                            <ContentCommentsContainer
                                config={{
                                    identifier: 'anime/' + anime.id,
                                    title: `${anime.name} - ${process.env.REACT_APP_APPNAME} Anime`,
                                }} />
                        </Box>
                    </>
                    :
                    ""}
            </ContentRight>
        </Grid>
    )
}