try {
    JSON.parse(localStorage.getItem("motd"))
} catch (err) {
    if (err) localStorage.removeItem("motd")
}

const motd = localStorage.getItem("motd") ? JSON.parse(localStorage.getItem("motd")) : []

export function handleStateChange(newState) {
    localStorage.setItem("motd", JSON.stringify(newState))
}

export default motd