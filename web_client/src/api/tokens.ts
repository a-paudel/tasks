import { goto } from "$app/navigation";
import * as jose from "jose"
import { db } from "../data/database";
import { URLS } from ".";


async function getAccessToken() {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        let payload = jose.decodeJwt(accessToken);
        let expDate = new Date(payload.exp! * 1000);
        let now = new Date();
        let expired = expDate < now;
        if (!expired) {
            return accessToken;
        }
        // use refresh token
    }
    // use refresh token

    // no access token so try to use refresh token
    // refresh token
    let refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
        // use refresh token to get new access token
        let response = await fetch(URLS.refresh_token, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh_token: refreshToken,
            }),
        });
        if (response.ok) {
            let data: { access_token: string } = await response.json();
            localStorage.setItem("accessToken", data.access_token);
            return data.access_token;
        }
    }
    // refresh token not found, so delete all tokens and go to login page
    localStorage.removeItem("refreshToken");
    // also delete database
    await db.delete();
    await db.open();
    // goto login if not already there
    if (window.location.pathname !== "/login") {
        await goto("/login");
    }
    // throw new Error("Not logged in");
    // done
}

export async function getHeaders() {
    let accessToken = await getAccessToken();
    return {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json",
    }
}
