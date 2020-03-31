import React from 'react'
import { useGlobal } from 'reactn'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import { fullLogo, fullLogoDark } from '../../config/theming/images'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    LogoContainer: {
        maxWidth: "calc(100vw - 80px)",
        width: "400px"
    },
    TextContainer: {
        display: "block",

    }
}))

export default function InitialLoading(props) {
    const { error } = props
    const [usertheme] = useGlobal('theme')
    const theme = useStyles()

    return (
        <Box position="absolute" left="50%" top="50%" textAlign="center" style={{ transform: "translate(-50%, -50%)" }}>
            <img className={theme.LogoContainer} src={usertheme === "dark" ? fullLogo : fullLogoDark} />
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
                    <Box ml={1} display="flex" alignItems="center" justifyContent="center">
                        <CircularProgress />
                    </Box>
                </>
            }
        </Box>
    )
}