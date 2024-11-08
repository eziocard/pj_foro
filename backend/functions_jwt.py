from jwt import encode,decode
from datetime import datetime,timedelta
from os import getenv
from jwt import exceptions
from fastapi import HTTPException
def expire_date(days: int):
    date = datetime.now()
    new_date = date + timedelta(days)
    return new_date
def write_token(data:dict):
    token= encode(payload={**data,"exp":expire_date(2)},key=getenv("SECRET"),algorithm="HS256")
    return token

def validate_token(token: str, output=False):
    try:
        # Intentamos decodificar el token
        decoded_data = decode(token, key=getenv("SECRET"), algorithms=["HS256"])

        # Si el parámetro 'output' es True, devolvemos los datos decodificados
        if output:
            return decoded_data  # Devuelve un diccionario con los datos decodificados

        # Si 'output' es False, simplemente devolvemos None
        return None

    except exceptions.DecodeError:
        # Si el token no puede ser decodificado, lanzamos una excepción de HTTP
        raise HTTPException(status_code=401, detail="Invalid Token")
    except exceptions.ExpiredSignatureError:
        # Si el token ha expirado, lanzamos una excepción de HTTP
        raise HTTPException(status_code=401, detail="Token Expired")

