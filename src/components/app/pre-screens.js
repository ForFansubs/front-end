import React from 'react'
import { useGlobal } from 'reactn'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import styled from 'styled-components'
import { fullLogo, fullLogoDark } from '../../config/theming/images'

const ImageContainer = styled.img`
    max-width: calc(100vw - 80px);
    margin-bottom: 10px;
    width: 400px;
`

const LoadingContainer = styled(Box)`
    h4 {
        margin-left: 16px;
    }
`

export default function InitialLoading(props) {
    const { error } = props
    const [usertheme] = useGlobal('theme')
    return (
        <Box position="absolute" left="50%" top="50%" textAlign="center" style={{ transform: "translate(-50%, -50%)" }}>
            <ImageContainer src={usertheme === "dark" ? fullLogo : fullLogoDark} />
            {error ?
                <>
                    <Typography variant="h4">
                        Sunucuyla bağlantı kuramadık :(
                    </Typography>
                    <Typography variant="body1">
                        Lütfen daha sonra tekrar deneyin...
                    </Typography>
                </>
                :
                <>
                    <LoadingContainer display="flex" alignItems="center" justifyContent="center">
                        <CircularProgress /><Typography variant="h4">Yükleniyor...</Typography>
                    </LoadingContainer>
                </>
            }
        </Box>
    )
}