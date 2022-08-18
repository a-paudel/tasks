<script lang="ts">
	import { taskListStore } from '../stores';

	import { api } from '../utils/client';

	let taskContent = '';

	async function submitHandler() {
		if (taskContent.length > 0) {
			try {
				let newTask = await api.task.createTaskApiTasksPost({
					taskCreateInput: {
						task: taskContent
					}
				});
				taskListStore.update((taskList) => {
					return [...taskList, newTask];
				});
				taskContent = '';
			} catch {
				alert('Error adding task.');
			}
		}
	}
</script>

<form on:submit|preventDefault={submitHandler}>
	<input
		type="text"
		class="input input-bordered w-full"
		placeholder="New Task..."
		bind:value={taskContent}
	/>
</form>
