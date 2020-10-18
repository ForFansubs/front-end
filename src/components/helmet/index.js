import React from 'react'
import { Helmet } from 'react-helmet-async'
import { logoRoute } from '../../config/front-routes'

export default function (props) {
    const { title, desc, url, type } = props

    return (
        <Helmet>
            <title>{title || `${process.env.REACT_APP_SITENAME} ${process.env.REACT_APP_INDEX_TITLE_TEXT}`}</title>
            <meta name="title" content={title || `${process.env.REACT_APP_SITENAME} ${process.env.REACT_APP_INDEX_TITLE_TEXT}`} />
            <meta name="description" content={desc || process.env.REACT_APP_META_DESCRIPTION} />
            <meta name="keywords" content={props.keywords || process.env.REACT_APP_META_KEYWORDS} />
            {props.twitter_card ? <meta property="og:image:width" content="1200" /> : ""}
            {props.twitter_card ? <meta property="og:image:height" content="628" /> : ""}
            <meta property="og:type" content={type || "website"} />
            <meta property="og:url" content={process.env.REACT_APP_SITEURL + (url || "/")} />
            <meta property="og:title" content={title || `${process.env.REACT_APP_SITENAME} ${process.env.REACT_APP_INDEX_TITLE_TEXT}`} />
            <meta property="og:description" content={desc || process.env.REACT_APP_META_DESCRIPTION} />
            <meta property="og:image" content={props.image || process.env.REACT_APP_SITEURL + logoRoute} />
            <meta property="twitter:card" content={props.twitter_card ? "summary_large_image" : "summary"} />
            <meta property="twitter:url" content={process.env.REACT_APP_SITEURL + (url || "/")} />
            <meta property="twitter:title" content={title || `${process.env.REACT_APP_SITENAME} ${process.env.REACT_APP_INDEX_TITLE_TEXT}`} />
            <meta property="twitter:description" content={desc || process.env.REACT_APP_META_DESCRIPTION} />
            <meta property="twitter:image" content={props.image || process.env.REACT_APP_SITEURL + logoRoute} />
        </Helmet>
    )
}