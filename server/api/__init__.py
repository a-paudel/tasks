from fastapi import APIRouter
from .tasks import tasks_router
from .users import users_router

api_router = APIRouter(prefix="/api")
api_router.include_router(tasks_router)
api_router.include_router(users_router)
