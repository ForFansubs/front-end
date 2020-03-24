import React from 'react'

import Header from '../header/header'
import Footer from '../footer/footer'

import Login from '../user/login'
import Register from '../user/register'

import { ToastContainer, Slide } from 'react-toastify';


import styled from 'styled-components'

const PaddingDiv = styled.div`
    box-sizing: border-box;
    padding: 80px 40px 20px;
    width: 100%;

    @media(max-width:600px) {
        padding: 80px 20px 20px;
    }
`

export default function (props) {
    return (
        <>
            <div style={{ display: "flex" }}>
                <Header />
                <Login />
                <Register />
                <PaddingDiv>
                    {props.children}
                </PaddingDiv>
                <ToastContainer transition={Slide} />
            </div>
        </>
    )
}