from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional


class Employee_Base(BaseModel):
    first_name: str
    last_name: str
    cc: str
    age: int
    phone: Optional[str] = None
    mail: EmailStr
    position: str
    hire_date: date
    salary: float
    disability: str = 'none'
    details: Optional[str] = None
    status: str = 'active'
    img:  Optional[str] = None
    departament_id: int

    
class Employee_Create(Employee_Base):
    pass

class Employee_Response(Employee_Base):
    id_employee: int
    class Config:
        from_attributes = True