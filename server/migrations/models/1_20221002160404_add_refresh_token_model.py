from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "refreshtoken" (
    "refresh_token" VARCHAR(255) NOT NULL  PRIMARY KEY,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "user_id" VARCHAR(21) NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP TABLE IF EXISTS "refreshtoken";"""
