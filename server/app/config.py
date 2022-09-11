import os

TORTOISE_ORM_CONFIG = {
    "connections": {
        "default": os.getenv("DATABASE_URL", "sqlite://db.sqlite3"),
    },
    "apps": {
        "models": {
            "models": [
                "app.models.users",
                "app.models.tasks",
                "aerich.models",
            ],
        }
    },
}
