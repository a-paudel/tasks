<script lang="ts">
	import { api } from '../utils/client';
	import { slide } from 'svelte/transition';

	let username = '';
	let password = '';
	let confirmPassword = '';
	let error = '';

	async function registerHandler() {
		error = '';
		if (password.length === 0) {
			error = 'Password is required\n';
			return;
		}
		if (password !== confirmPassword) {
			error += 'Passwords do not match\n';
			return;
		}

		let res = await api.user.registerApiUsersRegisterPost({
			username,
			password
		});
		localStorage.setItem('token', JSON.stringify(res));
		window.history.back();
	}
</script>

<form
	class="bg-base-200 p-5 rounded-lg shadow-lg flex flex-col gap-1 w-1/3"
	on:submit|preventDefault={registerHandler}
>
	<h1 class="text-3xl font-extralight text-center">Register</h1>
	<!-- error message -->
	{#if error.length > 0}
		<div class="alert alert-error" in:slide>
			<span>{error}</span>
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
	<div class="form-control">
		<label for="">Confirm Password</label>
		<input type="password" class="input input-bordered" bind:value={confirmPassword} />
	</div>

	<button class="btn btn-success mt-5">Register</button>
</form>
