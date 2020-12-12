import { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable';

import PropTypes from 'prop-types'
import clsx from 'clsx'
import ReactInterval from 'react-interval';


import Featured, { FeaturedLoading } from './featured'
import { makeStyles, Box, fade } from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';

export const Swipeable = ({ children, ...props }) => {
    const handlers = useSwipeable(props);
    return (<div {...handlers}>{children}</div>);
}

const useStyles = makeStyles(theme => ({
    FeaturedContainer: {
        position: "relative",
        marginBottom: theme.spacing(4)
    },
    FeaturedComponent: {
        boxShadow: theme.shadows[6],
        "&:hover": {
            '& $PaginationButton': {
                opacity: 1
            }
        }
    },
    PaginationButtonContainer: {
        zIndex: 3
    },
    PaginationButton: {
        display: "flex",
        alignItems: "center",
        position: "absolute",
        transition: theme.transitions.create(["opacity"], { easing: theme.transitions.easing.easeInOut, duration: theme.transitions.duration.short }),
        backgroundColor: fade(theme.palette.background.paper, 0.7),
        cursor: "pointer",
        padding: theme.spacing(0.5),
        top: 0,
        bottom: 28,
        zIndex: 3,
        opacity: 0
    },
    PaginationButtonLeft: {
        backgroundColor: "transparent",
        left: 0
    },
    PaginationButtonRight: {
        right: 0
    },
    PaginationCirclesContainer: {
        display: "flex",
        position: "relative",
        justifyContent: "flex-end",
        marginTop: theme.spacing(2),
        zIndex: 2
    },
    PaginationCircles: {
        width: 12,
        height: 12,
        borderRadius: 12,
        backgroundColor: theme.palette.background.paper,
        marginLeft: theme.spacing(1),
        cursor: "pointer",
        transition: theme.transitions.create(['width', 'background-color'], {
            easing: theme.transitions.easing.sharp,
            duration: "200ms",
        }),
        ['@media (hover: hover) and (pointer: fine)']: {
            '&:hover': {
                backgroundColor: theme.palette.primary.main
            }
        }
    },
    PaginationCirclesActive: {
        width: 36,
        backgroundColor: theme.palette.primary.main
    }
}))

export default function FeaturedContainer(props) {
    const { t } = useTranslation('components')
    const { loading, contentType } = props
    const [list, setList] = useState([])
    const [active, setActive] = useState(0)
    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)
    const classes = useStyles()

    useEffect(() => {
        setList(props.list)
    }, [props.list])

    function handleNextPage() {
        setIsAutoScrollActive(false)
        setActive((active + 1) % list.length)
        setTimeout(() => {
            setIsAutoScrollActive(true)
        }, 200)
    }

    function handlePreviousPage() {
        setIsAutoScrollActive(false)
        if (active === 0) setActive(list.length - 1)
        else setActive((active - 1) % list.length)
        setTimeout(() => {
            setIsAutoScrollActive(true)
        }, 200)
    }

    if (!list.length && !loading) {
        return (
            <Alert severity="error">
                {t('featured.errors.error', { contentType })}
            </Alert>
        )
    }

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
                            callback={handleNextPage} />
                        <Swipeable
                            onSwipedLeft={handleNextPage}
                            onSwipedRight={handlePreviousPage}>
                            <div
                                unselectable
                                onMouseEnter={() => setIsAutoScrollActive(false)}
                                onMouseLeave={() => setIsAutoScrollActive(true)}
                                className={`${classes.FeaturedComponent} unselectable`}>
                                <div className={classes.PaginationButtonContainer}>
                                    <div onClick={handlePreviousPage} className={`${classes.PaginationButton} ${classes.PaginationButtonLeft}`}>
                                        <NavigateBefore />
                                    </div>
                                    <div onClick={handleNextPage} className={`${classes.PaginationButton} ${classes.PaginationButtonRight}`}>
                                        <NavigateNext />
                                    </div>
                                </div>
                                {list.map((l, i) => (
                                    <Featured key={i + " featured"} {...l} contentType={contentType} index={i} display={i === active} />
                                ))}
                            </div>
                        </Swipeable>
                        <Box className={classes.PaginationCirclesContainer}>
                            {list.map((c, i) => (
                                <div key={i + "featured"} onClick={() => {
                                    setIsAutoScrollActive(false)
                                    setActive(i)
                                    setTimeout(() => {
                                        setIsAutoScrollActive(true)
                                    }, 200)
                                }}>
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
    loading: PropTypes.bool.isRequired,
    contentType: PropTypes.string.isRequired
}