import React from 'react'

import { useTheme } from '@material-ui/styles'
import styled from 'styled-components'

import Box from '@material-ui/core/Box'

const FooterCopyrightText = styled.h4`
        a {
            text-decoration: none;
        }
    `

const FooterDiv = styled.footer`
    margin: 10px 0;
    position: absolute;
    width: 100%;
    height: 20px;
    right: 0px;
    bottom: 0;
    left: 0px;
    padding: 0 20px 0 100px;

    @media(max-width:${props => props.theme.breakpoints.values.sm}px) {
        padding: 0 20px 0 20px;
        
        ${FooterCopyrightText} {
            text-align: center;
        }
    }
`

export default function Footer() {
    const theme = useTheme()

    return (
        <>
            <FooterDiv theme={theme}>
                <FooterCopyrightText>
                    <Box display="flex">
                        <a href="http://aybertocarlos.com" rel="noopener noreferrer" target="_blank">aybertocarlos &copy; {(new Date()).getFullYear()}</a> &nbsp;- Designed with <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React logo" style={{ height: "20px", filter: "brightness(0) invert(1)" }} /></a> <a href="https://material-ui.com/" rel="noopener noreferrer" target="_blank"><img src="https://images.opencollective.com/proxy/images?src=https%3A%2F%2Fopencollective-production.s3-us-west-1.amazonaws.com%2F26cf1e10-8c6a-11e8-9fbe-bf2bef5835c0.png" alt="Material-UI logo" style={{ height: "20px", filter: "brightness(0) invert(1)" }} /></a>
                    </Box>
                </FooterCopyrightText>
            </FooterDiv>
        </>
    )
}