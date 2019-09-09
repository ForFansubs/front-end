import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { fourOhFourGif } from '../../config/theming/images'
import styled from 'styled-components'

const ImageBox = styled(Box)`
    max-width: 100vw;
    width: 500px;
`

export default function FourOhFourPage() {
    const [redirect, setRedirect] = useState(false)

    setTimeout(() => {
        setRedirect(true)
    }, 10000)

    return (
        <>
            {redirect ? <Redirect to="/" /> : ""}
            <Box position="absolute" left="50%" top="50%" textAlign="center" style={{ transform: "translate(-50%, -50%)" }}>
                <ImageBox component="img" mb={2} boxShadow={2} src={fourOhFourGif} />
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