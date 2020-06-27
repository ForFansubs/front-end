import React, { useState, useEffect } from 'react'
import { Swipeable } from 'react-swipeable'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import ReactInterval from 'react-interval';


import Featured, { FeaturedLoading } from './featured'
import { makeStyles, Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    FeaturedContainer: {
        position: "relative"
    },
    FeaturedComponent: {
        boxShadow: theme.shadows[6]
    },
    PaginationContainer: {
        display: "flex",
        position: "relative",
        justifyContent: "flex-end",
        marginTop: theme.spacing(2),
        zIndex: 2
    },
    PaginationCircles: {
        width: 20,
        height: 5,
        backgroundColor: theme.palette.background.paper,
        marginLeft: theme.spacing(1),
        cursor: "pointer",
        ['@media (hover: hover) and (pointer: fine)']: {
            '&:hover': {
                backgroundColor: theme.palette.primary.main
            }
        }
    },
    PaginationCirclesActive: {
        backgroundColor: theme.palette.primary.main
    }
}))

export default function FeaturedContainer(props) {
    const { loading } = props
    const [list, setList] = useState([])
    const [active, setActive] = useState(0)
    const [isIntervalEnabled,] = useState(true)
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
                        <ReactInterval timeout={5000} enabled={isIntervalEnabled ? isAutoScrollActive : isIntervalEnabled}
                            callback={() => {
                                return setActive((active + 1) % list.length)
                            }} />
                        <Swipeable
                            onSwipedLeft={() => {
                                return setActive((active + 1) % list.length)
                            }}
                            onSwipedRight={() => {
                                if (active === 0) return setActive(list.length - 1)
                                else return setActive((active - 1) % list.length)
                            }}>
                            <div
                                onMouseEnter={() => setIsAutoScrollActive(false)}
                                onMouseLeave={() => setIsAutoScrollActive(true)}
                                className={classes.FeaturedComponent}>
                                {list.map((l, i) => (
                                    <Featured key={i + " featured"} {...l} index={i} display={i === active} />
                                ))}
                            </div>
                        </Swipeable>
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