import React, { setGlobal, addReducer, useGlobal } from 'reactn'
import ReactDOM from 'react-dom'
import addReactNDevTools from 'reactn-devtools'
import { indexURL, isAdmin } from './config/api-routes'
import axios from './config/axios/axios'
import isEmpty from 'lodash-es/isEmpty'

import './index.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import getTheme from './config/theming/index'

import App from './App'
import * as serviceWorker from './serviceWorker'
import ToastNotification, { payload } from './components/toastify/toast';

//Initiate program & define version
addReactNDevTools()

//Try reading localStorage before using it
try {
    JSON.parse(localStorage.getItem("app-settings"))
} catch (err) {
    if (err) localStorage.removeItem("app-settings")
}

try {
    const user_data = JSON.parse(localStorage.getItem("user"))
    if (user_data.exp < Date.now()) {
        localStorage.removeItem("user")
    }
} catch (err) {
    if (err) localStorage.removeItem("user")
}

//Get existing localstorage for later use
const settings = localStorage.getItem("app-settings") ? JSON.parse(localStorage.getItem("app-settings")) : {}
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}

//Set global variables & reducers via reactn package
setGlobal({
    user: user ? user : {
        username: "",
        exp: null,
        avatar: "",
        token: "",
        success: false
    },
    settings,
    showModal: "",
    isAdmin: false,
    theme: settings.theme ? settings.theme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    mobile: false
})

addReducer('getOnline', (global, dispatch) => {
    axios.get(indexURL)
        .then(res => {
            dispatch.setOnline(res.data)
            if (!isEmpty(user)) {
                dispatch.checkAdmin(user.token)
            }
        })
        .catch(_ => dispatch.setOnline(false))
})

addReducer('checkMobile', (global, dispatch, navigator) => {
    // eslint-disable-next-line
    const check = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.substr(0, 4)) ? true : false
    return ({ mobile: check })
})

addReducer('setOnline', (global, dispatch, data) => {
    if (!data) return ({ online: false })
    else return ({
        online: true,
        settings: {
            ...global.settings,
            version: data.version
        }
    })
})

addReducer('loginHandler', (global, dispatch, userData) => {
    const data = {
        username: userData.username,
        exp: userData.exp,
        avatar: userData.avatar,
        token: userData.token,
        success: userData.success
    }

    dispatch.checkAdmin(userData.token)

    ToastNotification(payload("login-success", "success", ""))

    localStorage.setItem("user", JSON.stringify(data));
    return ({ user: { ...userData } })
})

addReducer('logoutHandler', (global, dispatch) => {
    localStorage.removeItem("user");

    ToastNotification(payload("logout-success", "success", ""))

    return ({
        user: {
            username: "",
            exp: null,
            avatar: "",
            token: "",
            success: false
        }
    })
})

addReducer('checkAdmin', (global, dispatch, token) => {
    const headers = {
        "Authorization": token
    }

    axios.get(isAdmin, { headers })
        .then(res => dispatch.setAdmin(true))
        .catch(_ => dispatch.setAdmin(false))
})

addReducer('setAdmin', (global, dispatch, status) => {
    return ({ isAdmin: status })
})

addReducer('setTheme', (global, dispatch, type) => {
    const settings = JSON.parse(localStorage.getItem('app-settings'))
    settings.theme = type
    localStorage.setItem('app-settings', JSON.stringify(settings))
    return ({ theme: type })
})

//If there's any changes for existing localstorage, update it here
if (!settings.theme) {
    settings.theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

localStorage.setItem("app-settings", JSON.stringify(settings))

function Mount() {
    const [theme] = useGlobal('theme')
    const themeObject = getTheme(theme)

    window.theme = themeObject

    return (
        <ThemeProvider theme={themeObject}>
            <CssBaseline>
                <App />
            </CssBaseline>
        </ThemeProvider>
    )
}

ReactDOM.render(<Mount />, document.getElementById('app-mount'))

serviceWorker.register({
    onUpdate: registration => {
        ToastNotification(payload("notification-success", "success", "Uygulamanın yeni bir sürümü var. Lütfen bu bildirime basın.", false, "reload"))

        const waitingServiceWorker = registration.waiting

        if (waitingServiceWorker) {
            waitingServiceWorker.addEventListener("statechange", event => {
                if (event.target.state === "activated") {
                    window.location.reload()
                }
            });
            waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
        }
    }
})
