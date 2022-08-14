from fastapi import FastAPI
from fastapi.routing import APIRouter
from starlette.middleware.authentication import AuthenticationMiddleware
from tortoise.contrib.fastapi import register_tortoise
from app.middlewares.authentication import TokenAuthentication
from app.routes.users import router as users_router
from app.config import TORTOISE_ORM_CONFIG

app = FastAPI()

# middleware
app.add_middleware(AuthenticationMiddleware, backend=TokenAuthentication())


# routes
api = APIRouter(prefix="/api")
api.include_router(users_router)


app.include_router(api)

# database
register_tortoise(
    app,
    config=TORTOISE_ORM_CONFIG,
)
