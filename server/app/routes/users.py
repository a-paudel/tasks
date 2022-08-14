from app.models.users import (
    User,
    UserOutput,
    Token,
    TokenOutput,
    LoginInput,
    RegisterInput,
    LogoutInput,
)
from fastapi.routing import APIRouter
from fastapi.responses import JSONResponse
from passlib.hash import argon2
from starlette.authentication import requires
from fastapi.requests import Request
from app.middlewares.authentication import get_current_token, get_current_user
from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix="/users", tags=["User"])


# login route
@router.post("/login", response_model=TokenOutput, responses={401: {}})
async def login(data: OAuth2PasswordRequestForm = Depends()):
    # get user
    user = await User.filter(username=data.username).first()
    if user and argon2.verify(data.password, user.password_hash):
        # generate token
        token = await Token.create(user=user)
        return token
    else:
        return JSONResponse(status_code=401, content={"detail": "Invalid credentials"})


# register route
@router.post("/register", response_model=TokenOutput, responses={400: {}})
async def register(data: RegisterInput):
    # get user
    user = await User.filter(username=data.username).first()
    if user:
        return JSONResponse(status_code=400, content={"detail": "User already exists"})
    else:
        # create user
        user = await User.create(
            username=data.username, password_hash=argon2.hash(data.password)
        )
        # create token
        token = await Token.create(user=user)
        return token


# check route
@router.get("/check", response_model=UserOutput, responses={403: {}})
# @requires("authenticated")
async def check(request: Request, user: User = Depends(get_current_user)):
    if user:
        return user
    return JSONResponse(status_code=403, content={"detail": "Not authenticated"})


# logout route
@router.get("/logout", status_code=204, responses={403: {}, 404: {}})
async def logout(
    request: Request,
    token: str = Depends(get_current_token),
):
    # get token
    token = await Token.filter(token=token).first()
    if not token:
        return JSONResponse(status_code=404, content={"detail": "Token not found"})
    # delete token
    await token.delete()
    return
