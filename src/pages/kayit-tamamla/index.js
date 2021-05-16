import { useEffect, useState } from 'react'
import { getRegisterDone, getRegisterRefresh } from '../../config/api-routes'
import { Typography, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import postDataToAPI from '../../helpers/postDataToAPI'

export default function KayitTamamla(props) {
    const { t } = useTranslation('pages')
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [getNewHash, setGetNewHash] = useState(false)

    useEffect(() => {
        const hash = props.match.params.hash

        const fetchData = async () => {
            const res = await postDataToAPI({ route: getRegisterDone, data: { hash } }).catch(res => res)

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
        const res = await postDataToAPI({ route: getRegisterRefresh, data: { old_hash: props.match.params.hash } }).catch(res => res)

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
                    t('complete_registration.warnings.successful') :
                    !loading && refresh && !error ?
                        getNewHash ?
                            <>
                                {t('complete_registration.warnings.resend_confirmation_email_successful')}
                            </>
                            :
                            <>
                                {t('complete_registration.warnings.link_expired')}
                                <Button variant="outlined" onClick={handleHashRefresh}>
                                    {t('complete_registration.warnings.resend_confirmation_email')}
                                </Button>
                            </> :
                        !loading && error ?
                            t('complete_registration.warnings.error') :
                            t('complete_registration.warnings.loading')
                }
            </Typography>
        </>
    )
}