from fastapi import FastAPI
from api import api_router
from tortoise.contrib.fastapi import register_tortoise
from config import TORTOISE
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_tortoise(
    app,
    config=TORTOISE,
    # generate_schemas=True,
)
