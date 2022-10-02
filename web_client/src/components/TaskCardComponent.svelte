<script lang="ts">
    import { db, type ITask } from "../data/database";

    export let task: ITask;

    function toggleDone() {
        task.done = !task.done;
        task.synced = false;
        db.tasks.update(task.id, task);
    }

    function formatDate(dateString: string) {
        // convert to yyyy-mm-dd HH:MM
        let date = new Date(dateString);
        // zero padded
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let hour = ("0" + date.getHours()).slice(-2);
        let minutes = ("0" + date.getMinutes()).slice(-2);
        return `${year}/${month}/${day} ${hour}:${minutes}`;
    }
</script>

<div class="card">
    <header>
        <h3 class:done={task.done}>
            <input
                type="checkbox"
                bind:checked={task.done}
                on:click|preventDefault={toggleDone}
            />
            {task.task}
            <div class="pull-right">
                <a href="/update/{task.id}" class="button"> Edit </a>
                <a href="/delete/{task.id}" class="error button"> Delete </a>
            </div>
        </h3>
    </header>
    <p class="text-grey">Due by: {formatDate(task.due)}</p>
</div>

<style>
    .done {
        text-decoration: line-through;
        color: gray;
    }

    input[type="checkbox"] {
        margin-right: 1rem;
        accent-color: grey;
    }

    .card {
        margin-bottom: 1.5rem;
    }
</style>
