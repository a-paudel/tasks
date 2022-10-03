import os
from fastapi import FastAPI
from api import api_router
from tortoise.contrib.fastapi import register_tortoise
from config import TORTOISE
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(
    title="Tasks Api",
    description="A simple api for managing tasks",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)
app.include_router(api_router)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


gen = os.getenv("GENERATE_SCHEMAS")

register_tortoise(
    app,
    config=TORTOISE,
    generate_schemas=True if gen else False,
)
