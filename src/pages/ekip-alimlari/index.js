import React from 'react'
import ReactGA from 'react-ga';

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import styled from 'styled-components'

const CardImage = styled(Box)`
    width: 100%;
    height: 250px;
    background-size: cover;
    background-position: center center;
`

export default function EkipAlimlariPage() {
    document.title = `Ekip Alımları - ${process.env.REACT_APP_SITENAME}`
    ReactGA.pageview(window.location.pathname)

    const boxes = [{
        title: "Anime / Manga Çevirmeni",
        subtitle: "İyi İngilizce ve Türkçe bilgisine sahip haftada en az 1 bölüm çevirebilecek, sorumluluk sahibi ve iletişimde kopukluk yaşatmayacak kişiler.",
        image: "https://cdn.discordapp.com/attachments/463396072438497280/678284039089684533/self-reflection1.gif",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSdnM5aVeKxkYSdep1sY_fjrmZlth2CBrzyrATRMXfvJ8Prvbg/viewform?usp=sf_link",
        button_text: "Başvuru için tıklayın"
    }, {
        title: "Diğer İçerik Çevirmeni",
        subtitle: "İyi İngilizce ve Türkçe bilgisine sahip, sorumluluk sahibi ve iletişimde kopukluk yaşatmayacak kişiler.",
        image: "https://i.hizliresim.com/Wo2312.gif",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSdnM5aVeKxkYSdep1sY_fjrmZlth2CBrzyrATRMXfvJ8Prvbg/viewform?usp=sf_link",
        button_text: "Başvuru için tıklayın"
    }, {
        title: "Encoder",
        subtitle: "Haftada en az bir bölüm verebilecek, takım çalışmasına uyumlu, VDS sahibi ya da VDS hakkında bilgi sahibi olan kişiler.",
        image: "https://media.giphy.com/media/jAe22Ec5iICCk/giphy.gif",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSdnM5aVeKxkYSdep1sY_fjrmZlth2CBrzyrATRMXfvJ8Prvbg/viewform?usp=sf_link",
        button_text: "Başvuru için tıklayın"
    }, {
        title: "Manga Editörü",
        subtitle: "Photoshop kullanmayı bilen, manga editi yapabilecek kişiler.",
        image: "https://pa1.narvii.com/5727/efe410ac748f0e943c11cb10a44aa807f43c165c_hq.gif",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSdnM5aVeKxkYSdep1sY_fjrmZlth2CBrzyrATRMXfvJ8Prvbg/viewform?usp=sf_link",
        button_text: "Başvuru için tıklayın"
    }, {
        title: "Uploader",
        subtitle: "VDS sahibi ya da VDS hakkında bilgi sahibi olan kişiler ya da upload ve indirme hızı 50 mbps üstünde olan sorumluluk sahibi kişiler.",
        image: "https://media.discordapp.net/attachments/305747239555301377/678282662762512414/26b1bd81783703f28b7c5c31fd49c1774021ff17r1-480-270_hq.gif",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSdnM5aVeKxkYSdep1sY_fjrmZlth2CBrzyrATRMXfvJ8Prvbg/viewform?usp=sf_link",
        button_text: "Başvuru için tıklayın"
    }, {
        title: "Marketing",
        subtitle: "Yaptığımız işleri sosyal medya ve Discord'da yayımlayacak, Disqus hesabıyla izleyicilerle iletişime geçecek, FGL'yi temsil edecek kişiler.",
        image: "https://media.discordapp.net/attachments/338776734939742219/678284883302285371/okabee.gif",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSdnM5aVeKxkYSdep1sY_fjrmZlth2CBrzyrATRMXfvJ8Prvbg/viewform?usp=sf_link",
        button_text: "Başvuru için tıklayın"
    }]

    return (
        <>
            <Grid container spacing={2}>
                {boxes.map(b => (
                    <Grid item xs={12} md={4} key={b.image}>
                        <Box boxShadow={2}>
                            <CardImage style={{ backgroundImage: `url(${b.image})` }} />
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