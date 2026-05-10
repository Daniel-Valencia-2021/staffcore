from sqlalchemy import Column, Integer, String, Float, ForeignKey, VARCHAR, Enum, Date
from sqlalchemy.orm import relationship
from app.database import Base
import enum

class EmployeeStatus(str, enum.Enum):
    active = 'active'
    vacation = 'vacation'
    inactive = 'inactive'

class EmployeeDisability(str, enum.Enum):
    none = "No aplica"
    visual = "Visual"
    mobility = "Movilidad"
    auditory = "Auditiva"

class Employee(Base):
    __tablename__="employees"
    id_employee = Column(Integer, primary_key=True)
    first_name = Column(String, nullable=False, index= True)
    last_name = Column(String, nullable=False)
    cc = Column(String, nullable=False, unique= True, index= True)
    age = Column(Integer, nullable= False)
    phone = Column(String, nullable= True, unique= True)
    mail = Column(String, nullable= False, unique=True)
    position = Column (String, nullable= False)
    hire_date = Column (Date, nullable = False)
    salary = Column(Float, nullable= False)
    disability = Column(Enum(EmployeeDisability), default=EmployeeDisability.none)
    details = Column(String, nullable=True)
    status = Column(Enum(EmployeeStatus), default=EmployeeStatus.active)
    img = Column(VARCHAR, nullable=True)
    
    #clave foranea
    departament_id = Column(Integer, ForeignKey('departments.id'))
    departament = relationship('Department', backref='employees')
    
    
    