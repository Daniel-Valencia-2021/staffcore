from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.department import Department
from app.schemas.Department import Department_Response, Deparment_Create
from typing import List

router = APIRouter (prefix='/departments', tags=['Department'])

@router.get('/', response_model= List[Department_Response])
def get_departments(db: Session = Depends(get_db)):
    departments = db.query(Department).all()
    
    return departments

@router.get('/{id}', response_model=Department_Response)
def get_department_by_id(id: int, db: Session = Depends(get_db)):
    department_id=db.query(Department).filter(Department.id == id).first()
    
    if not department_id:
        raise HTTPException(status_code=404, detail='Departamento no encontrado')

    return department_id


@router.post('/', response_model=Department_Response)
def create_department(datos: Deparment_Create, db: Session = Depends(get_db)):
    create = Department (**datos.model_dump())

    db.add(create)
    db.commit()
    db.refresh(create)
    return create

    
@router.patch('/{id}', response_model= Department_Response)
def edit_department(id: int,datos: Deparment_Create , db: Session= Depends(get_db)):
    department_id=db.query(Department).filter(Department.id == id).first()
    
    if not department_id:
        raise HTTPException (status_code=404, detail="Departamento no encontrado")
        
    department_id.name = datos.name
    department_id.description = datos.description
    db.commit()
    db.refresh(department_id)
    return department_id

@router.delete('/{id}', response_model= Department_Response)
def delete_department(id:int, db: Session = Depends(get_db)):
    borrar = db.query(Department).filter(Department.id == id).first()
    
    if not borrar:
        raise HTTPException(status_code=404, detail= 'No se encontro el departamente buscado')
    
    db.delete(borrar)
    db.commit()
    return(borrar)