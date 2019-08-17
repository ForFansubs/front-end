import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'


export default function Loading(props) {
    const { disableShrink } = props

    return (
        <Box style={{ width: "100%" }} textAlign="center">
            <CircularProgress disableShrink={disableShrink ? true : false} color="secondary" />
        </Box>
    )
}