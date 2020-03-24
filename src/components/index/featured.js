import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { animePage } from '../../config/front-routes'
import { contentHeader } from '../../config/api-routes'

import { bluray } from '../../config/theming/images'

import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    HeaderImage: {
        backgroundImage: props => `url(${contentHeader("anime", props.slug)})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        width: "100%",
        height: 500
    }
}))

export const FeaturedLoading = (key, active) => {
    return (
        <Box key={key}>

        </Box>
    )
}

export default function Featured(props) {
    const { title, synopsis, slug, premiered, genres, version } = props
    const classes = useStyles(props)

    return (
        <>
            <Link to={animePage(props.slug)}>
                <Box className={classes.HeaderImage} slug={slug} />
            </Link>
        </>
    )
}

Featured.propTypes = {
    title: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    premiered: PropTypes.string,
    genres: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired
}