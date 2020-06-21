import React from 'react'
import ReactGA from 'react-ga';

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import SSS_TEXT from '../../config/sss_page_text'
import Markdown from '../../components/markdown/markdown'
import { Redirect } from 'react-router-dom';

export default function SSSPage() {
    document.title = `SSS - ${process.env.REACT_APP_SITENAME}`
    ReactGA.pageview(window.location.pathname)

    return (
        <>
            {/*Eğer SSS sayfası kapatılmışsa, gelen istekleri ana sayfaya yönlendir*/}
            {process.env.REACT_APP_SSS_PAGE === true ? "" : <Redirect to="/" />}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box bgcolor="background.paper" boxShadow={2} p={1} textAlign="center">
                        <Typography variant="h2">Sıkça Sorulan Sorular</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box bgcolor="background.paper" boxShadow={2} p={3} whiteSpace="pre-wrap">
                        <Markdown>
                            {SSS_TEXT}
                        </Markdown>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}