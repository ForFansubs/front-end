import React from 'react'


import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import WarningIcon from '@material-ui/icons/Warning'
import red from '@material-ui/core/colors/red'
import styled from 'styled-components'

const ContentEpisodesError = styled(Box)`
    border-left: ${red.A200} 4px solid;
    display: flex;
    align-items: center;
    svg {
        margin-right: 5px
    }
`

export default function ErrorBox(props) {
    return (
        <ContentEpisodesError boxShadow={2} p={1} mb={1} bgcolor="background.level2">
            <WarningIcon /><Typography variant="subtitle2">{props.children}</Typography>
        </ContentEpisodesError>
    )
}