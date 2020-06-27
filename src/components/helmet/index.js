import React from 'react'
import { Helmet } from 'react-helmet-async'
import { logoRoute } from '../../config/front-routes'

export default function (props) {
    const { title, desc, url, type } = props

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={desc} />
            <meta name="keywords" content={props.keywords || process.env.REACT_APP_META_KEYWORDS} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={process.env.REACT_APP_SITEURL + url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:image" content={props.image || process.env.REACT_APP_SITEURL + logoRoute} />
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:url" content={process.env.REACT_APP_SITEURL + url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={desc} />
            <meta property="twitter:image" content={props.image || process.env.REACT_APP_SITEURL + logoRoute} />
        </Helmet>
    )
}