import React from 'react'
import { useGlobal } from 'reactn'
import useTheme from '@material-ui/styles/useTheme'
import styled from 'styled-components'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

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
    bottom: 10px;
    left: 0px;
    padding: 0 40px;

    @media(max-width:${props => props.theme.breakpoints.values.sm}px) {
        padding: 0 20px 0 20px;
        
        ${FooterCopyrightText} {
            text-align: center;
        }
    }
`

const FooterInnerDiv = styled(Box)`
    display: flex;
    @media(max-width:${props => props.theme.breakpoints.values.sm}px) {
        display: block;
    }
`

const FooterLogo = styled(Typography)``

export default function Footer() {
    const theme = useTheme()
    const version = useGlobal('settings')[0].version

    return (
        <>
            <FooterDiv theme={theme}>
                <FooterCopyrightText>
                    <FooterInnerDiv theme={theme}>
                        <Typography variant="h6">
                        <a href="https://aybertocarlos.github.io/" rel="noopener noreferrer" target="_blank">
                            aybertocarlos &copy; {(new Date()).getFullYear()}
                        </a>
                            &nbsp;-&nbsp;
                            FFs v{version}
                            &nbsp;-&nbsp;
                        </Typography>
                        <a href="https://github.com/ayberktandogan/ForFansubs-Wiki/wiki" rel="noopener noreferrer" target="_blank">
                            <FooterLogo variant="body2">github</FooterLogo>
                        </a>
                        {process.env.REACT_APP_FACEBOOK_LINK ?
                            <a href={process.env.REACT_APP_FACEBOOK_LINK} rel="noopener noreferrer" target="_blank">
                                <FooterLogo variant="body2">.facebook</FooterLogo>
                            </a>
                            : ""
                        }
                        {process.env.REACT_APP_DISCORD_LINK ?
                            <a href={process.env.REACT_APP_DISCORD_LINK} rel="noopener noreferrer" target="_blank">
                                <FooterLogo variant="body2">.discord</FooterLogo>
                            </a>
                            :
                            ""
                        }
                    </FooterInnerDiv>
                </FooterCopyrightText>
            </FooterDiv>
        </>
    )
}