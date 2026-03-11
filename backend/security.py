from passlib.context import CryptContext
from db import supabase
from fastapi import HTTPException

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def verify_user(email: str, password: str):
    result = supabase.table('users').select('*').eq('email', email).execute()

    if not result.data:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    user = result.data[0]

    if not verify_password(password, user['password']):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    return user