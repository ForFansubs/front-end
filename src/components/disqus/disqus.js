import React, { useState, useEffect } from 'react'
import Disqus from 'disqus-react';

import { Box, Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

export default function DisqusBox(props) {
    const [comments, setComments] = useState(false)
    const { config, withButton } = props

    useEffect(() => {
        setComments(false)
    }, [config])

    if (process.env.NODE_ENV === "development") return ("")

    if (withButton) {
        return (
            <>
                {comments ?
                    <>
                        <Box boxShadow={2} p={2} mb={2} bgcolor="background.level1" textAlign="center">
                            <Typography variant="h5">Yorum Kuralları</Typography>
                            <Typography variant="body1">Küfür etmek yasaktır.</Typography>
                            <Typography variant="body1">Spoiler vermek yasaktır.</Typography>
                        </Box>
                        <Disqus.DiscussionEmbed shortname={process.env.REACT_APP_DISQUS_SHORTNAME} config={config} />
                    </>
                    :
                    <Box textAlign="center">
                        <Button variant="outlined" onClick={() => setComments(true)}>
                            <Typography variant="h6">Yorumları aç</Typography>
                        </Button>
                    </Box>
                }
            </>
        )
    }
    else {
        return (
            <>
                <Box boxShadow={2} p={2} mb={2} bgcolor="background.level1" textAlign="center">
                    <Typography variant="h5">Yorum Kuralları</Typography>
                    <Typography variant="body1">Küfür etmek yasaktır.</Typography>
                    <Typography variant="body1">Spoiler vermek yasaktır.</Typography>
                </Box>
                <Disqus.DiscussionEmbed shortname="puzzlesubs-com" config={config} />
            </>
        )
    }
}