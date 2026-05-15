from dotenv import load_dotenv
load_dotenv()

from faker import Faker
from datetime import date
from passlib.context import CryptContext
from app.database import SessionLocal
from app.models.employee import Employee, EmployeeStatus, EmployeeDisability
from app.models.department import Department
from app.models.user import User, User_Role

fake = Faker('es_CO')
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12
)

db = SessionLocal()

# ── LIMPIAR DB ──
print("Limpiando base de datos...")
db.query(Employee).delete()
db.query(User).delete()
db.query(Department).delete()
db.commit()
print("DB limpia ✓")

# ── DEPARTAMENTOS ──
print("Creando departamentos...")
departamentos = [
    Department(name="Tecnología", description="Desarrollo y sistemas"),
    Department(name="Finanzas", description="Contabilidad y presupuesto"),
    Department(name="Recursos Humanos", description="Gestión del talento"),
    Department(name="Ventas", description="Comercial y clientes"),
    Department(name="Operaciones", description="Logística y procesos"),
]
for d in departamentos:
    db.add(d)
db.commit()

for d in departamentos:
    db.refresh(d)
print(f"{len(departamentos)} departamentos creados ✓")

# ── EMPLEADOS ──
print("Creando empleados...")
estados = [EmployeeStatus.active, EmployeeStatus.active, EmployeeStatus.active, EmployeeStatus.vacation, EmployeeStatus.inactive]
cargos = ["Dev Senior", "Dev Junior", "Analista", "Coordinador", "Gerente", "Auxiliar", "Consultor", "Especialista"]

for i in range(15):
    emp = Employee(
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        cc=fake.numerify(text="##########"),
        age=fake.random_int(min=22, max=55),
        phone=fake.numerify(text="3########"),
        mail=fake.unique.email(),
        position=fake.random_element(cargos),
        hire_date=fake.date_between(start_date=date(2020, 1, 1), end_date=date(2024, 12, 31)),
        salary=fake.random_int(min=1800000, max=8000000, step=100000),
        disability=EmployeeDisability.none,
        details=None,
        status=fake.random_element(estados),
        img=None,
        departament_id=fake.random_element(departamentos).id,
    )
    db.add(emp)

db.commit()
print("15 empleados creados ✓")

# ── USUARIOS ──
print("Creando usuarios...")
usuarios = [
    User(
        firstname="Daniel",
        last_name="Valencia",
        email="admin@staffcore.co",
        hashed_password=pwd_context.hash("admin123"[:72]),
        role=User_Role.admin,
    ),
    User(
        firstname="Laura",
        last_name="Rios",
        email="manager@staffcore.co",
        hashed_password=pwd_context.hash("manager123"[:72]),
        role=User_Role.manager,
    ),
    User(
        firstname="Carlos",
        last_name="Perez",
        email="viewer@staffcore.co",
        hashed_password=pwd_context.hash("viewer123"[:72]),
        role=User_Role.viewer,
    ),
]
for u in usuarios:
    db.add(u)
db.commit()
print("3 usuarios creados ✓")

db.close()
print("\n✅ Seeder completado exitosamente")
print("Credenciales de acceso:")
print("  Admin:   admin@staffcore.co   / admin123")
print("  Manager: manager@staffcore.co / manager123")
print("  Viewer:  viewer@staffcore.co  / viewer123")