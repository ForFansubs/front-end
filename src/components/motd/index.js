import React, { useEffect, useState } from 'react'
import { useGlobal, useDispatch } from 'reactn'
import { Typography, makeStyles, Button } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import axios from '../../config/axios/axios'
import Markdown from '../markdown/markdown'
import { getMotdInfo } from '../../config/api-routes'


const useStyles = makeStyles(theme => ({
    MotdSection: {
        marginBottom: theme.spacing(2),
    },
    MotdContainer: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[6],
        marginBottom: theme.spacing(2),
        position: "relative"
    },
    CloseButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1)
    }
}))

export default function MotdContainer(props) {
    const classes = useStyles()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [closedMotd] = useGlobal('motd')
    const setMotd = useDispatch('setMotd')

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios(
                getMotdInfo({
                    content_id: props.content_id ? props.content_id : null,
                    content_type: props.content_type ? props.content_type : null
                }),
            ).catch(res => res)

            if (res.status === 200) {
                setData(res.data)
            }
            setLoading(false)
        }

        fetchData()
    }, [props.content_id])

    if ((props.type === "episode" || props.type === "manga-episode") && (!props.content_type || !props.content_id)) {
        return ("")
    }

    let MotdList = []

    if (!loading && data.length !== 0) {
        data.map(d => {
            if (closedMotd.indexOf(d.id) !== -1) return
            MotdList.push(
                <div className={classes.MotdContainer} key={d.id}>
                    {d.title ?
                        <Typography variant="h4" component="p">
                            {d.title}
                        </Typography>
                        :
                        ""}
                    <Markdown>
                        {d.subtitle ? d.subtitle : "**Bir sorun var? (Bu bir sistem mesajıdır.)**"}
                    </Markdown>
                    {d.can_user_dismiss ?
                        <Button onClick={() => setMotd(d.id)} size="small" className={classes.CloseButton}>
                            <CloseIcon fontSize="small" />
                        </Button>
                        : ""}
                </div>
            )
        })
    }

    return (
        MotdList.length !== 0 ?
            <>
                <section className={classes.MotdSection}>
                    {MotdList}
                </section>
            </>
            :
            ""
    )
}