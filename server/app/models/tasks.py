from email.policy import default
from tortoise import models, fields
from pydantic import BaseModel
from datetime import datetime
import arrow


# task model
class Task(models.Model):
    @staticmethod
    def generate_due_date():
        # return 2 days from now
        return arrow.utcnow().shift(days=2).datetime

    id: int = fields.IntField(pk=True)
    task: str = fields.TextField()
    done: bool = fields.BooleanField(default=False)
    due: datetime = fields.DatetimeField(default=generate_due_date)
    user = fields.ForeignKeyField(
        "models.User", related_name="tasks", on_delete=fields.CASCADE
    )


# schema
class TaskOutput(BaseModel):
    id: int
    task: str
    done: bool
    due: datetime


class TaskCreateInput(BaseModel):
    task: str
    done: bool | None
    due: datetime | None


class TaskUpdateInput(BaseModel):
    task: str | None
    done: bool | None
    due: datetime | None
