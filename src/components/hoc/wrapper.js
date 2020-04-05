import React from 'react'

import Header from '../header/header'

import Login from '../user/login'
import Register from '../user/register'

import { ToastContainer, Slide } from 'react-toastify';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    PaddingDiv: {
        boxSizing: "border-box",
        padding: theme.overrides.defaultMargin,
        width: "100%",
        [theme.breakpoints.down("xs")]: {
            padding: theme.overrides.defaultMarginMobile
        }
    }
}))


export default function (props) {
    const classes = useStyles()

    return (
        <>
            <div style={{ display: "flex" }}>
                <Header />
                <Login />
                <Register />
                <div className={classes.PaddingDiv}>
                    {props.children}
                </div>
                <ToastContainer transition={Slide} />
            </div>
        </>
    )
}