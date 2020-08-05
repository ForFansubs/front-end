import format from 'date-fns/format'
import { useTranslation } from 'react-i18next'

export default function Format(time) {
    const { t } = useTranslation('common')

    return format(time, t('date_format'))
}