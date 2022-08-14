from fastapi.routing import APIRouter
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from starlette.authentication import requires
from app.models.tasks import Task, TaskCreateInput, TaskOutput, TaskUpdateInput
from ..models.users import User

router = APIRouter(prefix="/tasks", tags=["Task"])

# task list
@router.get("/", response_model=list[TaskOutput])
@requires("authenticated")
async def list_tasks(request: Request):
    user:User = request.user
    tasks = await Task.filter(user = user).all()
    return tasks

# task create
@router.post("/", response_model=TaskOutput, status_code=201)
@requires("authenticated")
async def create_task(request: Request, data: TaskCreateInput):
    user:User = request.user
    task = await Task.create(user=user, **data.dict(exclude_unset=True))
    return task


# task detail
@router.get("/{id}", response_model=TaskOutput, responses={404: {}})
@requires("authenticated")
async def get_task(request: Request, id: int):
    user:User = request.user
    task = await Task.filter(user=user, id=id).first()
    if not task:
        return JSONResponse(status_code=404, content={"detail": "Task not found"})
    return task


# task update
@router.put("/{id}", response_model=TaskOutput, responses={404: {}})
@requires("authenticated")
async def update_task(request: Request, id: int, data: TaskUpdateInput):
    user:User = request.user
    task = await Task.filter(id=id, user=user).first()
    if not task:
        return JSONResponse(status_code=404, content={"detail": "Task not found"})
    task = task.update_from_dict(data.dict(exclude_unset=True))
    await task.save()
    return task


# task delete
@router.delete("/{id}", status_code=204, responses={404: {}})
@requires("authenticated")
async def delete_task(request: Request, id: int):
    user:User = request.user
    task = await Task.filter(id=id, user=user).first()
    if not task:
        return JSONResponse(status_code=404, content={"detail": "Task not found"})
    await task.delete()
    return
