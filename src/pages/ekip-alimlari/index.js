import React from 'react'
import ReactGA from 'react-ga';

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import styled from 'styled-components'

const CardImage = styled(Box)`
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center center;
`

export default function EkipAlimlariPage() {
    document.title = `Ekip Alımları - ${process.env.REACT_APP_SITENAME}`
    ReactGA.pageview(window.location.pathname)

    const boxes = [
        {
            title: "Anime Çevirmeni",
            subtitle: "İyi İngilizce ve Türkçe bilgisine sahip haftada en az 1 bölüm çevirebilecek, sorumluluk sahibi ve iletişimde kopukluk yaşatmayacak kişiler.",
            image: "https://i.gifer.com/Thin.gif",
            link: "https://docs.google.com/forms/d/e/1FAIpQLSekFySnQbXGtWL7PP-dMaASY9fjDVlUQLo_5i-ySYbmu-6luA/viewform?embedded=true",
            button_text: "Başvuru için tıklayın"
        },
        {
            title: "Manga Çevirmeni",
            subtitle: "İyi İngilizce ve Türkçe bilgisine sahip haftada en az 1 bölüm çevirebilecek, sorumluluk sahibi ve iletişimde kopukluk yaşatmayacak kişiler.",
            image: "https://i.gifer.com/2z7b.gif",
            link: "https://docs.google.com/forms/d/e/1FAIpQLScWNimP1dueXt6BCk8OnS7Qi077ju_8C-dbGzIOY2gSbRAl6w/viewform?usp=sf_link",
            button_text: "Başvuru için tıklayın"
        },
        {
            title: "Encoder",
            subtitle: "İşin görsel açıdan en önemli yeri Encode'dur. Eğer hayal gücüm iyi ve iyi bir PC ve upload hızım var diyorsan ve kendi hayallerini anime de görmek istiyorsan tam yerindesin. Buraya geldiğin de ne demek istediğimi daha iyi anlayacaksın. Kaldıki bu işi Türkiye’de en iyi yapan insanlardan Farklyzz sana yol gösterecek. Bu yüzden acaba yapabilir miyim diye sakın korkma. Bir de sorumluluk sahibi olunması bakımından 18 yaş üstü olmalısın.",
            image: "https://media.giphy.com/media/jAe22Ec5iICCk/giphy.gif",
            link: "https://discord.gg/39epJNW",
            button_text: "Discord sunucumuzdan farklyzz#7797'a mesaj atın"
        },
        {
            title: "Manga Editörü",
            subtitle: "Haftada en az 1 bölüm editleyebilecek sorumluluk sahibi iletişim de sorun yaşatmayacak kişiler. Photoshop bilen kişiler önceliklidir ancak eğitim verilir.",
            image: "https://pa1.narvii.com/5727/efe410ac748f0e943c11cb10a44aa807f43c165c_hq.gif",
            link: "https://docs.google.com/forms/d/e/1FAIpQLSeJn4cGBhzRjrFiswLCOhKCWEkwf4wKtFqX1r95MZ953HTdwA/viewform?embedded=true",
            button_text: "Başvuru için tıklayın"
        },
        {
            title: "Uploader",
            subtitle: "Upload hızınız en az 5mbit olmalı ya da vds sahibi olmalısınız. Zamanınız bol ve sorumluluk sahibi olmanız gerekmektedir.",
            image: "https://media.giphy.com/media/bi6RQ5x3tqoSI/giphy.gif",
            link: "https://discord.gg/39epJNW",
            button_text: "Discord sunucumuzdan Kskle555#7219'e mesaj atın"
        },
        {
            title: "Tasarımcı ve Geliştirici",
            subtitle: "Web tasarım konusunda mevcut webmasterımızın yanında çalışacak siteyi geliştirecek yeni tasarımlar yapacak kişiler. İleride profesyonel olarak çalışmayı düşünenler önceliklidir.",
            image: "https://thumbs.gfycat.com/ExaltedAccomplishedHornedtoad-size_restricted.gif",
            link: "https://docs.google.com/forms/d/e/1FAIpQLSdylvHdUxrtAvWZ7d5uTYLmcILhHhVlPVcCRFJSGQcWjUYETw/viewform?embedded=true",
            button_text: "Başvuru için tıklayın"
        },
    ]

    return (
        <>
            <Grid container spacing={2}>
                {boxes.map(b => (
                    <Grid item xs={12} md={4}>
                        <Box boxShadow={2}>
                            <CardImage style={{backgroundImage: `url(${b.image})`}}/>
                            <Box bgcolor="background.level2" p={2}>
                                <Typography variant="h5">
                                    {b.title}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {b.subtitle}
                                </Typography>
                                <Button variant="outlined" href={b.link} target="_blank" fullWidth>{b.button_text}</Button>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}