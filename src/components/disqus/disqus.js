import React, { useState, useEffect } from 'react'
import Disqus from 'disqus-react';

import { Box, Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next';

export default function DisqusBox(props) {
    const { t } = useTranslation('components')
    const [comments, setComments] = useState(false)
    const { config, withButton } = props

    useEffect(() => {
        setComments(false)
    }, [config])

    // if (process.env.NODE_ENV === "development") return ("")

    if (withButton) {
        return (
            <>
                {comments ?
                    <>
                        <Disqus.DiscussionEmbed shortname={process.env.REACT_APP_DISQUS_SHORTNAME} config={config} />
                    </>
                    :
                    <Box textAlign="center">
                        <Button variant="outlined" onClick={() => setComments(true)}>
                            <Typography variant="h6">{t('disqus.open_comments')}</Typography>
                        </Button>
                    </Box>
                }
            </>
        )
    }
    else {
        return (
            <>
                <Disqus.DiscussionEmbed shortname={process.env.REACT_APP_DISQUS_SHORTNAME} config={config} />
            </>
        )
    }
}