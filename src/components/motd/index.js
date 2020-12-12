import { useContext, useEffect, useState } from 'react'
import { Typography, makeStyles, Button } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import Markdown from '../markdown/markdown'
import { getMotdInfo } from '../../config/api-routes'
import getDataFromAPI from '../../helpers/getDataFromAPI'
import { useTranslation } from 'react-i18next'
import MotdContext from '../../contexts/motd.context'


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
    const { t } = useTranslation('components')
    const classes = useStyles()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [motd, setMotd] = useContext(MotdContext)

    useEffect(() => {
        const fetchData = async () => {
            const res = await getDataFromAPI({
                route: getMotdInfo({
                    content_id: props.content_id ? props.content_id : null,
                    content_type: props.content_type ? props.content_type : null
                })
            }).catch(res => res)

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
            if (motd.indexOf(d.id) !== -1) return
            MotdList.push(
                <div className={classes.MotdContainer} key={d.id}>
                    {d.title ?
                        <Typography variant="h4" component="p">
                            {d.title}
                        </Typography>
                        :
                        ""}
                    <Markdown>
                        {d.subtitle ? d.subtitle : t('motd.warnings.error')}
                    </Markdown>
                    {d.can_user_dismiss ?
                        <Button onClick={() => setMotd(state => ([...state, d.id]))} size="small" className={classes.CloseButton}>
                            <CloseIcon fontSize="small" />
                        </Button>
                        : ""}
                </div>
            )
            return null
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