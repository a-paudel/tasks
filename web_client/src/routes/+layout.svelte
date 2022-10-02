<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { syncTasks } from "../api/task_syncer";

    onMount(() => {
        syncTasks();
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/chota@latest" />
</svelte:head>

<div class="container">
    <slot />
</div>
