import { TaskApi, UserApi, type ApiResponse } from "../client";

export const api = {
    task: new TaskApi(),
    user: new UserApi(),
}