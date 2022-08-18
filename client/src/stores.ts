import { writable } from "svelte/store";
import type { TaskOutput } from "./client";

export const taskListStore = writable<TaskOutput[]>([]);

export const userStore = writable<string>("");