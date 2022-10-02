const BASE_URL = "http://localhost:8000/api"

export const URLS = {
    base: BASE_URL,
    tasks_sync: BASE_URL + "/tasks/sync",
    login: BASE_URL + "/users/login",
    register: BASE_URL + "/users/register",
    refresh_token: BASE_URL + "/users/refresh",
    logout: BASE_URL + "/users/logout",
    logout_all: BASE_URL + "/users/logout/all",
}