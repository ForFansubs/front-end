import React, { useEffect } from 'react'
import { Button, Divider, makeStyles, Typography } from '@material-ui/core'
import { CoverPlaceholder } from '../../config/theming/images'
import Dotdotdot from 'react-dotdotdot'
import clsx from 'clsx'

import addDays from 'date-fns/addDays'
import format from 'date-fns/format'
import isSameDay from 'date-fns/isSameDay'
import isFuture from 'date-fns/isFuture'
import getDay from 'date-fns/getDay'
import parseISO from 'date-fns/parseISO'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    CalendarDays: {
        display: "flex",
        marginBottom: theme.spacing(2),
        overflow: "auto",
        "& .MuiButton-root": {
            borderRadius: 0
        }
    },
    CalendarDaysItem: {
        display: "flex",
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(1)
        }
    },
    CalendarDaysButton: {
        padding: theme.spacing(0, 2),
        "& span": {
            fontWeight: "400"
        }
    },
    CalendarDaysSameDay: {
        "& span": {
            fontWeight: "600"
        },
        "& p": {
            fontWeight: "600"
        }
    },
    CalendarDayPanel: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridGap: theme.spacing(4),
        [theme.breakpoints.down("lg")]: {
            gridTemplateColumns: "repeat(3, 1fr)"
        },
        [theme.breakpoints.down("sm")]: {
            gridGap: theme.spacing(2),
            gridTemplateColumns: "repeat(1, 1fr)"
        }
    },
    CalendarItem: {
        display: "flex",
        flexDirection: "column"
    },
    CalendarItemContainer: {
        display: "grid",
        gridTemplateColumns: `${theme.spacing(16)}px auto`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[6],
        [theme.breakpoints.down("md")]: {
            gridTemplateColumns: `${theme.spacing(12)}px auto`
        },
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: `${theme.spacing(16)}px auto`
        }
    },
    CalendarItemCoverArt: {
        height: 180,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        [theme.breakpoints.down("md")]: {
            height: 140,
        },
        [theme.breakpoints.down("sm")]: {
            height: 180,
        }
    },
    CalendarItemText: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: theme.spacing(2)
    },
    CalendarItemTime: {
        [theme.breakpoints.down("md")]: {
        },
        [theme.breakpoints.down("md")]: {
        }
    }
}))

function CalendarDays(props) {
    const classes = useStyles()
    const { t } = useTranslation(['days', 'common'])
    const { firstDayOfWeek, todayDate, selectedDay, setSelectedDay, dayList } = props

    useEffect(() => {
        const sameDayCheck = isSameDay(new Date(), todayDate)

        if (sameDayCheck) setSelectedDay(getDay(todayDate))
    }, [])

    return (
        <>
            <div className={classes.CalendarDays}>
                {
                    dayList.map((item, index) => {
                        const date = addDays(firstDayOfWeek, index)

                        return (
                            <React.Fragment key={date}>
                                <div className={classes.CalendarDaysItem}>
                                    <Button onClick={() => setSelectedDay(item)}>
                                        <div className={clsx(classes.CalendarDaysButton, {
                                            [classes.CalendarDaysSameDay]: selectedDay === item
                                        })}>
                                            <Typography variant="body1" align="right">
                                                {format(date, t('common:calendar_date_format'))}
                                            </Typography>
                                            <Typography variant="h4" component="span">
                                                {t(`${item}`)}
                                            </Typography>
                                        </div>
                                    </Button>
                                    {index !== dayList.length - 1
                                        ? <Divider orientation="vertical" flexItem />
                                        : ""}
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </>
    )
}

function CalendarDayPanel(props) {
    const classes = useStyles()
    const { items } = props

    return (
        <>
            <div className={classes.CalendarDayPanel}>
                {items.map(item => <CalendarItem
                    key={item.name}
                    {...item}
                    time={item.release_date}
                    classes={classes} />)}
            </div>
        </>
    )
}

function CalendarItem(props) {
    const { t } = useTranslation('common')
    const { name, episodes, cover_art, release_date, time, classes } = props

    return (
        <>
            <div className={classes.CalendarItem}>
                <div className={classes.CalendarItemTime}>
                    {time ?
                        <Typography variant="h4">
                            {format(parseISO(time), "HH:mm")}
                        </Typography>
                        : ""
                    }

                </div>
                <div className={classes.CalendarItemContainer}>
                    <div className={classes.CalendarItemCoverArt} style={{ backgroundImage: `url("${cover_art || CoverPlaceholder}")` }} />
                    <div className={classes.CalendarItemText}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            <Dotdotdot clamp={2} useNativeClamp>
                                {name || ""}
                            </Dotdotdot>
                        </Typography>
                        <Typography variant="h4" component="span">
                            <Dotdotdot clamp={1} useNativeClamp>
                                {episodes.length ? t('episode.episode_title', { episode_number: Number(episodes[0].episode_number) + 1 }) : t('episode.episode_title', { episode_number: 1 })}
                            </Dotdotdot>
                        </Typography>
                        {isFuture(new Date(release_date)) ?
                            <Typography variant="body1" component="span">
                                {t('ns.release_date')}: {format(new Date(release_date), t('date_format'))}
                            </Typography>
                            : ""}
                    </div>
                </div>
            </div>
        </>
    )
}

export { CalendarDays, CalendarDayPanel }