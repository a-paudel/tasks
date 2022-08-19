<script>
	import { api } from '../utils/client';

	import { onMount } from 'svelte';

	import '../app.css';
	import { userStore } from '../stores';

	onMount(async () => {
		// if not on login page
		if (window.location.pathname !== '/login/') {
			// check if logged in
			try {
				let user = await api.user.checkApiUsersCheckGet();
				userStore.set(user.username);
			} catch {
				window.location.href = '/login/';
			}
		}
	});

	async function logoutHandler() {
		try {
			await api.user.logoutApiUsersLogoutGet();
			// refresh page
			window.location.reload();
		} catch {
			alert('Error logging out.');
		}
	}
</script>

<div class="flex flex-row justify-between px-2 py-2 fixed top-0 w-full">
	<span class="underline font-bold">{$userStore}</span>
	<button class="btn" on:click={logoutHandler}>Logout</button>
</div>
<div class="container mx-auto p-10 h-screen">
	<slot />
</div>
