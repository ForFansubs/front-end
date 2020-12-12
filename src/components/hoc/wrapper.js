import Header from '../header/header'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    OutsideContainer: {
        display: "flex",
        width: "100%",
        height: "100%"
    },
    PaddingDiv: {
        boxSizing: "border-box",
        padding: theme.overrides.defaultMargin,
        width: "100%",
        [theme.breakpoints.down("xs")]: {
            padding: theme.overrides.defaultMarginMobile
        }
    },
    ScrollNode: {
        width: "100%",
        height: "100%",
        overflowY: "auto",
        "-webkit-transform": "translateZ(0)",
        transform: "translateZ(0)",
        '&::-webkit-scrollbar-track': {
            marginTop: 64,
            [theme.breakpoints.down('xs')]: {
                marginTop: 56
            }
        },
        [theme.breakpoints.down('sm')]: {
            overflowY: "scroll",
            scrollbarWidth: "none", /* Firefox */
            "-ms-overflow-style": "none"  /* Internet Explorer 10+ */
        }
    },
    MainContainer: {
        isolation: "isolate"
    },
    '@global': {
        '*::-webkit-scrollbar': {
            width: 8,
            [theme.breakpoints.down('sm')]: {
                width: 0,
                height: 0
            }
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
            backgroundColor: theme.palette.background.paper
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main
        }
    }
}))


export default function HOC(props) {
    const classes = useStyles()

    return (
        <>
            <div className={classes.OutsideContainer}>
                <Header />
                <div className={classes.ScrollNode} id="scroll-node">
                    <div className={classes.PaddingDiv}>
                        <section className={classes.MainContainer}>
                            {props.children}
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}