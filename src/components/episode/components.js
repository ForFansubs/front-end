import { Button, makeStyles } from '@material-ui/core'
import EpisodeTitleParser from '../../config/episode-title-parser'

const useStyles = makeStyles(theme => ({
    Container: {
        [theme.breakpoints.down('sm')]: {
            display: "flex",
            overflowX: "auto",
            width: "fit-content"
        }
    },
    Iframe: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    },
    IframeContainer: {
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden"
    },
    IframePlaceholder: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    FallbackContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    },
    LinksContainer: {
        '& button': {
            marginBottom: 4,
            marginRight: 4
        },

        [theme.breakpoints.down('sm')]: {
            display: "block",
            overflow: "auto",
            animation: "none",
            right: 20,
            marginRight: 0
        }
    },
    LinksContainerOpen: {
        opacity: 1
    },
    LinksContainerClose: {
        opacity: 0
    },
    LinksButtonContainer: {
        marginBottom: -4
    },
    LinksButton: {
        '&:last-child': {
            marginRight: 0
        },
        '& span': {
            fontSize: ".7rem"
        }
    },
    MetadataContainer: {
        '& img': {
            width: "100%",
            marginBottom: -5
        }
    },
    EpisodeContainer: {
        maxHeight: 200,
        overflow: "auto",
        "&::-webkit-scrollbar": {
            width: 3,
        },
        "&::-webkit-scrollbar-thumb": {
            marginTop: 0,
            backgroundColor: theme.palette.primary.main
        },
        '&::-webkit-scrollbar-track': {
            marginTop: 0
        }
    },
    EpisodeButtons: {
        marginBottom: "5px!important"
    }
}))

const defaultBoxProps = {
    boxShadow: 2, bgcolor: "background.paper"
}

function EpisodeButton(props) {
    const classes = useStyles()
    const { activeEpisode } = props
    let { slug, title, data } = EpisodeTitleParser(props.anime_name, props.episode_number, props.special_type)

    return (
        <Button
            className={classes.EpisodeButtons}
            fullWidth
            variant="outlined"
            onClick={() => props.handleEpisodeClick(slug, title, data, props.credits, props.created_time, props.id)}
            color={props.special_type === activeEpisode.special_type && props.episode_number === activeEpisode.episode_number ? "secondary" : "default"}
            key={props.id}>
            {title}
        </Button>
    )
}

export {
    useStyles,
    EpisodeButton,
    defaultBoxProps
}