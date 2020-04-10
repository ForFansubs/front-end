import React from 'react'


import { Box, Typography, makeStyles } from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning'
import red from '@material-ui/core/colors/red'

const useStyles = makeStyles(theme => ({
    Container: {
        borderLeft: `${red.A200} 4px solid`,
        display: "flex",
        alignItems: "center",
        boxShadow: theme.shadows[2],
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        backgroundColor: props => props.bgcolor || theme.palette.background.paper,
        '& svg': {
            marginRight: 5
        }
    }
}))

export default function ErrorBox(props) {
    const classes = useStyles()

    return (
        <Box className={classes.Container}>
            <WarningIcon /><Typography variant="subtitle2">{props.children}</Typography>
        </Box>
    )
}