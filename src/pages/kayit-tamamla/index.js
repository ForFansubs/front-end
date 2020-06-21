import React, { useEffect, useState } from 'react'
import axios from '../../config/axios/axios'
import { getRegisterDone } from '../../config/api-routes'
import { Typography, Button } from '@material-ui/core'

export default function KayitTamamla(props) {
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const hash = props.match.params.hash

        const fetchData = async () => {
            const res = await axios(
                getRegisterDone(hash)
            )

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

    function handleHashRefresh() {

    }

    return (
        <>
            <Typography variant="h3">
                {!loading && !refresh && !error ?
                    "Kayıt başarıyla tamamlandı." :
                    !loading && refresh && !error ?
                        <>
                            Bu linkin süresi dolmuş. Yenisini istemek için lütfen aşağıdaki butona bas.
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