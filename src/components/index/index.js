import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    TitleContainer: {
        backgroundColor: theme.palette.background.level2,
        boxShadow: theme.shadows[6],
        margin: theme.overrides.defaultMarginOverride,
        marginTop: 0,
        marginBottom: theme.spacing(3),
        padding: theme.overrides.defaultMargin,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            margin: theme.overrides.defaultMarginMobileOverride,
            marginTop: 0,
            marginBottom: theme.spacing(3),
            padding: theme.overrides.defaultMarginMobile,
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        }
    },
    ContainerDiv: {
        marginBottom: theme.spacing(5)
    },
    IndexHeader: {
        marginBottom: theme.spacing(2)
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