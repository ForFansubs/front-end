import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import ReactInterval from 'react-interval';


import Featured, { FeaturedLoading } from './featured'
import { makeStyles, Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    FeaturedContainer: {
        position: "relative",
        margin: theme.overrides.defaultMarginOverride,

        [theme.breakpoints.down("xs")]: {
            margin: theme.overrides.defaultMarginMobileOverride
        }
    },
    PaginationContainer: {
        display: "flex",
        position: "absolute",
        right: theme.spacing(2),
        bottom: theme.spacing(2),
        zIndex: 2
    },
    PaginationCircles: {
        width: 15,
        height: 15,
        backgroundColor: theme.palette.background.default,
        marginLeft: theme.spacing(1),
        cursor: "pointer"
    },
    PaginationCirclesActive: {
        backgroundColor: theme.palette.background.paper
    }
}))

export default function FeaturedContainer(props) {
    const { loading } = props
    const [list, setList] = useState([])
    const [active, setActive] = useState(0)
    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)
    const classes = useStyles()

    useEffect(() => {
        setList(props.list)
    }, [props.list])

    return (
        <>
            <Box className={classes.FeaturedContainer}>
                {loading ?
                    <>
                        <FeaturedLoading />
                    </>
                    :
                    <>
                        <ReactInterval timeout={5000} enabled={isAutoScrollActive}
                            callback={() => {
                                setActive((active + 1) % list.length)
                            }} />
                        <div
                            onMouseEnter={() => setIsAutoScrollActive(false)}
                            onMouseLeave={() => setIsAutoScrollActive(true)}>
                            {list.map((l, i) => (
                                <Featured key={i + " featured"} {...l} index={i} display={i === active} />
                            ))}
                        </div>
                        <Box className={classes.PaginationContainer}>
                            {list.map((c, i) => (
                                <div key={i + "featured"} onClick={() => { setActive(i) }}>
                                    <div className={clsx(classes.PaginationCircles, {
                                        [classes.PaginationCirclesActive]: i === active
                                    })} />
                                </div>
                            ))}
                        </Box>
                    </>}
            </Box>
        </>
    )
}

FeaturedContainer.propTypes = {
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}