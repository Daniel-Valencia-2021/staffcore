from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.employee import Employee
from app.schemas.Employee import Employee_Response, Employee_Create
from typing import List

from app.auth.dependencies import get_current_user
from app.models.user import User

router = APIRouter (prefix='/employee', tags=['Employee'])


@router.get('/', response_model= List[Employee_Response])
def get_employee(db: Session = Depends(get_db)):
    employee = db.query(Employee).all()
    
    return employee

@router.get('/{id}', response_model=Employee_Response)
def get_employee_by_id(id: int ,db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    employee_id=db.query(Employee).filter(Employee.id_employee == id).first()
    
    if not employee_id:
        raise HTTPException(status_code=404, detail='Departamento no encontrado')
    
    return employee_id


@router.post('/', response_model=Employee_Response)
def create_employee(datos: Employee_Create ,db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    create = Employee(**datos.model_dump())

    db.add(create)
    db.commit()
    db.refresh(create)
    return create
    
@router.patch('/{id}', response_model= Employee_Response)
def edit_employee(id: int, datos:Employee_Create ,db: Session= Depends(get_db), current_user: User = Depends(get_current_user)):
    edit_employee = db.query(Employee).filter(Employee.id_employee == id).first()
    
    if not edit_employee:
        raise HTTPException(status_code=404, detail='Empleado no encontrado')
    
    for key, value in datos.model_dump().items():
        setattr(edit_employee, key, value)
        
    db.commit()
    db.refresh(edit_employee)
    
    return edit_employee

@router.delete('/{id}', response_model= Employee_Response)
def delete_employee(id:int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    borrar = db.query(Employee).filter(Employee.id_employee == id).first()
    if not borrar:
        raise HTTPException(status_code=404, detail='Empleado no encontrado')
    db.delete(borrar)
    db.commit()
    return borrar