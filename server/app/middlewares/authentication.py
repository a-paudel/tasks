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
