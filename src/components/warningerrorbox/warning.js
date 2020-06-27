import React from 'react'

import { Box, Typography, makeStyles } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import yellow from '@material-ui/core/colors/yellow'

const useStyles = makeStyles(theme => ({
    Container: {
        borderLeft: `${yellow.A200} 4px solid`,
        display: "flex",
        alignItems: "center",
        backgroundColor: props => props.bgcolor || theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        padding: theme.spacing(1),
        width: "100%",
        '& svg': {
            marginRight: 5
        }
    }
}))

export default function WarningBox(props) {
    const classes = useStyles(props)

    return (
        <Box className={classes.Container} bgcolor={props.bgcolor || ""}>
            <InfoIcon /><Typography variant="subtitle2">{props.children}</Typography>
        </Box>
    )
}