from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from db import supabase
from security import hash_password

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

    password = user.password  
    print('length of the password is: ', len(password))
    hashed_password = hash_password(password)
    print('length of the hashed password is: ', len(hashed_password))   

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