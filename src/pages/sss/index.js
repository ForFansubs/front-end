import React from 'react'
import ReactGA from 'react-ga';

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useTheme } from '@material-ui/styles';

import { Remarkable } from 'remarkable';
var md = new Remarkable('full', {
    html: true,
    linkify: true,
    typographer: true
});

function Markdown(props) {

    const markdown = "#### **1-) Hesabıma giriş yapamıyorum/Hesap açamıyorum, neden?** \n\nForumda kulladığımız sistem ile bu sistem arasında hiçbir bağlantı yoktur, yani forumdaki hesaplarınızla bu sisteme giriş yapamazsınız. Şu aşamada hesap açmanın size hiçbir artısı olmayacaktır. Eğer ilerde üyeliğin gerekli olduğunu düşünürsek kayıtları açıp size haber vereceğiz, merak etmeyin.\n\n#### **2-) \"Şu şu\" browserı kullanıyorum ve sayfa düzgün gözükmüyor, ne olacak?**\n\nHataları fark ettiğimiz an düzeltip, yayına sunmayı amaçlıyoruz. Ancak bu arada gözümüzden kaçan, fark etmediğimiz hatalar çıkabilir. Eğer bu tip bir hata bulduğunuzu düşünüyorsanız lütfen bize sayfanın en altında bulabileceğiniz Discord sunucumuzdan ulaşın.\n\n(Kanal: #site-hatalari-puzzlesubs-beta)\n\n#### **3-) \"Şu şu\" animenin indirme-izlenme linki eklenmemiş, neden?**\n\nEski seriler için: Siteyi taşıma işlemlerimiz aktif olarak devam ediyor. Bu aşamada birçok eski seriyi de olduğu gibi taşıdığımızdan, kırılmış linkleri de buraya eklemiş olabiliriz. Bu tip hataları bildirmek için bize Discord sunucumuzdan ulaşın.\n\n(Kanal: #seri-bolum-link-hatalari)\n\nGüncel seriler için: Çeviri ne zaman gelecek diye sormayın lütfen, çünkü bizim de çevirinin ne zaman geleceğinden, ne zaman encode ve upload edileceğinden en ufak bir fikrimiz yok.\n\n#### **4-) Siteye yeni özellikler gelecek mi, nereden yeni fikir verebilirim?**\n\nŞimdilik basit ve sade bir site olarak kalmayı düşünüyoruz. Öncelikli hedefimiz hem bilgisayar hem de telefonlarda düzgünce girebileceğiniz, işlevsel bir site oluşturmak ve bunu hatalardan arındırmak. Ama eğer sunmak istediğiniz bir fikriniz varsa, bize her zaman Discord sunucumuzdan ulaşabilirsiniz.\n\n(Kanal: #site-hatalari-puzzlesubs-beta)\n\n#### **5-) Sitede coin miner gibi şeyler olacak mı?**\n\nCoin miner gibi CPU'nuzu zorlayacak, sitenin kullanabilirliğini azaltacak bir şey eklemeyi, sitede bulunduğunuz süre boyunca zorla kullandırtmayı düşünmüyoruz. İlerde, sadece sizin vereceğiniz izinle çalışacak bir şeyler eklemeyi düşünebiliriz ama."

    return <Box dangerouslySetInnerHTML={{ __html: md.render(markdown) }} style={props.style} />
}

export default function SSSPage() {
    document.title = `SSS - PuzzleSubs`
    ReactGA.pageview(window.location.pathname)
    const theme = useTheme()

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box bgcolor={theme.palette.background.level2} boxShadow={2} p={1} textAlign="center">
                        <Typography variant="h2">Sıkça Sorulan Sorular</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box bgcolor={theme.palette.background.level2} boxShadow={2} p={3}>
                        <Markdown style={{ ...theme.typography.body1 }} />
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}