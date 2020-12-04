try {
    const user_data = JSON.parse(localStorage.getItem("user"))
    if (user_data.exp < Date.now()) {
        localStorage.removeItem("user")
    }
} catch (err) {
    if (err) localStorage.removeItem("user")
}

const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}

export function handleStateChange(newState) {
    localStorage.setItem("user", JSON.stringify(newState))
}

export default user