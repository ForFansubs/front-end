import React from 'react'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    TitleContainer: {
        alignItems: "center",
        '& h2': {
            fontWeight: 900,
        },
        '& $LineAfter::after': {
            content: "' '",
            whiteSpace: "pre",
            height: 2,
            background: theme.palette.divider,
            marginLeft: theme.spacing(2),
            flexGrow: "1"
        }
    },
    ContainerDiv: {
        marginBottom: theme.spacing(5)
    },
    IndexHeader: {
        marginBottom: theme.spacing(2)
    },
    LineAfter: {
        display: "flex",
        alignItems: "center"
    }
}))

function TitleContainer(props) {
    const classes = useStyles()

    return (
        <div className={classes.TitleContainer}>
            {props.children}
        </div>
    )
}

export { useStyles, TitleContainer }