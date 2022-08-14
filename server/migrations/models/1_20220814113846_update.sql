-- upgrade --
CREATE TABLE IF NOT EXISTS "task" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "task" TEXT NOT NULL,
    "done" INT NOT NULL  DEFAULT 0,
    "due" TIMESTAMP NOT NULL,
    "user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
-- downgrade --
DROP TABLE IF EXISTS "task";
