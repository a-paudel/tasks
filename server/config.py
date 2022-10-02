import dotenv
import os

dotenv.load_dotenv()

TORTOISE = {
    # "connections": {"default": "sqlite://db.sqlite3"},
    "connections": {"default": os.getenv("DATABASE_URL")},
    "apps": {
        "models": {
            "models": [
                "models",
                "aerich.models",
            ],
            "default_connection": "default",
        },
    },
}
