import React from 'react'
import { Divider, makeStyles } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'


const useStyles = makeStyles(theme => ({
    TitleContainer: {
        alignItems: "center",
        '& h2': {
            fontWeight: 900,
            [theme.breakpoints.down('sm')]: {
                color: theme.palette.text.primary,
                textShadow: "none"
            },
            '&:after': {
                content: "''",
                color: theme.palette.background.default,
                textShadow: `-1px -1px 0 ${theme.palette.text.primary},  
                        1px -1px 0 ${theme.palette.text.primary},
                        -1px 1px 0 ${theme.palette.text.primary},
                        1px 1px 0 ${theme.palette.text.primary}`
            }
        }
    },
    MainDiv: {
        color: theme.palette.type === "dark" ? "inherit" : grey[700]
    },
    ContainerDiv: {
    },
    IndexHeader: {
        marginBottom: theme.spacing(2)
    },
    EpisodeContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(9, 1fr)",
        gridTemplateRows: "repeat(1, 1fr)",
        gap: `${theme.spacing(2)}px`,
        gridTemplateAreas: `". . . . . . . . ." ". . . . . . . . ."`,
    },
    [theme.breakpoints.down("md")]: {
        EpisodeContainer: {
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridTemplateRows: "repeat(1, 1fr)",
            gap: `${theme.spacing(2)}px`,
            gridTemplateAreas: `". . . . . ."`,
        },
        Title: {
            "& h2": {
                fontSize: "3em"
            }
        }
    },
    IndexDivider: {
        margin: theme.spacing(4, 0)
    },
    [theme.breakpoints.down("xs")]: {
        EpisodeContainer: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(1, 1fr)",
            gap: `${theme.spacing(2)}px`,
            gridTemplateAreas: `". . ."`,
        },
        Title: {
            "& h2": {
                fontSize: "3em"
            }
        }
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

function IndexDivider() {
    const classes = useStyles()

    return (
        <div className={classes.IndexDivider}>
            <Divider />
        </div>
    )
}

export { useStyles, TitleContainer, IndexDivider }