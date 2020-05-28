import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    Navigator: {
    },
    NavigatorButtonContainer: {
        display: "flex",
        marginTop: theme.spacing(2),
        justifyContent: "center",
        '& $NavigateBefore': {
            marginRight: theme.spacing(2)
        },
        '& $NavigateNext': {
            marginLeft: theme.spacing(2)
        }
    },
    NavigateBefore: {

    },
    NavigateNext: {

    },
    ReadingStyleButtonContainer: {
        display: "flex",
        marginTop: theme.spacing(2),
        justifyContent: "center",
        '& svg': {
            marginRight: theme.spacing(1)
        },
    },
    WebtoonContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    MainPageImage: {
        maxWidth: "100%",
        height: "auto"
    }
}))

const defaultBoxProps = {
    boxShadow: 2, bgcolor: "background.paper"
}

export { useStyles, defaultBoxProps }