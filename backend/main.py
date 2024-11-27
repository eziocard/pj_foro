
from fastapi import FastAPI, Header
from fastapi.middleware.cors import CORSMiddleware
from conexion import Database
from pydantic import BaseModel
from fastapi import HTTPException
from functions_jwt import validate_token, write_token
from dotenv import load_dotenv

load_dotenv()

class Register(BaseModel):
    username: str
    name: str
    lastname:str
    email:str
    password:str

class Login(BaseModel):
    username:str
    password:str

class currentUser(BaseModel):
    username:str

class FollowRequest(BaseModel):
    follower: str
    followee: str

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
        token = write_token({"username":username})
        return {"message": "Login successful", "token": token} 
    else:
        raise HTTPException(status_code=401, detail="Error al Registrar Verifique su informacion")

@app.post("/verify/token")
def verify_token(Authorization: str = Header(None)):
    token = Authorization.split(" ")[1]
    decoded_data = validate_token(token, output=True)
    
    # Si el token es válido, puedes obtener la información del usuario
    if decoded_data:
        username = decoded_data.get("username")
        # Recuperar más datos del usuario (por ejemplo, nombre, email) desde la base de datos
        user_data = Database().execute_query("MATCH (u:User {username: $username}) RETURN u", {'username': username})
        if user_data:
            # Retorna los datos del usuario
            return user_data[0]['u']
        else:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
    else:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")

@app.post("/signup")
async def signup(register:Register):
    username = register.username
    name= register.name
    lastname = register.lastname
    email = register.email
    password = register.password

    user_exists = Database().create_user(username,name,lastname,email,password)  # Simulando una verificación de si el usuario ya existe
    if user_exists :
        raise HTTPException(status_code=400, detail="Ya existe un usuario con ese nombre de usuario o correo electrónico")

    # Si el usuario no existe, procedes con la creación del usuario
    return {"message": "Usuario creado exitosamente"}


@app.get("/search_users/{username}")
async def search_users(username:str):
    return Database().not_friend_users(username)


#@app.get("/folliwng")
#async def folliwng():
 #   return null

@app.get("/followers/{username}")
async def get_followers(username: str):    
    return Database().friend_users(username)


@app.post("/make_follow")
async def make_follow(follow_request: FollowRequest, Authorization: str = Header(None)):
    token = Authorization.split(" ")[1]  # Extraer el token de los encabezados
    decoded_data = validate_token(token, output=True)
    
    # Validar si el token es válido
    if not decoded_data:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    follower = follow_request.follower
    followee = follow_request.followee

    Database().create_folow(follower,followee)   # Aquí es donde harías la lógica para guardar el seguimiento en la base de datos
    # Si la operación de seguimiento es exitosa:
    return {"message": f"Usuario {follow_request.follower} sigue a {follow_request.followee}"}
