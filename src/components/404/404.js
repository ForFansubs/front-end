import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import { Box, Typography, makeStyles } from '@material-ui/core'

import { fourOhFourGif } from '../../config/theming/images'

const useStyles = makeStyles(() => ({
    Image: {
        maxWidth: "100vw",
        width: "500px"
    }
}))

export default function FourOhFourPage() {
    const classes = useStyles()

    const [redirect, setRedirect] = useState(false)

    setTimeout(() => {
        setRedirect(true)
    }, 10000)

    return (
        <>
            {redirect ? <Redirect to="/" /> : ""}
            <Box position="absolute" left="50%" top="50%" textAlign="center" style={{ transform: "translate(-50%, -50%)" }}>
                <Box className={classes.Image} component="img" mb={2} boxShadow={2} src={fourOhFourGif} />
                <Typography variant="h4">
                    Aradığınız sayfayı bulamadık, kaldırılmış olabilir.
                    </Typography>
                <Typography variant="body1">
                    10 saniye içerisinde ana sayfaya yönlendirileceksiniz.
                    </Typography>
            </Box>
        </>
    )
}