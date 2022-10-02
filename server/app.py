from fastapi import FastAPI
from api import api_router
from tortoise.contrib.fastapi import register_tortoise
from config import TORTOISE
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
app.include_router(api_router)

register_tortoise(
    app,
    config=TORTOISE,
    # generate_schemas=True,
)
