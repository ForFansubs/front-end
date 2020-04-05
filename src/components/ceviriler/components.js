import React from 'react'
import { useGlobal } from 'reactn'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Grid, Typography, Box, Button, makeStyles } from '@material-ui/core'
import DisqusBox from '../../components/disqus/disqus'

import { Background } from 'react-parallax'
import { bluray } from '../../config/theming/images'
import { getAnimeWatchIndex } from '../../config/front-routes'
import { contentHeader } from '../../config/api-routes'

import { format } from 'date-fns'
import WarningBox from '../warningerrorbox/warning'

const useStyles = makeStyles(theme => ({
    LeftSideContent: {
        maxWidth: 225,
        minWidth: 225,
        [theme.breakpoints.down('sm')]: {
            maxWidth: "initial",
            minWidth: "initial"
        }
    },
    CoverArtContainer: {
        maxWidth: 225 - theme.spacing(2),
        width: 225 - theme.spacing(2),

        [theme.breakpoints.down('sm')]: {
            maxWidth: "70%",
            width: "70%"
        },

        '& img': {
            width: "inherit"
        }
    },
    MetadataHeader: {
        fontSize: "1.1rem!important"
    },
    ContentMetadataContainer: {
        '& span': {
            fontSize: ".9rem",
            display: "block"
        }
    }
}))

const ContentGenres = styled.ul`
    margin-bottom: -3px;

    li {
        display: inline-block;
        padding: 2px 4px;
        background: ${props => props.bgcolor};
        margin: 0 3px 3px 0;

        span {
            font-size: .6rem;
            font-weight: 400!important;
        }
    }
`

const ContentRight = styled(Grid)``

const ContentTitle = styled(Typography)`
`

const ContentTitleBadge = styled(Box)`
    padding: 5px;
    margin: 0 5px!important;
    span {
        font-size: .7rem!important;
    }
`

const ContentRightAltTitle = styled(Typography)`
    display: flex;
    align-items: center;
    margin-bottom: 10px!important;
`

const ContentSynopsis = styled(Typography)`
    white-space: pre-wrap;
`

const ContentEpisodesContainer = styled(Grid)``

const ContentEpisodes = styled.ul`
    button {
        margin: ${props => `0 ${props.spacing}px ${props.spacing}px 0`};
        display: inline-block;
    }
`

const ContentEpisodesLinksButton = styled(Box)`
:hover {
    transition: ${props => props.transition};
    :hover {
        background: ${props => props.hoverbg};
    }
}
`

const ContentLinks = styled(Grid)`
    button {
        margin-right: 5px;
        margin-bottom: 5px;
    }
`

const ContentLinksButton = styled(Button)``

const ContentCommentsContainer = styled(DisqusBox)``

const Content = styled.div`
    @media(max-width:${props => props.theme.breakpoints.values.sm}px) {

        ${ContentTitle} {
            font-size: 1.6rem!important;
            display: block;
        }

        ${ContentTitleBadge} {
            margin: 0!important;
            span {
                font-size: .6rem!important;
            }
        }

        ${ContentGenres} {
            margin: 0;
            padding: 0;
        }
    }
`

function episodeParser(episodenumber, specialtype) {
    if (specialtype === "toplu")
        return `TOPLU LİNK ${episodenumber === "0" ? "" : episodenumber}`

    if (specialtype && specialtype !== "toplu") {
        return `${specialtype.toUpperCase()} ${episodenumber}`
    }
    else return `${episodenumber}. Bölüm`
}

const defaultBoxProps = {
    boxShadow: 2, p: 1, mb: 1, bgcolor: "background.level2"
}

function AnimePage(props) {
    const { id, name, slug, cover_art, premiered, version, episodes, translators, encoders, studios, release_date, genres, mal_link, synopsis, downloadLinks } = props
    const classes = useStyles(props)
    const [mobile] = useGlobal('mobile')

    return (
        <>
            <Grid container spacing={2}>
                {mobile ? <Typography variant="h3" component="h1">
                    {name}
                </Typography> : ""}
                <Grid item xs={12}>
                    <Box boxShadow={2}>
                        <img
                            title={name + " headerimage"}
                            loading="lazy"
                            alt={name + " headerimage"}
                            src={contentHeader("anime", slug)}
                            onError={img => {
                                img.target.style.display = "none"
                            }}></img>
                    </Box>
                </Grid>
                <Grid item className={classes.LeftSideContent}>
                    <Box className={classes.ContentMetadataContainer} mb={1} boxShadow={2} display="flex" flexDirection="column">
                        <Box
                            component="img"
                            title={name + " Cover Art"}
                            loading="lazy"
                            alt={name + " Cover Art"}
                            src={cover_art}
                            mb={0}
                            className={classes.CoverArtContainer} />
                        {premiered || version === "bd" ?
                            <Box className={classes.ContentMetadataContainer} {...defaultBoxProps} display="flex" justifyContent="space-evenly" alignItems="center" mb="0" boxShadow={0}>
                                {premiered
                                    ?
                                    <Typography variant="body2">{premiered}</Typography>
                                    :
                                    null
                                }
                                {version === "bd"
                                    ?
                                    <img title="bd-logo" loading="lazy" src={bluray} alt="bd-logo" style={{ height: "1rem" }} />
                                    :
                                    null}
                            </Box>
                            : ""}
                    </Box>
                    {downloadLinks.length !== 0
                        ?
                        <Box className={classes.ContentMetadataContainer}>
                            <Link to={getAnimeWatchIndex(slug)}>
                                <ContentLinksButton variant="contained" fullWidth>
                                    <Typography variant="h6">İzle</Typography>
                                </ContentLinksButton>
                            </Link>
                        </Box>
                        :
                        null}
                    <Typography className={classes.MetadataHeader} variant="body2">Çevirmen</Typography>
                    <Box className={classes.ContentMetadataContainer} {...defaultBoxProps}>
                        {translators.length !== 0 ?
                            translators.map(data =>
                                <Typography variant="body2" key={data + "translator"}>{data}</Typography>)
                            :
                            <Typography variant="body2">Çevirmen bulunamadı.</Typography>
                        }
                    </Box>
                    <Typography className={classes.MetadataHeader} variant="body2">Encoder</Typography>
                    <Box className={classes.ContentMetadataContainer} {...defaultBoxProps}>
                        {encoders.length !== 0 ?
                            encoders.map(data =>
                                <Typography variant="body2" key={data + "encoder"}>{data}</Typography>)
                            :
                            <Typography variant="body2">Encoder bulunamadı.</Typography>
                        }
                    </Box>
                    <Typography className={classes.MetadataHeader} variant="body2">Stüdyo</Typography>
                    <Box className={classes.ContentMetadataContainer} {...defaultBoxProps}>
                        {studios.length !== 0 ?
                            studios.map(data =>
                                <Typography variant="body2" key={data + "stüdyo"}>{data}</Typography>)
                            :
                            <Typography variant="body2">Stüdyo bulunamadı.</Typography>
                        }
                    </Box>
                    <Typography className={classes.MetadataHeader} variant="body2">Çıkış Zamanı</Typography>
                    <Box className={classes.ContentMetadataContainer} {...defaultBoxProps}>
                        <Typography variant="body2">
                            {release_date ?
                                format(new Date(release_date), "dd.MM.yyyy")
                                :
                                <Typography variant="body2">Çıkış tarihi bulunamadı.</Typography>
                            }
                        </Typography>
                    </Box>
                    <Typography className={classes.MetadataHeader} variant="body2">Türler</Typography>
                    <Box className={classes.ContentMetadataContainer} {...defaultBoxProps}>
                        <ContentGenres>
                            {genres.length !== 0 ?
                                genres.map(data =>
                                    <li key={data + "genre"}>
                                        <Typography variant="body2">
                                            {data}
                                        </Typography>
                                    </li>)
                                :
                                <Typography variant="body2">Tür bulunamadı.</Typography>}
                        </ContentGenres>
                    </Box>
                    {mal_link ?
                        <Box className={classes.ContentMetadataContainer}>
                            <a href={mal_link} target="_blank" rel="noopener noreferrer">
                                <ContentLinksButton variant="contained" fullWidth>
                                    <Typography variant="h6">MyAnimeList Konusu</Typography>
                                </ContentLinksButton>
                            </a>
                        </Box>
                        :
                        null}
                </Grid>
                <ContentRight item xs={12} md>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                        {!mobile ? <Typography variant="h1" gutterBottom>
                            {name}
                        </Typography> : ""}
                    </Grid>
                    <Box mb={2}>
                        <ContentSynopsis variant="body1">
                            {synopsis ? synopsis : "Konu bulunamadı."}
                        </ContentSynopsis>
                    </Box>
                    <Box mb={2}>
                        <Grid container spacing={2}>
                            <ContentEpisodesContainer item xs={12}>
                                <ContentRightAltTitle variant="h4">İndirme Linkleri</ContentRightAltTitle>
                                <ContentEpisodes>
                                    {downloadLinks.length !== 0 ?
                                        downloadLinks :
                                        <WarningBox>İndirme linki bulunamadı.</WarningBox>}
                                </ContentEpisodes>
                            </ContentEpisodesContainer>
                        </Grid>
                    </Box>
                    {process.env.REACT_APP_DISQUS_SHORTNAME
                        ?
                        <>
                            <Box>
                                <ContentCommentsContainer
                                    config={{
                                        identifier: 'anime/' + id,
                                        title: `${name} - ${process.env.REACT_APP_SITENAME} Anime`,
                                    }} />
                            </Box>
                        </>
                        :
                        ""}
                </ContentRight>
            </Grid>
        </>
    )
}

function MangaPage(props) {
    const { id, name, slug, cover_art, translators, editors, authors, release_date, genres, mal_link, synopsis, mos_link, download_link } = props
    const classes = useStyles(props)
    const [mobile] = useGlobal('mobile')

    return (
        <Grid container spacing={2}>
            {mobile ? <Typography variant="h1" gutterBottom>
                {name}
            </Typography> : ""}
            <Grid item xs={12}>
                <Box boxShadow={2}>
                    <img
                        title={name + " headerimage"}
                        loading="lazy"
                        alt={name + " headerimage"}
                        src={contentHeader("manga", slug)}
                        onError={img => {
                            img.target.style.display = "none"
                        }} />
                </Box>
            </Grid>
            <Grid item className={classes.LeftSideContent}>
                <Box
                    title={name + " Cover Art"}
                    component="img" alt={name + " Cover Art"}
                    boxShadow={2}
                    className={classes.CoverArtContainer}
                    src={cover_art}
                    mb={0} />
                {download_link ?
                    <a href={download_link} target="_blank" rel="noopener noreferrer">
                        <Box mb={1}>
                            <ContentLinksButton variant="contained" fullWidth>
                                <Typography variant="h6">İndir</Typography>
                            </ContentLinksButton>
                        </Box>
                    </a>
                    :
                    ""
                }
                {mos_link ?
                    <a href={mos_link} target="_blank" rel="noopener noreferrer">
                        <Box>
                            <ContentLinksButton variant="contained" fullWidth>
                                <Typography variant="h6">Oku</Typography>
                            </ContentLinksButton>
                        </Box>
                    </a>
                    :
                    ""
                }
                <Typography className={classes.MetadataHeader} variant="body2">Çevirmen</Typography>
                <Box className={classes.ContentMetadataContainer} {...defaultBoxProps}>
                    {translators.length !== 0 ?
                        translators.map(data =>
                            <Typography variant="body2" key={data + "translator"}>{data}</Typography>)
                        :
                        <Typography variant="body2">Çevirmen bulunamadı.</Typography>
                    }
                </Box>
                <Typography className={classes.MetadataHeader} variant="body2">Editör</Typography>
                <Box className={classes.ContentMetadataContainer} {...defaultBoxProps}>
                    {editors.length !== 0 ?
                        editors.map(data =>
                            <Typography variant="body2" key={data + "editors"}>{data}</Typography>)
                        :
                        <Typography variant="body2">Editör bulunamadı.</Typography>
                    }
                </Box>
                <Typography className={classes.MetadataHeader} variant="body2">Yazar</Typography>
                <Box className={classes.ContentMetadataContainer} {...defaultBoxProps}>
                    {authors.length !== 0 ?
                        authors.map(data =>
                            <Typography variant="body2" key={data + "author"}>{data}</Typography>)
                        :
                        <Typography variant="body2">Yazar bulunamadı.</Typography>
                    }
                </Box>
                <Typography className={classes.MetadataHeader} variant="body2">Çıkış Zamanı</Typography>
                <Box className={classes.ContentMetadataContainer} {...defaultBoxProps}>
                    <Typography variant="body2">
                        {release_date ?
                            format(new Date(release_date), "dd.MM.yyyy")
                            :
                            <Typography variant="body2">Çıkış tarihi bulunamadı.</Typography>
                        }
                    </Typography>
                </Box>
                <Typography className={classes.MetadataHeader} variant="body2">Türler</Typography>
                <Box className={classes.ContentMetadataContainer} {...defaultBoxProps}>
                    <ContentGenres>
                        {genres.length !== 0 ?
                            genres.map(data =>
                                <li key={data + "genre"}>
                                    <Typography variant="body2">
                                        {data}
                                    </Typography>
                                </li>)
                            :
                            <Typography variant="body2">Tür bulunamadı.</Typography>}
                    </ContentGenres>
                </Box>
                {mal_link !== "-" ?
                    <a href={mal_link} target="_blank" rel="noopener noreferrer">
                        <Box mb={1}>
                            <ContentLinksButton variant="contained" fullWidth>
                                <Typography variant="h6">MyAnimeList Konusu</Typography>
                            </ContentLinksButton>
                        </Box>
                    </a>
                    :
                    ""
                }
            </Grid>
            <ContentRight item xs={12} md>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                    {!mobile ? <Typography variant="h1" gutterBottom>
                        {name}
                    </Typography> : ""}
                </Grid>
                <Box mb={2}>
                    <ContentRightAltTitle variant="h4">Özet</ContentRightAltTitle>
                    <ContentSynopsis variant="subtitle1">
                        {synopsis ? synopsis : "Konu bulunamadı."}
                    </ContentSynopsis>
                </Box>
                <Box mb={2}>
                    <Grid container spacing={2}>
                        <ContentEpisodesContainer item xs={12}>
                            <ContentRightAltTitle variant="h4">Bölümler</ContentRightAltTitle>
                            <ContentEpisodes>
                                <WarningBox>
                                    {download_link ?
                                        mos_link ?
                                            "İndirmeyi yandaki butondan yapabilirsiniz. Okumak için mangayı oku butonuna bastığınızda başka bir siteye yönlendirileceksiniz."
                                            :
                                            "İndirmeyi yandaki butondan yapabilirsiniz. Okuma linki bulamadık."
                                        :
                                        "Görünüşe göre bu seri için indirme linki eklememişiz. Bize Facebook sayfamızdan ya da Discord sunucumuzdan ulaşabilirsiniz."} {mos_link ? "" : "Okuma özelliği bu sitede bulunmamaktadır."}
                                </WarningBox>
                            </ContentEpisodes>
                        </ContentEpisodesContainer>
                    </Grid>
                </Box>
                {process.env.REACT_APP_DISQUS_SHORTNAME
                    ?
                    <>
                        <ContentRightAltTitle variant="h4">Yorumlar</ContentRightAltTitle>
                        <Box>
                            <ContentCommentsContainer
                                config={{
                                    identifier: 'manga/' + id,
                                    title: `${name} - ${process.env.REACT_APP_SITENAME} Manga`,
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

export {
    AnimePage,
    MangaPage,
    episodeParser,
    defaultBoxProps
}