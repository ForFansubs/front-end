import { useState } from 'react'
import { Redirect } from 'react-router-dom'

import { Typography, makeStyles } from '@material-ui/core'

import { fourOhFourGif } from '../../config/theming/images'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    Container: {
        position: "absolute",
        left: "50%",
        top: "50%",
        textAlign: "center",
        transform: "translate(-50%, -50%)"
    },
    Image: {
        maxWidth: "100vw",
        width: "500px",
        boxShadow: theme.shadows[6],
        marginBottom: theme.spacing(2)
    }
}))

export default function FourOhFourPage() {
    const { t } = useTranslation('components')
    const classes = useStyles()

    const [redirect, setRedirect] = useState(false)

    setTimeout(() => {
        setRedirect(true)
    }, 10000)

    return (
        <>
            {redirect ? <Redirect to="/" /> : ""}
            <div className={classes.Container}>
                <img src={fourOhFourGif} className={classes.Image} alt="404gif" />
                <Typography variant="h4">
                    {t('404.header_text')}
                </Typography>
                <Typography variant="body1">
                    {t('404.subtitle_text')}
                </Typography>
            </div>
        </>
    )
}