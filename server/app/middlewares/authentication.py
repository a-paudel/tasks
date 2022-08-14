# import typing
# from starlette.requests import HTTPConnection
# from starlette.authentication import AuthenticationBackend, AuthCredentials, BaseUser
# from app.models.users import Token, User


# class TokenAuthentication(AuthenticationBackend):
#     async def authenticate(
#         self, conn: HTTPConnection
#     ) -> typing.Optional[typing.Tuple["AuthCredentials", "BaseUser"]]:
#         # check if authorization header is present
#         authorization = conn.headers.get("Authorization")
#         if not authorization:
#             return
#         # check if bearer token is present
#         if not authorization.startswith("Bearer "):
#             return

#         # get token_content
#         token_content = authorization.split(" ")[1]

#         # get token from db
#         token = await Token.filter(token=token_content).first()
#         if not token:
#             return
#         # check if token is expired
#         if token.is_expired:
#             return
#         # get user from db
#         user = await User.filter(id=token.user_id).first()
#         if not user:
#             return
#         # return AuthCredentials and BaseUser
#         return AuthCredentials(["authenticated"]), user

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from app.models.users import Token, User

get_current_token = OAuth2PasswordBearer(tokenUrl="/api/users/login")


async def get_current_user(token: str = Depends(get_current_token)):
    token = await Token.filter(token=token).first()
    if token and not token.is_expired:
        user = await User.filter(id=token.user_id).first()
        if user:
            return user
    return None
