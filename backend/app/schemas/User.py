from pydantic import BaseModel, EmailStr
from typing import Optional

class User_Base(BaseModel):
    firstname: str
    last_name: str
    email: EmailStr
    role: str= 'Admin'

class User_Create(User_Base):
    password: str
    pass

class User_Response(User_Base):
    id_user: int
    class Config:
        from_attributes = True