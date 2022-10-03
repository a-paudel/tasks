<script lang="ts">
    import { goto } from "$app/navigation";
    import { URLS } from "../api";
    import { accessTokenStorage } from "../api/tokens";

    let username = "";
    let password = "";

    async function loginHandler() {
        let body = new FormData();
        body.append("username", username);
        body.append("password", password);

        let resp = await fetch(URLS.login, {
            method: "POST",
            body: body,
        });
        if (resp.ok) {
            let data = await resp.json();
            accessTokenStorage.set(data.access_token);
            // localStorage.setItem("refreshToken", data.refresh_token);
            // go back
            let ref = document.referrer;
            await goto(ref.length > 0 ? ref : "/", { replaceState: true });
            // reload
            location.reload();
            return;
        }
        console.error("Login failed", await resp.json());
    }
</script>

<div class="card">
    <header>
        <h2>Login</h2>
    </header>
    <hr />
    <form on:submit|preventDefault={loginHandler}>
        <label>
            <strong>Username</strong>
            <input type="text" bind:value={username} />
        </label>
        <label>
            <strong>Password</strong>
            <input type="password" bind:value={password} />
        </label>
        <br />
        <button class="is-full-width" type="submit">Login</button>
    </form>
</div>

<style>
    .card {
        padding: 3rem;
    }
</style>
