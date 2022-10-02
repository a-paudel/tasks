from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt  # type: ignore
from models import User
from pydantic import BaseModel
from passlib.hash import argon2  # type: ignore
import os


# SCHEMA
class UserOutput(BaseModel):
    """User output schema."""

    id: str
    username: str


class TokenOutput(BaseModel):
    """Token output schema."""

    access_token: str
    token_type: str = "bearer"


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/users/login")


def create_jwt_token(user: User) -> str:
    """Create a JWT token for a user."""
    return jwt.encode(
        {
            "id": user.id,
        },
        os.getenv("SECRET_KEY"),
    )


def get_current_user_id(token: str = Depends(oauth2_scheme)):
    """Get the current user from the JWT token."""
    try:
        payload = jwt.decode(token, os.getenv("SECRET_KEY"))
        return payload["id"]
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


async def get_current_user(user_id: str = Depends(get_current_user_id)):
    """Get the current user from the JWT token."""
    user = await User.get_or_none(id=user_id)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user


# ROUTES
users_router = APIRouter(prefix="/users", tags=["User"])


# login route
@users_router.post(
    "/login",
    response_model=TokenOutput,
    responses={401: {}},
)
async def login(data: OAuth2PasswordRequestForm = Depends()):
    """Login route."""
    # get user from db
    user = await User.get_or_none(username=data.username)
    # verify password
    if not user or not argon2.verify(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    # create token
    token = create_jwt_token(user)

    # return token
    return TokenOutput(access_token=token)


# register route
@users_router.post(
    "/register",
    response_model=UserOutput,
    responses={400: {}},
)
async def register(data: OAuth2PasswordRequestForm = Depends()):
    """Register route."""
    # check if user exists
    if await User.get_or_none(username=data.username):
        raise HTTPException(status_code=400, detail="User already exists")

    # create user
    user = await User.create(
        username=data.username,
        password=argon2.hash(data.password),
    )

    # return user and token
    return user


# get user route
@users_router.get(
    "/me",
    response_model=UserOutput,
)
async def get_user(user: User = Depends(get_current_user)):
    return user
