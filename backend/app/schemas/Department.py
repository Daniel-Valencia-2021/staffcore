from pydantic import BaseModel
from typing import Optional

class Department_Base(BaseModel):
    name: str
    description: Optional[str] = None
    
class Deparment_Create(Department_Base):
    pass

class Department_Response(Department_Base):
    id: int
    
    class Config:
        from_attributes = True