import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from '../header/header'
import Footer from '../footer/footer'

import Login from '../user/login'
import Register from '../user/register'

import theme from '../../config/theming/index'
import { ToastContainer, Slide } from 'react-toastify';
import { ThemeProvider } from '@material-ui/styles';

import styled from 'styled-components'

const PaddingDiv = styled.div`
    box-sizing: border-box;
    padding: 80px 20px 20px 100px;

    @media(max-width:${theme.breakpoints.values.sm}px) {
        padding: 80px 20px 20px 20px;
    }
`

export default function (props) {
    console.log(theme)

    return (
        <>
            <CssBaseline>
                <ThemeProvider theme={theme}>
                    <Header />
                    <Login />
                    <Register />
                    <PaddingDiv>
                        {props.children}
                        <Footer />
                    </PaddingDiv>
                    <ToastContainer transition={Slide} />
                </ThemeProvider>
            </CssBaseline>
        </>
    )
}