from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from db import supabase
from security import hash_password, verify_user

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "heloo alansha"}

class RegisterUser(BaseModel):
    name: str
    email: str
    password: str

@app.post("/register")
def register(user: RegisterUser):

    existing_user = supabase.table('users').select('email').eq('email', user.email).execute()

    if existing_user.data:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    password = user.password
    hashed_password = hash_password(password)

    data = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    }

    result = supabase.table("users").insert(data).execute()

    return {
        "message": "User registered successfully",
        "data": result.data
    }

class LoginUser(BaseModel):
    email: str
    password: str

@app.post('/login')
def login(user: LoginUser):
    db_user = verify_user(user.email, user.password)
    return {
        'message': 'Login successfull..!!',
        "user": {
            "name": db_user["name"],
            "email": db_user["email"]
        }
    }