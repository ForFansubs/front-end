//Try reading localStorage before using it
try {
    JSON.parse(localStorage.getItem("app-settings"))
} catch (err) {
    if (err) localStorage.removeItem("app-settings")
}

//Get existing localstorage for later use
const settings = localStorage.getItem("app-settings") ? JSON.parse(localStorage.getItem("app-settings")) : {}

//Change non-nullable keys with defaults
settings.theme = settings.theme ? settings.theme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
settings.readingStyle = settings.readingStyle ? settings.readingStyle : "pagebypage"
settings.version = settings.version ? settings.version : "null"
settings["release-name"] = settings["release-name"] ? settings["release-name"] : "null"

export function handleStateChange(newState) {
    localStorage.setItem("app-settings", JSON.stringify(newState))
}

export default settings