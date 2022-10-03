<script lang="ts">
    import { browser } from "$app/environment";
    import { liveQuery } from "dexie";
    import { accessTokenStorage } from "../api/tokens";
    import TaskCardComponent from "../components/TaskCardComponent.svelte";
    import { db, type ITask } from "../data/database";

    const taskListQuery = liveQuery(() => (browser ? db.tasks.toArray() : []));
    let taskList: ITask[] = [];
    taskListQuery.subscribe((tasks) => {
        tasks.sort(
            (a, b) => new Date(a.due).valueOf() - new Date(b.due).valueOf()
        );
        taskList = tasks;
    });

    async function logoutHandler() {
        localStorage.clear();
        accessTokenStorage.set(null);
        // reload
        location.reload();
    }
</script>

<h1>
    Tasks
    <a href="/create" class="primary button pull-right">Add Task</a>
</h1>
<hr />

{#each taskList as task}
    <TaskCardComponent {task} />
{:else}
    <div class="card">
        <header>
            <h3 class="text-center text-grey">No tasks found</h3>
        </header>
    </div>
{/each}
<button class="logout-button" on:click={logoutHandler}>Logout</button>

<style>
    .logout-button {
        position: fixed;
        bottom: 1rem;
        left: 1rem;
    }
</style>
