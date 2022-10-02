import Dexie, { type Table } from 'dexie';

export interface ITask {
    // "created_at": "2022-10-02T19:22:03.715Z",
    // "updated_at": "2022-10-02T19:22:03.715Z",
    // "id": "string",
    // "task": "string",
    // "done": true,
    // "due": "2022-10-02T19:22:03.715Z"

    id: string
    synced: boolean
    created_at?: string
    updated_at?: string
    task: string
    done: boolean
    due: string
}

export class MySubClassedDexie extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    tasks!: Table<ITask>;

    constructor() {
        super('myDatabase');
        this.version(1).stores({
            tasks: '&id, done' // Primary key and indexed props
        });
    }
}

export const db = new MySubClassedDexie();
