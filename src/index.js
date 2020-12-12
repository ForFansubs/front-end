// Importing polyfills at the top
import './config/polyfills'
import './config/i18n'
import './index.scss'

import { StrictMode, useState, Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import getTheme from './config/theming/index'

import { initNewLanguage } from './config/initNewLanguage'

import { indexURL } from './config/api-routes'
import getDataFromAPI from './helpers/getDataFromAPI'

import defaultSettings, { handleStateChange as handleSettingsStateChange } from './config/localStorage/settings'
import defaultUser, { handleStateChange as handleUserStateChange } from './config/localStorage/user'
import defaultMotd, { handleStateChange as handleMotdStateChange } from './config/localStorage/motd'
import SettingsContext from './contexts/settings.context'
import UserContext from './contexts/user.context';
import SiteStatusContext from './contexts/site_status.context'
import MotdContext from './contexts/motd.context'

function Mount() {
    const [motd, setMotd] = useState(defaultMotd)
    const [settings, setSettings] = useState(defaultSettings)
    const [user, setUser] = useState(defaultUser)
    const [siteStatus, setSiteStatus] = useState({ loading: true, status: false })

    useEffect(() => {
        handleSettingsStateChange(settings)
    }, [settings])

    useEffect(() => {
        handleUserStateChange(user)
    }, [user])

    useEffect(() => {
        handleMotdStateChange(motd)
    }, [motd])

    useEffect(() => {
        getDataFromAPI({ route: indexURL }).then(res => {
            if (res.status === 200) {
                setSiteStatus({ loading: false, status: true })
                setSettings(state => ({ ...state, version: res.data.version, "release-name": res.data["release-name"] }))
                setUser(state => ({ ...state, admin: res.data.admin }))
            }
        }).catch(_ => {
            setSiteStatus({ loading: false, status: false })
        })
    }, [user.token])

    useEffect(() => {
        initNewLanguage(localStorage.getItem('i18nextLng') || "en")
    }, [])

    const themeObject = getTheme(settings.theme)
    window.theme = themeObject

    return (
        <StrictMode>
            <SiteStatusContext.Provider value={[siteStatus, setSiteStatus]}>
                <SettingsContext.Provider value={[settings, setSettings]}>
                    <UserContext.Provider value={[user, setUser]}>
                        <MotdContext.Provider value={[motd, setMotd]}>
                            <SnackbarProvider maxSnack={3}>
                                <ThemeProvider theme={themeObject}>
                                    <CssBaseline />
                                    <Suspense fallback={<></>}>
                                        <App />
                                    </Suspense>
                                </ThemeProvider>
                            </SnackbarProvider>
                        </MotdContext.Provider>
                    </UserContext.Provider>
                </SettingsContext.Provider>
            </SiteStatusContext.Provider>
        </StrictMode>
    )
}

ReactDOM.render(<Mount />, document.getElementById('app-mount'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
if (process.env.REACT_APP_USE_SERVICE_WORKER === "true") {
    serviceWorkerRegistration.register({
        onUpdate: function onUpdateHandler(registration) {
            const waitingServiceWorker = registration.waiting

            const payload = {
                container: "notification-success",
                type: "success",
                autoClose: false,
                onClickFunction: () => {
                    waitingServiceWorker.postMessage({ type: "SKIP_WAITING" })
                    window.location.reload()
                },
                message: "Uygulamanın yeni bir sürümü var. Güncellemek için bu bildirime basın."
            }

            //ToastNotification(payload)
        }
    })
}
