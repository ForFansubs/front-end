import React from 'react'

import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/styles'
import Box from '@material-ui/core/Box';

export default function Error(props) {
    const theme = useTheme()

    switch (props.type) {
        case "featured":
            return (
                <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                    <Grid item xs={8}>
                        <Box boxShadow={1} color={theme.palette.primary.contrastText} bgcolor={theme.palette.primary.dark} m={1} p={1}>
                            <h2>Öne çıkarılmış animeler şu anda gösterilemiyor.</h2>
                            <p>...</p>
                        </Box>
                    </Grid>
                </Grid>
            )
        default:
            return false
    }
}