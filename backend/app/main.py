from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app import models  # esto carga todos los modelos en memoria

Base.metadata.create_all(bind=engine)

app = FastAPI(title="StaffCore API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "StaffCore API running"}

@app.get("/test-db")
def test_db():
    try:
        with engine.connect() as conn:
            return {"status": "Conexión exitosa a Neon ✓"}
    except Exception as e:
        return {"error": str(e)}