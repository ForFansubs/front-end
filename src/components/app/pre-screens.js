import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import { fullLogo, fullLogoDark } from '../../config/theming/images'

import { makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import SettingsContext from '../../contexts/settings.context'

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
    const { t } = useTranslation('components')
    const [settings] = useContext(SettingsContext)
    const { error } = props
    const theme = useStyles()

    return (
        <Box position="absolute" left="50%" top="50%" textAlign="center" style={{ transform: "translate(-50%, -50%)" }}>
            <img className={theme.LogoContainer} src={settings.theme === "dark" ? fullLogo : fullLogoDark} alt="Site loading logo" />
            {error ?
                <>
                    <Typography variant="h4">
                        {t('pre_screens.connection_error.header_text')}
                    </Typography>
                    <Typography variant="body1">
                        {t('pre_screens.connection_error.subtitle_text')}
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