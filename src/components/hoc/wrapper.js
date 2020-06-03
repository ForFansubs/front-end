import React from 'react'

import Header from '../header/header'

import Login from '../user/login'
import Register from '../user/register'

import { ToastContainer, Slide } from 'react-toastify';
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
        position: "relative",
        [theme.breakpoints.down("xs")]: {
            padding: theme.overrides.defaultMarginMobile
        }
    },
    ScrollNode: {
        width: "100%",
        height: "100%",
        overflowY: "auto",
        "-webkit-transform": "translateZ(0)",
        transform: "translateZ(0)"
    },
    MainContainer: {
        isolation: "isolate"
    },
    '@global': {
        '*::-webkit-scrollbar': {
            width: 8
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
            backgroundColor: theme.palette.background.paper,
            marginTop: 64,
            [theme.breakpoints.down('xs')]: {
                marginTop: 56
            }
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main
        }
    }
}))


export default function (props) {
    const classes = useStyles()

    return (
        <>
            <div className={classes.OutsideContainer}>
                <Header />
                <Login />
                <Register />
                <div className={classes.ScrollNode} id="scroll-node">
                    <div className={classes.PaddingDiv}>
                        <section className={classes.MainContainer}>
                            {props.children}
                        </section>
                    </div>
                </div>
                <ToastContainer transition={Slide} />
            </div>
        </>
    )
}