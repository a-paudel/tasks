import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from api import api_router
from tortoise.contrib.fastapi import register_tortoise
from config import TORTOISE
from dotenv import load_dotenv
from pathlib import Path
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


# serve static files
@app.get("/{file_path:path}")
def serve_web_client(file_path: str):
    base_path = Path(__file__).parent.parent / "web_client" / "dist"
    # check if file exists
    requested_path = base_path / file_path
    headers = {
        # set cache max age 7 days
        "Cache-Control": "max-age=604800",
    }

    if requested_path.exists() and requested_path.is_file():
        return FileResponse(requested_path, headers=headers)
    # check if directory and index.html exists
    index_path = requested_path / "index.html"
    if index_path.exists() and index_path.is_file():
        return FileResponse(index_path, headers=headers)
    raise HTTPException(status_code=404, detail="Not Found")


gen = os.getenv("GENERATE_SCHEMAS")

register_tortoise(
    app,
    config=TORTOISE,
    generate_schemas=True if gen else False,
)
