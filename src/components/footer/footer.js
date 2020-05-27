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
        color: theme.palette.grey["A200"],
        marginTop: `${theme.spacing(4)}px`
    },
    FooterItem: {
        marginRight: theme.spacing(1),
        color: theme.palette.grey["400"]
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
                        {FooterItems.length !== 0 ?
                            FooterItems.map((item, index) => {
                                return (
                                    <a key={item.title} href={item.link} rel="noopener noreferrer" target="_blank" className={classes.FooterItem}>
                                        {item.title}
                                    </a>
                                )
                            })
                            :
                            ""
                        }
                    </Typography>
                    <Typography variant="subtitle2" className={classes.FooterAuthor}>
                        <a href="https://forfansubs.github.io/" rel="noopener noreferrer" target="_blank">
                            ForFansubs v{version}
                        </a>
                        <br />
                        <a href="https://aybertocarlos.github.io/" rel="noopener noreferrer" target="_blank">
                            aybertocarlos &copy; {(new Date()).getFullYear()}
                        </a>
                    </Typography>
                </Box>
            </footer>
        </>
    )
}