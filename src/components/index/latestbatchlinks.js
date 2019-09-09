import React from 'react'

import Dotdotdot from 'react-dotdotdot'
import { Link } from 'react-router-dom'
import { Typography, Grid } from '@material-ui/core'
import { animePage } from '../../config/front-routes'
import styled from 'styled-components'

const ContentDiv = styled(Typography)`
    text-align: center
`

export default function LatestBatchLinks(props) {
    const { anime_slug, anime_name } = props

    return (
        <>
            <Grid item xs={6} md={4} lg={2}>
                <Link to={animePage(anime_slug)}>
                    <Dotdotdot clamp={1} useNativeClamp><ContentDiv variant="h6">{anime_name}</ContentDiv></Dotdotdot>
                    <ContentDiv variant="h6">TOPLU LİNK</ContentDiv>
                </Link>
            </Grid>
        </>
    )
}