<script lang="ts">
	import { onMount } from 'svelte';
	import type { TaskOutput } from '../client';
	import { taskListStore } from '../stores';
	import { api } from '../utils/client';
	import { slide, crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	const [send, receive] = crossfade({ duration: 500 });

	onMount(async () => {
		let res = await api.task.listTasksApiTasksGet();
		if (res.length > 0) {
			taskListStore.set(res);
		}
	});

	// sort by done
	$: $taskListStore.sort((a, b) => {
		if (a.done === b.done) {
			return b.id - a.id;
		}
		return a.done ? 1 : -1;
	});

	async function toggleTaskHandler(task: TaskOutput) {
		try {
			await api.task.updateTaskApiTasksIdPut({
				id: task.id,
				taskUpdateInput: {
					done: !task.done
				}
			});
			taskListStore.update((taskList) =>
				taskList.map((t) => (t.id === task.id ? { ...t, done: !task.done } : t))
			);
		} catch {
			alert('Error toggling task.');
		}
	}

	async function deleteTaskHandler(task: TaskOutput) {
		try {
			await api.task.deleteTaskApiTasksIdDelete({
				id: task.id
			});
			taskListStore.update((taskList) => {
				return taskList.filter((t) => t.id !== task.id);
			});
		} catch {
			alert('Error deleting task.');
		}
	}
</script>

{#each $taskListStore as task (task.id)}
	<div
		class="card bg-base-200 flex flex-row items-center px-5"
		in:receive={{ key: task.id }}
		out:send={{ key: task.id }}
		animate:flip={{ duration: 500 }}
	>
		<!-- checkbox -->
		<input
			type="checkbox"
			class="checkbox"
			bind:checked={task.done}
			on:click|preventDefault={() => toggleTaskHandler(task)}
		/>

		<div class="card-body">
			<div class="card-title" class:line-through={task.done}>
				<h2>{task.task}</h2>
			</div>
		</div>

		<!-- buttons -->
		<div class="btn bg-red-800" on:click={() => deleteTaskHandler(task)}>Delete</div>
	</div>
{/each}
