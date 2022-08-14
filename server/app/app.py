from fastapi import FastAPI
from fastapi.routing import APIRouter
from starlette.middleware.authentication import AuthenticationMiddleware
from tortoise.contrib.fastapi import register_tortoise
from app.middlewares.authentication import TokenAuthentication
from app.routes.users import router as users_router
from app.routes.tasks import router as tasks_router
from app.config import TORTOISE_ORM_CONFIG

app = FastAPI(
    openapi_url="/api/openapi.json",
    docs_url="/api/docs",
    redoc_url=None,
    title="Tasks API",
)

# middleware
app.add_middleware(AuthenticationMiddleware, backend=TokenAuthentication())


# routes
api = APIRouter(prefix="/api")
api.include_router(users_router)
api.include_router(tasks_router)


app.include_router(api)

# database
register_tortoise(
    app,
    config=TORTOISE_ORM_CONFIG,
    generate_schemas=True,
)
