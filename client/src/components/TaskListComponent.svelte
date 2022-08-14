<script lang="ts">
	import { onMount } from 'svelte';

	import { TaskApi, type TaskOutput } from '../utils/apiclient';

	let taskList: TaskOutput[] = [];
	let client = new TaskApi();

	onMount(async () => {
		taskList = await client.listTasksApiTasksGet();
	});
</script>
