import { Grid, Box, Typography, Button, makeStyles } from '@material-ui/core'
import styled from 'styled-components'


import yellow from '@material-ui/core/colors/yellow'
import red from '@material-ui/core/colors/red'

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
        position: "absolute",
        top: 20,
        left: 20,
        marginRight: 20,
        marginBottom: -4,
        zIndex: 3,
        transition: theme.transitions.create('opacity', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.short,
        }),

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
    EpisodeContainer: {
        maxHeight: 200,
        overflow: "auto"
    },
    EpisodeButtons: {
        marginBottom: "5px!important"
    }
}))

function EpisodeListParser(episodenumber, specialtype) {
    if (specialtype && specialtype !== "toplu") {
        return {
            title: `${specialtype.toUpperCase()} ${episodenumber}`,
            slug: `${specialtype}${episodenumber}`,
            data: `${specialtype}-${episodenumber}`
        }
    }
    else return {
        title: `${episodenumber}. Bölüm`,
        slug: `bolum${episodenumber}`,
        data: `bolum-${episodenumber}`
    }
}

const defaultBoxProps = {
    boxShadow: 2, bgcolor: "background.level2"
}

export {
    useStyles,
    EpisodeListParser,
    defaultBoxProps
}