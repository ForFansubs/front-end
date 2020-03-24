import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import Featured from './featured'
import { makeStyles, Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    FeaturedContainer: {
        position: "relative"
    },
    PaginationContainer: {
        display: "flex",
        position: "absolute",
        right: theme.spacing(2),
        bottom: theme.spacing(2),
        zIndex: 2
    },
    PaginationCircles: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: theme.palette.secondary.main,
        marginLeft: theme.spacing(1),
        cursor: "pointer"
    },
    PaginationCirclesActive: {
        backgroundColor: theme.palette.secondary.dark
    }
}))

export default function FeaturedContainer(props) {
    const { type } = props
    const [list, setList] = useState([])
    const [active, setActive] = useState(0)
    const classes = useStyles()

    console.log("güncvellendğis")

    useEffect(() => {
        setList(props.list)
        setActive(0)
        // const AutoScroller = setInterval(() => {
        //     const activeIndex = active
        //     const newActiveIndex = activeIndex + 1 % content.length
        //     console.log(activeIndex + 1 % content.length)
        //     setActive(newActiveIndex)
        // }, 4000)
    }, [props.list])
    return (
        <>
            <Box className={classes.FeaturedContainer}>
                {list.length === 0 ?
                    ""
                    :
                    <Featured {...list[active]} />}
                <Box className={classes.PaginationContainer}>
                    {list.map((c, i) => (
                        <div onClick={() => { setActive(i) }}>
                            <div className={clsx(classes.PaginationCircles, {
                                [classes.PaginationCirclesActive]: i === active
                            })} />
                        </div>
                    ))}
                </Box>
            </Box>
        </>
    )
}

FeaturedContainer.propTypes = {
    list: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}