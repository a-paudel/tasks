<script lang="ts">
    import { onMount } from "svelte";
    import { fade, fly, slide } from "svelte/transition";
    import { db, type ITask } from "../../data/database";
    import { nanoid } from "nanoid";

    let taskContent = "";
    let dueDateString = "";

    onMount(() => {
        dueDateString = generateDefaultDueDate();
    });

    function generateDefaultDueDate() {
        let now = new Date();
        let offset = now.getTimezoneOffset();
        let nowLocal = new Date(now.getTime() - offset * 60 * 1000);
        // add 2 days
        let dueDate = new Date(nowLocal.getTime() + 2 * 24 * 60 * 60 * 1000);
        // round to nearedt 5 mins
        dueDate.setMinutes(Math.ceil(dueDate.getMinutes() / 5) * 5);
        return dueDate.toISOString().slice(0, 16);
    }

    function resetHandler() {
        history.back();
    }

    async function submitHandler() {
        // create task here
        let due = new Date(dueDateString);

        let task: ITask = {
            id: nanoid(),
            task: taskContent,
            done: false,
            synced: false,
            due: due.toISOString(),
        };
        await db.tasks.add(task);
        history.back();
    }

    function autofocus(node: HTMLInputElement) {
        setTimeout(() => {
            node.focus();
        }, 50);
    }
</script>

<div class="background" transition:fade>
    <form
        on:reset|preventDefault={resetHandler}
        on:submit|preventDefault={submitHandler}
        class="card"
        transition:fly={{ y: -100 }}
    >
        <h1>Add Task</h1>
        <hr />
        <label>
            <strong>Task</strong>
            <!-- svelte-ignore a11y-autofocus -->
            <input
                type="text"
                use:autofocus
                bind:value={taskContent}
                enterkeyhint="next"
            />
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
