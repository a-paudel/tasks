<script lang="ts">
    import { goto } from "$app/navigation";
    import { URLS } from "../api";

    let username = "";
    let password = "";
    let confirmPassword = "";

    async function registerHandler() {
        // make sure password is strong
        if (password.trim().length === 0) {
            alert("Password cannot be empty");
            return;
        }

        // make sure passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        let body = new FormData();
        body.append("username", username);
        body.append("password", password);

        let resp = await fetch(URLS.register, {
            method: "POST",
            body: body,
        });

        if (resp.ok) {
            alert("Registration successful");

            // login
            let loginResp = await fetch(URLS.login, {
                method: "POST",
                body: body,
            });

            if (loginResp.ok) {
                let data = await loginResp.json();
                localStorage.setItem("accessToken", data.access_token);
                localStorage.setItem("refreshToken", data.refresh_token);
                // go back
                let ref = document.referrer;
                await goto(ref.length > 0 ? ref : "/", { replaceState: true });
                // reload
                location.reload();
                return;
            } else {
                alert("Login failed. Please try to manually login.");
                // reload
                location.reload();
                return;
            }
        } else {
            alert("Registration failed. Please try again.");
        }
    }
</script>

<div class="card">
    <header>
        <h2>Register</h2>
    </header>
    <hr />
    <form on:submit|preventDefault={registerHandler}>
        <label>
            <strong>Username</strong>
            <input type="text" bind:value={username} />
        </label>
        <label>
            <strong>Password</strong>
            <input type="password" bind:value={password} />
        </label>
        <label>
            <strong>Confirm Password</strong>
            <input type="password" bind:value={confirmPassword} />
        </label>
        <br />
        <button class="is-full-width" type="submit">Register</button>
    </form>
</div>

<style>
    .card {
        padding: 3rem;
    }
</style>
