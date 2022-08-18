<script lang="ts">
	import { api } from '../utils/client';
	import { fade } from 'svelte/transition';

	let username = '';
	let password = '';
	let error = '';

	async function loginHandler() {
		error = '';
		if (password.length === 0) {
			error = 'Password is required\n';
			return;
		}
		try {
			let res = await api.user.loginApiUsersLoginPost({
				username,
				password
			});

			localStorage.setItem('token', JSON.stringify(res));
			window.history.back();
		} catch {
			error += 'Invalid username or password\n';
		}
	}
</script>

<form
	class="bg-base-200 p-5 rounded-lg shadow-lg flex flex-col gap-1 w-1/3"
	on:submit|preventDefault={loginHandler}
	in:fade
>
	<h1 class="text-3xl font-extralight text-center">Login</h1>
	{#if error.length > 0}
		<div class="alert alert-error">
			<span>
				{error}
			</span>
		</div>
	{/if}

	<div class="form-control">
		<label for="">Username</label>
		<input type="text" class="input input-bordered" bind:value={username} />
	</div>
	<div class="form-control">
		<label for="">Password</label>
		<input type="password" class="input input-bordered" bind:value={password} />
	</div>
	<button class="btn btn-success mt-5">Login</button>
</form>
