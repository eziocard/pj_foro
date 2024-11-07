
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from conexion import Database
from pydantic import BaseModel
from fastapi import HTTPException


class Register(BaseModel):
    username: str
    name: str
    lastname:str
    email:str
    password:str

class Login(BaseModel):
    username:str
    password:str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia esto a dominios específicos si es necesario
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/login")
async def login(login:Login):
    username = login.username
    password = login.password
    
    correct = Database().login_user(username,password)
    if correct:
        return correct 
    else:
        raise HTTPException(status_code=404, detail="Error al Registrar Verifique su informacion")

@app.post("/signup")
async def signup(register:Register):
    username = register.username
    name= register.name
    lastname = register.lastname
    email = register.email
    password = register.password


    user_exists = Database().create_user(username,name,lastname,email,password)  # Simulando una verificación de si el usuario ya existe
    if user_exists :
        raise HTTPException(status_code=404, detail="Ya existe un usuario con ese nombre de usuario o correo electrónico")

    # Si el usuario no existe, procedes con la creación del usuario
    return {"message": "Usuario creado exitosamente"}



