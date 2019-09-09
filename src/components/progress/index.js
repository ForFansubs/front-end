import React from 'react'

import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'


export default function Loading(props) {
    const { disableShrink } = props

    return (
        <Box style={{ width: "100%" }} textAlign="center">
            <CircularProgress disableShrink={disableShrink ? true : false} />
        </Box>
    )
}