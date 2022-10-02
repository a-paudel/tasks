<script lang="ts">
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { db, type ITask } from "../../../data/database";
    import { page } from "$app/stores";

    let id = $page.params.id;
    let task: ITask | undefined;
    let dueDateString = "";

    onMount(async () => {
        task = await db.tasks.get(id);
        let due = new Date(task?.due || 0);
        let offset = due.getTimezoneOffset();
        let dueLocal = new Date(due.getTime() - offset * 60 * 1000);
        dueDateString = dueLocal.toISOString().slice(0, 16);
    });

    function resetHandler() {
        history.back();
    }

    async function submitHandler() {
        if (task) {
            let due = new Date(dueDateString);
            task.due = due.toISOString();
            task.synced = false;
            await db.tasks.update(task.id, task);
            history.back();
        }
    }
</script>

<!-- content here -->
<div class="background" transition:fade>
    {#if task}
        <form
            on:reset|preventDefault={resetHandler}
            on:submit|preventDefault={submitHandler}
            class="card"
            transition:fly={{ y: -100 }}
        >
            <h1>Edit Task</h1>
            <hr />
            <label>
                <strong>Task</strong>
                <!-- svelte-ignore a11y-autofocus -->
                <input type="text" autofocus bind:value={task.task} />
            </label>
            <label>
                <strong>Due</strong>
                <input type="datetime-local" bind:value={dueDateString} />
            </label>
            <br />
            <div class="row">
                <button class="col" type="reset">Cancel</button>
                <button class="col" type="submit">Add</button>
            </div>
        </form>
    {:else}
        <div class="card text-center">
            <header>
                <h1>Task not found</h1>
            </header>
            <hr />
            <div class="row">
                <button on:click={resetHandler} class="col">Back</button>
            </div>
        </div>
    {/if}
</div>

<style>
    .background {
        background-color: #3f3f3f;
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 5rem;
        z-index: 100;
    }
</style>
