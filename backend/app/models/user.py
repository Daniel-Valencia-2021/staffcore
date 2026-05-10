from sqlalchemy import Column, String, Integer, Enum
import enum
from app.database import Base

class User_Role(str, enum.Enum):
    admin = "Admin"
    manager = "Manager"
    viewer = "Viewer"
    
class User(Base):
    __tablename__="users"
    id_user = Column (Integer, primary_key=True)
    firstname = Column (String, nullable=False)
    last_name = Column (String, nullable= False)
    email = Column (String, nullable=False, unique=True)
    hashed_password = Column (String, nullable=False)
    role = Column(Enum(User_Role), default=User_Role.admin)
    