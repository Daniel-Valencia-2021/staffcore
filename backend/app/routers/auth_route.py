from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.Auth import LoginSchema, TokenSchema
from app.auth.jwt import create_access_token
from passlib.context import CryptContext

router = APIRouter(prefix="/auth", tags=["Auth"])
# Mismo contexto de hashing que usaste en el seeder
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/login", response_model=TokenSchema)
def login(datos: LoginSchema, db: Session = Depends(get_db)):
    # 1. Buscar usuario por email
    user = db.query(User).filter(User.email == datos.email).first()
    # 2. Verificar que existe Y que el password es correcto
    # Ambas verificaciones en el mismo bloque — no revelar cuál falló
    if not user or not pwd_context.verify(datos.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # 3. Generar el token con los datos del usuario
    token = create_access_token({
        'sub': str(user.id_user),
        'email': user.email,
        'role': user.role,
    })
    return TokenSchema(access_token=token, token_type='bearer')