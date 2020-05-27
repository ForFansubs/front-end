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
    MainPageImage: {
        maxWidth: "100%"
    }
}))

const defaultBoxProps = {
    boxShadow: 2, bgcolor: "background.paper"
}

export { useStyles, defaultBoxProps }