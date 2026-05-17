from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.User import User_Response, User_Create
from typing import List
from passlib.context import CryptContext

from app.auth.dependencies import get_current_user
from app.models.user import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter (prefix='/user', tags=['User'])


@router.get('/', response_model= List[User_Response])
def get_user(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user = db.query(User).all()
    return user

@router.get('/{id}', response_model=User_Response)
def get_User_by_id(id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    User_id=db.query(User).filter(User.id_user == id).first()
    
    if not User_id:
        raise HTTPException(status_code=404, detail='User no encontrado')
    
    return User_id


@router.post('/', response_model=User_Response)
def create_user(datos: User_Create, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    
    hashed = pwd_context.hash(datos.password)
    create = User(
    firstname=datos.firstname,
    last_name=datos.last_name,
    email=datos.email,
    role=datos.role,
    hashed_password=hashed
    )

    db.add(create)
    db.commit()
    db.refresh(create)
    return create
    
@router.patch('/{id}', response_model= User_Response)
def edit_user(id: int, datos: User_Create ,db: Session= Depends(get_db), current_user: User = Depends(get_current_user)):
    edit_user = db.query(User).filter(User.id_user == id).first()
    
    if not edit_user:
        raise HTTPException(status_code=404, detail='User no encontrado')
    
    edit_user.firstname = datos.firstname
    edit_user.last_name = datos.last_name
    edit_user.email = datos.email
    edit_user.role = datos.role
    edit_user.hashed_password = pwd_context.hash(datos.password)
    
    db.commit()
    db.refresh(edit_user)
    return edit_user

@router.delete('/{id}', response_model= User_Response)
def delete_user(id:int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    borrar = db.query(User).filter(User.id_user == id).first()
    if not borrar:
        raise HTTPException(status_code=404, detail='User no encontrado')
    db.delete(borrar)
    db.commit()
    return borrar