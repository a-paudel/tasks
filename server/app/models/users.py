from datetime import datetime
from tortoise import models, fields
from tortoise.queryset import QuerySet, QuerySetSingle
from pydantic import BaseModel
from starlette.authentication import BaseUser
import arrow
from secrets import token_urlsafe
from app.models.tasks import Task


# users model
class User(models.Model, BaseUser):
    id: int = fields.IntField(pk=True)
    username: str = fields.CharField(max_length=255)
    password_hash: str = fields.CharField(max_length=255)
    tokens: QuerySet["Token"]


# token model
class Token(models.Model):
    @staticmethod
    def generate_expiry_date():
        # return 5 days from now
        return arrow.utcnow().shift(days=5).datetime

    @staticmethod
    def generate_token():
        return token_urlsafe(32)

    id: int = fields.IntField(pk=True)
    user: QuerySetSingle[User] = fields.ForeignKeyField(
        "models.User", related_name="tokens"
    )
    token: str = fields.CharField(max_length=255, default=generate_token)
    expires_at: datetime = fields.DatetimeField(default=generate_expiry_date)

    @property
    def is_expired(self):
        return arrow.get(self.expires_at) < arrow.utcnow()


# schema
class UserOutput(BaseModel):
    id: int
    username: str


class TokenOutput(BaseModel):
    token: str
    expires_at: datetime


class LogoutInput(BaseModel):
    token: str


class LoginInput(BaseModel):
    username: str
    password: str


class RegisterInput(BaseModel):
    username: str
    password: str
