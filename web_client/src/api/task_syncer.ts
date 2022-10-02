import { browser } from "$app/environment";
import { liveQuery } from "dexie";
import { db, type ITask } from "../data/database";
import { URLS } from ".";
import { getHeaders } from "./tokens";


async function implementChanges(created: ITask[], updated: ITask[], deleted: string[]) {
    let createdAndUpdated = created.concat(updated);

    for (const taskToCreate of createdAndUpdated) {
        taskToCreate.synced = true;
        await db.tasks.put(taskToCreate);
    }

    for (const taskToDelete of deleted) {
        let deletedTaskIds: string[] = JSON.parse(localStorage.getItem("deletedTaskIds") || "[]");

        await db.tasks.delete(taskToDelete);
        // remove id from array
        deletedTaskIds = deletedTaskIds.filter(id => id !== taskToDelete);

        // save to local storage
        localStorage.setItem("deletedTaskIds", JSON.stringify(deletedTaskIds));
    }
}

async function pullTasks() {
    let lastPulled = parseFloat(localStorage.getItem("lastPulled") || "0");
    let url = URLS.tasks_sync + "?last_pulled=" + lastPulled;
    let response = await fetch(url, { headers: await getHeaders() });

    if (response.ok) {
        let json = await response.json();

        let created: ITask[] = json.created;
        let updated: ITask[] = json.updated;
        let deleted: string[] = json.deleted;
        let newLastPulled: number = parseFloat(json.timestamp);

        if (created.length > 0 || updated.length > 0 || deleted.length > 0) {
            await implementChanges(created, updated, deleted);
            localStorage.setItem("lastPulled", newLastPulled.toString());
        }

    }

}


async function pushTasks() {
    // created tasks
    let created = await db.tasks.filter(task => {
        let isSynced = task.synced;
        let isCreated = task.created_at === undefined;
        return !isSynced && isCreated;
    }).toArray();

    // updated tasks
    let updated = await db.tasks.filter(task => {
        let isSynced = task.synced;
        let isCreated = task.created_at === undefined;
        return !isSynced && !isCreated;
    }).toArray();



    // deleted tasks
    let deletedTaskIds: string[] = JSON.parse(localStorage.getItem("deletedTaskIds") || "[]");

    if (created.length > 0 || updated.length > 0 || deletedTaskIds.length > 0) {
        let body = {
            created: created,
            updated: updated,
            deleted: deletedTaskIds
        }

        // send request
        let response = await fetch(URLS.tasks_sync, {
            method: "POST",
            headers: await getHeaders(),
            body: JSON.stringify(body)
        });

        if (response.ok) {
            let json = await response.json();

            let createdFromServer: ITask[] = json.created;
            let updatedFromServer: ITask[] = json.updated;
            let deletedFromServer: string[] = json.deleted;

            await implementChanges(createdFromServer, updatedFromServer, deletedFromServer);
        }

    }

}


export async function syncTasks() {

    await pullTasks();

    // watch db and push
    let tasksQuery = liveQuery(() => db.tasks.toArray());

    tasksQuery.subscribe(async (_) => {
        await pushTasks();
    });


    setInterval(async () => {
        await pullTasks();
        await pushTasks();
    }, 10_000);

}