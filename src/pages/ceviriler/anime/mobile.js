import React from 'react'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { bluray } from '../../../config/theming/images'

import {
    ContentHeader,
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
    MetadataHeader,
    Content
} from '../../../components/ceviriler/components'

import { getAnimeWatchIndex } from '../../../config/front-routes'
import WarningBox from '../../../components/warningerrorbox/warning';
import { contentCover } from '../../../config/api-routes'

export default function AnimeIndexMobile(props) {
    const { anime, theme, downloadLinks, releasedate } = props

    return (
        <Content theme={theme}>
            <Grid container>
                <ContentHeader item xs={12} p={0}>
                    <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                        <ContentTitle variant="h1" gutterBottom>
                            {anime.name}
                        </ContentTitle>
                    </Grid>
                </ContentHeader>
                <ContentLeft item xs={12}>
                    <ContentMetadata
                        m={4}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <ContentImage
                            loading="lazy"
                            title={anime.name + " Cover Art"}
                            component="img"
                            alt={anime.name + " Cover Art"}
                            boxShadow={2}
                            spacingvalue={theme.spacing(2)}
                            src={contentCover("anime", anime.slug)}
                            mb={0} />
                        {anime.premiered || anime.version === "bd" ?
                            <ContentMetadata {...defaultBoxProps} width="70%" display="flex" justifyContent="space-evenly" alignItems="center" mb="0" boxShadow={0}>
                                {anime.premiered
                                    ?
                                    <Typography variant="body2">{anime.premiered}</Typography>
                                    :
                                    null
                                }
                                {anime.version === "bd"
                                    ?
                                    <img title="bd-logo" loading="lazy" src={bluray} alt="bd-logo" style={{ height: "1rem" }} />
                                    :
                                    null}
                            </ContentMetadata>
                            : ""}
                    </ContentMetadata>
                    {anime.episodes.length !== 0
                        ?
                        <Link to={getAnimeWatchIndex(anime.slug)}>
                            <ContentLinksButton variant="contained" fullWidth>
                                <Typography variant="h6">İzle</Typography>
                            </ContentLinksButton>
                        </Link>
                        :
                        null}
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
                    <ContentMetadata {...defaultBoxProps} mb={2}>
                        <ContentGenres bgcolor={theme.palette.primary.main} textcolor={theme.palette.primary.contrastText}>
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
                                        <ContentLinksButton variant="contained" fullWidth>
                                            <Typography variant="h6">MyAnimeList Konusu</Typography>
                                        </ContentLinksButton>
                                    </a> :
                                    null}
                            </ContentLinks>
                        </Grid>
                    </Box>
                    {process.env.REACT_APP_DISQUS_SHORTNAME
                        ?
                        <>
                            <ContentRightAltTitle variant="h4" aftercolor={theme.palette.text.primary}>Yorumlar</ContentRightAltTitle>
                            <Box>
                                <ContentCommentsContainer
                                    config={{
                                        identifier: 'anime/' + anime.id,
                                        title: `${anime.name} - ${process.env.REACT_APP_SITENAME} Anime`,
                                    }} />
                            </Box>
                        </>
                        :
                        ""}
                </ContentRight>
            </Grid>
        </Content >
    )
}