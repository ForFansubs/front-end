import React from 'react'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import {
    ContentLeft,
    ContentImage,
    ContentMetadata,
    ContentGenres,
    ContentRight,
    ContentTitle,
    ContentRightAltTitle,
    ContentSynopsis,
    ContentEpisodesContainer,
    ContentEpisodes,
    ContentLinks,
    ContentLinksButton,
    ContentCommentsContainer,
    defaultBoxProps,
    MetadataHeader, ContentHeaderImage, ContentHeader
} from '../../../components/ceviriler/components'
import WarningBox from '../../../components/warningerrorbox/warning';
import {Background} from "react-parallax";
import {contentHeader} from "../../../config/api-routes";

export default function MangaIndexDesktop(props) {
    const { manga, theme, releasedate } = props

    return (
        <Grid container spacing={2}>
            <ContentHeader item xs={12}>
                <Box boxShadow={2}>
                    <ContentHeaderImage
                        strength={-300}
                    >
                        <Background>
                            <img
    title={manga.name + " headerimage"}
    loading="lazy"
    alt={manga.name + " headerimage"}
    src={contentHeader("manga", manga.slug)}
    onError={() => {
        document.getElementsByClassName('react-parallax')[0].style.height = "0px"
    }}/>
                        </Background>
                    </ContentHeaderImage>
                </Box>
            </ContentHeader>
            <ContentLeft item>
                <ContentImage
                    title={manga.name + " Cover Art"}
                    component="img" alt={manga.name + " Cover Art"}
                    boxShadow={2}
                    spacingvalue={theme.spacing(2)}
                    src={manga.cover_art}
                    mb={0} />
                <MetadataHeader variant="body2">Çevirmen</MetadataHeader>
                <ContentMetadata {...defaultBoxProps}>
                    {manga.translators.length !== 0 ?
                        manga.translators.map(data =>
                            <Typography variant="body2" key={data + "translator"}>{data}</Typography>)
                        :
                        <Typography variant="body2">Çevirmen bulunamadı.</Typography>
                    }
                </ContentMetadata>
                <MetadataHeader variant="body2">Editör</MetadataHeader>
                <ContentMetadata {...defaultBoxProps}>
                    {manga.editors.length !== 0 ?
                        manga.editors.map(data =>
                            <Typography variant="body2" key={data + "editors"}>{data}</Typography>)
                        :
                        <Typography variant="body2">Editör bulunamadı.</Typography>
                    }
                </ContentMetadata>
                <MetadataHeader variant="body2">Yazar</MetadataHeader>
                <ContentMetadata {...defaultBoxProps}>
                    {manga.authors.length !== 0 ?
                        manga.authors.map(data =>
                            <Typography variant="body2" key={data + "author"}>{data}</Typography>)
                        :
                        <Typography variant="body2">Yazar bulunamadı.</Typography>
                    }
                </ContentMetadata>
                <MetadataHeader variant="body2">Çıkış Zamanı</MetadataHeader>
                <ContentMetadata {...defaultBoxProps}>
                    <Typography variant="body2">
                        {manga.release_date ?
                            releasedate
                            :
                            <Typography variant="body2">Çıkış tarihi bulunamadı.</Typography>
                        }
                    </Typography>
                </ContentMetadata>
                <MetadataHeader variant="body2">Türler</MetadataHeader>
                <ContentMetadata {...defaultBoxProps}>
                    <ContentGenres bgcolor={theme.palette.primary.main}>
                        {manga.genres.length !== 0 ?
                            manga.genres.map(data =>
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
                    <ContentTitle variant="h1" gutterBottom>
                        {manga.name}
                    </ContentTitle>
                </Grid>
                <Box mb={2}>
                    <ContentRightAltTitle variant="h4" aftercolor={theme.palette.text.primary}>Özet</ContentRightAltTitle>
                    <ContentSynopsis variant="subtitle1">
                        {manga.synopsis ? manga.synopsis : "Konu bulunamadı."}
                    </ContentSynopsis>
                </Box>
                <Box mb={2}>
                    <Grid container spacing={2}>
                        <ContentEpisodesContainer item xs={12} md={8}>
                            <ContentRightAltTitle variant="h4" aftercolor={theme.palette.text.primary}>Bölümler</ContentRightAltTitle>
                            <ContentEpisodes spacing={theme.spacing(1)}>
                                <WarningBox>
                                    {manga.download_link ?
                                        manga.mos_link ?
                                            "İndirmeyi yandaki butondan yapabilirsiniz. Okumak için mangayı oku butonuna bastığınızda başka bir siteye yönlendirileceksiniz."
                                            :
                                            "İndirmeyi yandaki butondan yapabilirsiniz. Okuma linki bulamadık."
                                        :
                                        "Görünüşe göre bu seri için indirme linki eklememişiz. Bize Facebook sayfamızdan ya da Discord sunucumuzdan ulaşabilirsiniz."} {manga.mos_link ? "" : "Okuma özelliği bu sitede bulunmamaktadır."}
                                </WarningBox>
                            </ContentEpisodes>
                        </ContentEpisodesContainer>
                        <ContentLinks item xs >
                            <a href={manga.mal_link} target="_blank" rel="noopener noreferrer">
                                <ContentLinksButton variant="contained">
                                    <Typography variant="h6">MyAnimeList Konusu</Typography>
                                </ContentLinksButton>
                            </a>
                            {manga.download_link ?
                                <a href={manga.download_link} target="_blank" rel="noopener noreferrer">
                                    <ContentLinksButton variant="contained">
                                        <Typography variant="h6">Mangayı İndir</Typography>
                                    </ContentLinksButton>
                                </a>
                                :
                                ""
                            }
                            {manga.mos_link ?
                                <a href={manga.mos_link} target="_blank" rel="noopener noreferrer">
                                    <ContentLinksButton variant="contained">
                                        <Typography variant="h6">Mangayı oku</Typography>
                                    </ContentLinksButton>
                                </a>
                                :
                                ""
                            }
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
                                    identifier: 'manga/' + manga.id,
                                    title: `${manga.name} - ${process.env.REACT_APP_APPNAME} Manga`,
                                }} />
                        </Box>
                    </>
                    :
                    ""
                }
            </ContentRight>
        </Grid>
    )
}