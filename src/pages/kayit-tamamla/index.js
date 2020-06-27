import React, { useEffect, useState } from 'react'
import axios from '../../config/axios/axios'
import { getRegisterDone, getRegisterRefresh } from '../../config/api-routes'
import { Typography, Button } from '@material-ui/core'

export default function KayitTamamla(props) {
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [getNewHash, setGetNewHash] = useState(false)

    useEffect(() => {
        const hash = props.match.params.hash

        const fetchData = async () => {
            const body = {
                hash: hash
            }

            const res = await axios.post(getRegisterDone, body).catch(res => res)

            if (res.status === 200) {
                switch (res.data.success) {
                    case "success": {
                        setLoading(false)
                        break
                    }
                    case "refresh": {
                        setRefresh(true)
                        setLoading(false)
                        break
                    }
                    default: {
                        setError(true)
                        setLoading(false)
                        break
                    }
                }
            }
            else {
                setError(true)
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    async function handleHashRefresh() {
        const body = {
            old_hash: props.match.params.hash
        }

        const res = await axios.post(getRegisterRefresh, body).catch(res => res)

        if (res.status === 200) {
            setGetNewHash(true)
        }

        else {
            setError(true)
        }
    }

    return (
        <>
            <Typography variant="h3">
                {!loading && !refresh && !error ?
                    "Kayıt başarıyla tamamlandı." :
                    !loading && refresh && !error ?
                        getNewHash ?
                            <>
                                Yeni link mailinize gönderildi.
                            </>
                            :
                            <>
                                Bu linkin süresi dolmuş. Yenisini istemek için lütfen aşağıdaki butona basın.
                                <Button variant="outlined" onClick={handleHashRefresh}>
                                    Linki tekrar yolla
                                </Button>
                            </> :
                        !loading && error ?
                            "İşleminizi tamamlarken bir sorunla karşılaştık." :
                            "Kaydınız tamamlanıyor..."}
            </Typography>
        </>
    )
}