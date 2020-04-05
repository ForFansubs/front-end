import React from 'react'
import { useGlobal } from 'reactn'
import useTheme from '@material-ui/styles/useTheme'

import { Box, makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    FooterInnerDiv: {
        padding: `${theme.spacing(2)}px`
    },
    FooterAuthor: {
        color: theme.palette.text.disabled,
        marginTop: `${theme.spacing(4)}px`
    }
}))

export default function Footer() {
    const theme = useTheme()
    const classes = useStyles()
    const version = useGlobal('settings')[0].version

    return (
        <>
            <footer>
                <Box className={classes.FooterInnerDiv}>
                    <Typography variant="h6">
                        <a href="https://forfansubs.github.io/" rel="noopener noreferrer" target="_blank">
                            FFs v{version}
                        </a>
                            &nbsp;-&nbsp;

                    <a href="https://github.com/ayberktandogan" rel="noopener noreferrer" target="_blank">
                            github
                    </a>
                        {process.env.REACT_APP_FACEBOOK_LINK ?
                            <a href={process.env.REACT_APP_FACEBOOK_LINK} rel="noopener noreferrer" target="_blank">
                                .facebook
                        </a>
                            : ""
                        }
                        {process.env.REACT_APP_DISCORD_LINK ?
                            <a href={process.env.REACT_APP_DISCORD_LINK} rel="noopener noreferrer" target="_blank">
                                .discord
                        </a>
                            :
                            ""
                        }
                    </Typography>
                    <Typography variant="subtitle2" className={classes.FooterAuthor}>
                        <a href="https://ayberktandogan.github.io/" rel="noopener noreferrer" target="_blank">
                            ayberktandogan &copy; {(new Date()).getFullYear()}
                        </a>
                    </Typography>
                </Box>
            </footer>
        </>
    )
}