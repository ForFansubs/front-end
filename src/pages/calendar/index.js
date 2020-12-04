import { useState, useEffect } from 'react'
import ReactGA from 'react-ga';
import { useTranslation } from 'react-i18next';

import Metatags from '../../components/helmet/index'
import { CalendarDayPanel, CalendarDays } from '../../components/calendar'
import axios from '../../config/axios/axios';
import { getCalendarData } from '../../config/api-routes';
import { CircularProgress } from '@material-ui/core';

import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { calendarPage } from '../../config/front-routes';

const dayList = [1, 2, 3, 4, 5, 6, 0]

export default function CalendarPage() {
    const { t } = useTranslation("pages")
    const [calendarRawData, setCalendarRawData] = useState([])
    const [calendarTodayData, setCalendarTodayData] = useState([])
    const [selectedDay, setSelectedDay] = useState(null)
    const [loading, setLoading] = useState(true)

    const todayDate = new Date()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    getCalendarData
                ).catch(res => res)

                if (res.status === 200) {
                    setCalendarRawData(res.data)

                    return setLoading(false)
                }
            } catch (err) {
                console.log(err)
                return setLoading(false)
            }
        }

        fetchData()
        ReactGA.pageview(window.location.pathname)
    }, [])

    useEffect(() => {
        if (selectedDay === null) return


        const tempCalendarData = []

        for (const c of calendarRawData) {
            const day = getDay(new Date(c.release_date))

            if (day === selectedDay) {
                tempCalendarData.push(c)
            }
        }

        setCalendarTodayData(tempCalendarData)
    }, [selectedDay])

    if (loading) {
        return (
            <CircularProgress />
        )
    }

    return (
        <>
            <Metatags title={
                t('calendar.metadata.title',
                    {
                        site_name: process.env.REACT_APP_SITENAME,
                    })}
                desc={
                    t('calendar.metadata.description',
                        {
                            site_name: process.env.REACT_APP_SITENAME,
                        })}
                url={process.env.REACT_APP_SITEURL + calendarPage} />
            <CalendarDays
                firstDayOfWeek={startOfWeek(todayDate, { weekStartsOn: 1 })}
                todayDate={todayDate}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                dayList={dayList} />
            {calendarTodayData.length ? <CalendarDayPanel items={calendarTodayData} /> : ""}
        </>
    )
}