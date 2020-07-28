import React from 'react'
import ReactGA from 'react-ga';
import { useTranslation } from 'react-i18next';

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core';

import boxes from '../../config/recruitment_panels'
import Metatags from '../../components/helmet/index'

const useStyles = makeStyles(theme => ({
    CardImage: {
        width: "100%",
        height: 250,
        backgroundSize: "cover",
        backgroundPosition: "center center"
    }
}))

export default function EkipAlimlariPage() {
    const classes = useStyles()
    const { t } = useTranslation('pages')
    ReactGA.pageview(window.location.pathname)

    return (
        <>
            <Metatags title={t('recruitment.metadata.title', { site_name: process.env.REACT_APP_SITENAME })} />
            <Grid container spacing={2}>
                {boxes.map(b => (
                    <Grid item xs={12} md={4} key={b.image}>
                        <Box boxShadow={2}>
                            <Box className={classes.CardImage} style={{ backgroundImage: `url(${b.image})` }} />
                            <Box bgcolor="background.paper" p={2}>
                                <Typography variant="h5">
                                    {b.title}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {b.subtitle}
                                </Typography>
                                <Button variant="outlined" href={b.link} target="_blank" fullWidth disabled={b.is_active === 0 ? true : false}>{
                                    b.is_active === 0 ?
                                        "Alımlar kapalı" :
                                        b.button_text ? b.button_text : "Başvuru için tıklayın"
                                }</Button>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}