<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { db, type ITask } from "../../../data/database";

    let id = $page.params.id;

    let task: ITask | null;
    onMount(async () => {
        task = (await db.tasks.get(id)) || null;
    });

    function cancelHandler() {
        history.back();
    }

    async function deleteHandler() {
        // delete task
        await db.tasks.delete(id);
        let deletedTaskIds: string[] = JSON.parse(
            localStorage.getItem("deletedTaskIds") || "[]"
        );
        deletedTaskIds.push(id);
        localStorage.setItem("deletedTaskIds", JSON.stringify(deletedTaskIds));
        history.back();
    }
</script>

<div class="background" transition:fade>
    <div class="card text-center" transition:fly={{ y: -100 }}>
        <header>
            <h2>{task?.task}</h2>
        </header>
        <h3>Are you sure you want to delete this task?</h3>
        <br />
        <div class="row">
            <button class="col" on:click={cancelHandler}>Cancel</button>
            <button class="col error button" on:click={deleteHandler}>
                Delete
            </button>
        </div>
    </div>
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
