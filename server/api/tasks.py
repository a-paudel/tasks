from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from models import Task
from api.users import get_current_user_id


# SCHEMAS
class TaskOutput(BaseModel):
    """Task output schema."""

    id: str
    created_at: datetime
    updated_at: datetime
    task: str
    done: bool
    due: datetime


class TaskInput(BaseModel):
    id: str | None
    task: str
    done: bool | None
    due: datetime | None


class SyncOutput(BaseModel):
    created: list[TaskOutput]
    updated: list[TaskOutput]
    deleted: list[str]


class SyncInput(BaseModel):
    created: list[TaskInput]
    updated: list[TaskInput]
    deleted: list[str]


# ROUTER
tasks_router = APIRouter(prefix="/tasks", tags=["Task"])


# SYNC ROUTES
@tasks_router.get(
    "/sync",
    response_model=SyncOutput,
    tags=["Sync"],
)
async def pull_tasks(
    last_fetched: float = 0, user_id: str = Depends(get_current_user_id)
):
    pass


# ROUTES
# task list
@tasks_router.get(
    "/",
    response_model=list[TaskOutput],
)
async def task_list(user_id: str = Depends(get_current_user_id)):
    tasks = await Task.filter(user_id=user_id).all()
    return tasks


# task create
@tasks_router.post(
    "/",
    response_model=TaskOutput,
    status_code=201,
)
async def task_create(data: TaskInput, user_id: str = Depends(get_current_user_id)):
    task = await Task.create(**data.dict(exclude_unset=True), user_id=user_id)
    return task


# task detail
@tasks_router.get(
    "/{task_id}",
    response_model=TaskOutput,
)
async def task_detail(task_id: str, user_id: str = Depends(get_current_user_id)):
    task = await Task.get_or_none(id=task_id, user_id=user_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


# task update
@tasks_router.put(
    "/{task_id}",
    response_model=TaskOutput,
)
async def task_update(
    task_id: str, data: TaskInput, user_id: str = Depends(get_current_user_id)
):
    task = await Task.get_or_none(id=task_id, user_id=user_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task = task.update_from_dict(data.dict(exclude_unset=True))
    await task.save()
    return task


# task delete
@tasks_router.delete(
    "/{task_id}",
    response_model=None,
    status_code=204,
)
async def task_delete(task_id: str, user_id: str = Depends(get_current_user_id)):
    task = await Task.get_or_none(id=task_id, user_id=user_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.deleted = True
    await task.save()
    return
