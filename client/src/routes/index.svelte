<script lang="ts">
	import { fade } from 'svelte/transition';
	import TaskCreateComponent from '../components/TaskCreateComponent.svelte';
	import TaskListComponent from '../components/TaskListComponent.svelte';
</script>

<div in:fade class="flex flex-col gap-5">
	<h1 class="text-4xl font-extralight text-center">Tasks</h1>
	<TaskCreateComponent />
	<TaskListComponent />
</div>
