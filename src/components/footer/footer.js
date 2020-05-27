import React from 'react'
import { useGlobal } from 'reactn'

import { Box, makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import FooterItems from '../../config/footer_items'

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

                        {FooterItems.length !== 0 ?
                            FooterItems.map((item, index) => {
                                if (index === 0) {
                                    return (
                                        <a key={item.title} href={item.link} rel="noopener noreferrer" target="_blank">
                                            {item.title}
                                        </a>
                                    )
                                }
                                else {
                                    return (
                                        <a key={item.title} href={item.link} rel="noopener noreferrer" target="_blank">
                                            .{item.title}
                                        </a>
                                    )
                                }
                            })
                            :
                            ""
                        }
                    </Typography>
                    <Typography variant="subtitle2" className={classes.FooterAuthor}>
                        <a href="https://aybertocarlos.github.io/" rel="noopener noreferrer" target="_blank">
                            aybertocarlos &copy; {(new Date()).getFullYear()}
                        </a>
                    </Typography>
                </Box>
            </footer>
        </>
    )
}