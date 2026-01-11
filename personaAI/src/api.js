const API_BASE = "http://localhost:3000"

export const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token")

const headers = {
    "Content-Type": "application/json",
    ...options.headers,
}

if (token) {
    headers.Authorization = `Bearer ${token}`
}

const res = await fetch (`${API_BASE}${url}`,{
    ...options,
    headers,
    signal: options.signal,
})
    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message || "API Error")
    }

    return data
}