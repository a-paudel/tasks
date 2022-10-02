from datetime import datetime

import arrow
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

    class Config:
        orm_mode = True


class TaskInput(BaseModel):
    id: str | None
    task: str
    done: bool | None
    due: datetime | None


class SyncOutput(BaseModel):
    created: list[TaskOutput]
    updated: list[TaskOutput]
    deleted: list[str]
    timestamp: float


class SyncInput(BaseModel):
    created: list[TaskInput]
    updated: list[TaskInput]
    deleted: list[str]


# ROUTER
tasks_router = APIRouter(prefix="/tasks", tags=["Task"])


# SYNC ROUTES
# pull route
@tasks_router.get(
    "/sync",
    response_model=SyncOutput,
    tags=["Sync"],
)
async def pull_tasks(
    last_fetched: float = 0, user_id: str = Depends(get_current_user_id)
):
    created_tasks = await Task.filter(
        user_id=user_id, created_at__gt=last_fetched, deleted=False
    ).all()
    updated_tasks = await Task.filter(
        user_id=user_id,
        updated_at__gt=last_fetched,
        created_at__lte=last_fetched,
        deleted=False,
    ).all()
    deleted_tasks = await Task.filter(
        user_id=user_id,
        updated_at__gt=last_fetched,
        created_at__lte=last_fetched,
        deleted=True,
    ).all()
    deleted_ids = [task.id for task in deleted_tasks]

    timestamp = arrow.utcnow().timestamp()
    return SyncOutput(
        created=[TaskOutput.from_orm(task) for task in created_tasks],
        updated=[TaskOutput.from_orm(task) for task in updated_tasks],
        deleted=deleted_ids,
        timestamp=timestamp,
    )


@tasks_router.post(
    "/sync",
    response_model=SyncOutput,
    tags=["Sync"],
)
async def push_tasks(data: SyncInput, user_id: str = Depends(get_current_user_id)):
    # Handle created tasks
    created_tasks = []
    for item in data.created:
        # check if task exists
        task_to_create = await Task.get_or_none(id=item.id, user_id=user_id)
        if not task_to_create:
            # create task
            task_to_create = await Task.create(**data.dict(exclude_unset=True))
            created_tasks.append(task_to_create)

    # Handle updated tasks
    updated_tasks = []
    for item in data.updated:
        # check if task exists
        task_to_update = await Task.get_or_none(id=item.id, user_id=user_id)
        if task_to_update:
            # update task
            task_to_update = task_to_update.update_from_dict(
                data.dict(exclude_unset=True)
            )
            await task_to_update.save()
            updated_tasks.append(task_to_update)

    # Handle deleted tasks
    deleted_tasks = []
    for task_id in data.deleted:
        # check if task exists
        task_to_delete = await Task.get_or_none(id=task_id, user_id=user_id)
        if task_to_delete:
            # delete task
            task_to_delete.deleted = True
            await task_to_delete.save()
            deleted_tasks.append(task_to_delete)

    return SyncOutput(
        created=[TaskOutput.from_orm(task) for task in created_tasks],
        updated=[TaskOutput.from_orm(task) for task in updated_tasks],
        deleted=[task.id for task in deleted_tasks],
        timestamp=arrow.utcnow().timestamp(),
    )


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
