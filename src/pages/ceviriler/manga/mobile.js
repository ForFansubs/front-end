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
    MetadataHeader,
    Content
} from '../../../components/ceviriler/components'
import WarningBox from '../../../components/warningerrorbox/warning';
import { contentCover } from '../../../config/api-routes'

export default function MangaIndexMobile(props) {
    const { manga, theme, releasedate } = props

    return (
        <Content theme={theme}>
            <Grid container>
                <ContentLeft item xs>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                        <ContentTitle variant="h1" gutterBottom>
                            {manga.name}
                        </ContentTitle>
                    </Grid>
                    <ContentMetadata
                        m={4}
                        display="flex"
                        justifyContent="center"
                    >
                        <ContentImage
                            title={manga.name + " Cover Art"}
                            component="img" alt={manga.name + " Cover Art"}
                            boxShadow={2}
                            spacingvalue={theme.spacing(2)}
                            src={manga.cover_art}
                            mb={0} />
                    </ContentMetadata>
                    {manga.download_link ?
                        <a href={manga.download_link} target="_blank" rel="noopener noreferrer">
                            <Box mb={1}>
                                <ContentLinksButton variant="contained" fullWidth>
                                    <Typography variant="h6">İndir</Typography>
                                </ContentLinksButton>
                            </Box>
                        </a>
                        :
                        ""
                    }
                    {manga.mos_link ?
                        <a href={manga.mos_link} target="_blank" rel="noopener noreferrer">
                            <Box>
                                <ContentLinksButton variant="contained" fullWidth>
                                    <Typography variant="h6">Oku</Typography>
                                </ContentLinksButton>
                            </Box>
                        </a>
                        :
                        ""
                    }
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
                    <ContentMetadata {...defaultBoxProps} mb={2}>
                        <ContentGenres bgcolor={theme.palette.primary.main} textcolor={theme.palette.primary.contrastText}>
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
                    {manga.mal_link !== "-" ?
                        <a href={manga.mal_link} target="_blank" rel="noopener noreferrer">
                            <Box mb={1}>
                                <ContentLinksButton variant="contained" fullWidth>
                                    <Typography variant="h6">MyAnimeList Konusu</Typography>
                                </ContentLinksButton>
                            </Box>
                        </a>
                        :
                        ""
                    }
                </ContentLeft>
                <ContentRight item xs={12} md>
                    <Box mb={2}>
                        <ContentRightAltTitle variant="h4" aftercolor={theme.palette.text.primary}>Özet</ContentRightAltTitle>
                        <ContentSynopsis variant="subtitle1">
                            {manga.synopsis ? manga.synopsis : "Konu bulunamadı."}
                        </ContentSynopsis>
                    </Box>
                    <Box mb={2}>
                        <Grid container spacing={2}>
                            <ContentEpisodesContainer item xs={12}>
                                <ContentRightAltTitle variant="h4" aftercolor={theme.palette.text.primary}>Bölümler</ContentRightAltTitle>
                                <ContentEpisodes spacing={theme.spacing(1)}>
                                    <WarningBox>
                                        {manga.download_link ?
                                            manga.mos_link ?
                                                "İndirmeyi yandaki/aşağıdaki butondan yapabilirsiniz. Okumak için mangayı oku butonuna bastığınızda başka bir siteye yönlendirileceksiniz."
                                                :
                                                "İndirmeyi yandaki/aşağıdaki butondan yapabilirsiniz. Okuma linki bulamadık."
                                            :
                                            "Görünüşe göre bu seri için indirme linki eklememişiz. Bize Facebook sayfamızdan ya da Discord sunucumuzdan ulaşabilirsiniz."} {manga.mos_link ? "" : "Okuma özelliği bu sitede bulunmamaktadır."}
                                    </WarningBox>
                                </ContentEpisodes>
                            </ContentEpisodesContainer>
                        </Grid>
                    </Box>
                    {process.env.REACT_APP_DISQUS_SHORTNAME
                        ?
                        <>
                            <ContentRightAltTitle variant="h4" aftercolor={theme.palette.text.primary}>Yorumlar</ContentRightAltTitle>
                            <Box>
                                <ContentCommentsContainer
                                    config={{
                                        identifier: 'manga/' + manga.id,
                                        title: `${manga.name} - ${process.env.REACT_APP_SITENAME} Manga`,
                                    }} />
                            </Box>
                        </>
                        :
                        ""
                    }
                </ContentRight>
            </Grid>
        </Content>
    )
}