from fastapi.routing import APIRouter
from fastapi.responses import JSONResponse
from app.models.tasks import Task, TaskCreateInput, TaskOutput, TaskUpdateInput
from ..models.users import User
from app.middlewares.authentication import get_current_user
from fastapi import Depends

router = APIRouter(prefix="/tasks", tags=["Task"])

# task list
@router.get("/", response_model=list[TaskOutput], responses={401: {}})
async def list_tasks(user: User = Depends(get_current_user)):
    if user:
        tasks = await Task.filter(user=user).all()
        return tasks


# task create
@router.post("/", response_model=TaskOutput, status_code=201, responses={401: {}})
async def create_task(data: TaskCreateInput, user: User = Depends(get_current_user)):
    task = await Task.create(user=user, **data.dict(exclude_unset=True))
    return task


# task detail
@router.get("/{id}", response_model=TaskOutput, responses={404: {}, 401: {}})
async def get_task(id: int, user: User = Depends(get_current_user)):
    task = await Task.filter(user=user, id=id).first()
    if not task:
        return JSONResponse(status_code=404, content={"detail": "Task not found"})
    return task


# task update
@router.put("/{id}", response_model=TaskOutput, responses={404: {}, 401: {}})
async def update_task(
    id: int, data: TaskUpdateInput, user: User = Depends(get_current_user)
):
    task = await Task.filter(id=id, user=user).first()
    if not task:
        return JSONResponse(status_code=404, content={"detail": "Task not found"})
    task = task.update_from_dict(data.dict(exclude_unset=True))
    await task.save()
    return task


# task delete
@router.delete("/{id}", status_code=204, responses={404: {}, 401: {}})
async def delete_task(id: int, user: User = Depends(get_current_user)):
    task = await Task.filter(id=id, user=user).first()
    if not task:
        return JSONResponse(status_code=404, content={"detail": "Task not found"})
    await task.delete()
    return
