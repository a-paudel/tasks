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

router = APIRouter(prefix="/users", tags=["User"])


# login route
@router.post("/login", response_model=TokenOutput, responses={401: {}})
async def login(data: LoginInput):
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
@requires("authenticated")
async def check(request: Request):
    return request.user


# logout route
@router.post("/logout", status_code=204, responses={403: {}, 404: {}})
@requires("authenticated")
async def logout(request: Request, data: LogoutInput):
    # get token
    token = await Token.filter(token=data.token).first()
    if token and await token.user == request.user:
        # delete token
        await Token.filter(id=token.id).delete()
        return
    else:
        return JSONResponse(status_code=404, content={"detail": "Token not found"})
