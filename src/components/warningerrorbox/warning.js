import React from 'react'

import { Box, Typography, makeStyles } from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning'
import yellow from '@material-ui/core/colors/red'

const useStyles = makeStyles(theme => ({
    Container: {
        borderLeft: `${yellow.A200} 4px solid`,
        display: "flex",
        alignItems: "center",
        backgroundColor: props => props.bgcolor || theme.palette.background.level2,
        boxShadow: theme.shadows[2],
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        '& svg': {
            marginRight: 5
        }
    }
}))

export default function WarningBox(props) {
    const classes = useStyles()

    return (
        <Box className={classes.Container}>
            <WarningIcon /><Typography variant="subtitle2">{props.children}</Typography>
        </Box>
    )
}