import { merge } from 'lodash-es'
import axios from '../config/axios/axios'

export default async function postDataToAPI({ route, data, config }) {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        config = merge(config, { headers: { authorization: user.token } })
    } catch (err) {
        console.log(err)
    }

    try {
        const lng = localStorage.getItem('i18nextLng')
        config = merge(config, { headers: { "accept-language": lng } })
    } catch (err) {
        console.log(err)
    }


    return await axios.post(route, data, config)
}