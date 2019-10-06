import React from 'react'
import ReactGA from 'react-ga';

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import useTheme from '@material-ui/styles/useTheme';

export default function SSSPage() {
    document.title = `SSS - ${process.env.REACT_APP_SITENAME}`
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
                    <Box bgcolor={theme.palette.background.level2} boxShadow={2} p={3} whiteSpace="pre-wrap">
                        <Typography variant="body1">{process.env.REACT_APP_SSS_PAGE_TEXT}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}