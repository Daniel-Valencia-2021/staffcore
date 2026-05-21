<div align="center">

# ◆ StaffCore

**Sistema de gestión de empleados — construido con precisión.**

*FastAPI · PostgreSQL · React · TypeScript · Tailwind v4*

---

![Estado](https://img.shields.io/badge/Backend-Completo-2a5a2a?style=flat-square)
![Estado](https://img.shields.io/badge/Frontend-En%20progreso-f59e0b?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.11+-3776ab?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)

</div>

---

## Vista previa

> 📸 **Capturas próximamente** — Se agregarán cuando todas las vistas estén completas.
> Para agregarlas: crea una carpeta `screenshots/` en la raíz del repo y reemplaza esta sección con:
> `![Dashboard](./screenshots/dashboard.png)`

```
[ Login ]   [ Dashboard ]   [ Empleados ]   [ Departamentos ]   [ Nómina ]
   ✅            ✅              ✅                 🔲               🔲
 Listo         Listo           Listo          Próximamente     Próximamente
```

---

## ¿Qué es StaffCore?

StaffCore es una plataforma interna de gestión de empleados con un diseño **enterprise moderno** basado en el sistema de diseño Stitch de Google — tipografía Manrope + Inter, paleta de slate profundo con acento verde, cards con tonal layering y tablas sin bordes verticales.

- Empleados gestionados desde un solo lugar
- Departamentos con métricas en tiempo real
- Acceso por roles — admin y usuario estándar
- API REST completamente documentada con Swagger

---

## Stack tecnológico

### Backend
| Herramienta | Rol |
|---|---|
| **FastAPI** | Framework principal de la API REST |
| **PostgreSQL** (Neon) | Base de datos en la nube |
| **SQLAlchemy** | ORM — modelos y consultas |
| **Pydantic** | Validación de datos y schemas |
| **python-jose** | Autenticación JWT |
| **passlib + bcrypt** | Hashing seguro de passwords |
| **pytest** | Tests automatizados |

### Frontend
| Herramienta | Rol |
|---|---|
| **React 19 + Vite** | Framework UI y bundler (template react-ts) |
| **TypeScript** | Tipado estático |
| **Tailwind CSS v4** | Estilos — con `@tailwindcss/vite` |
| **shadcn/ui** | Componentes — Radix + preset Luma (Lucide + Inter) |
| **React Router v7** | Navegación entre vistas |
| **Axios** | Cliente HTTP con interceptor JWT |
| **Recharts** | Gráficas del dashboard y nómina |
| **jwt-decode** | Decodificación del token en el cliente |

---

## Estado del proyecto

### ✅ Backend — Completo

- [x] Modelos SQLAlchemy (`Employee`, `Department`, `User`)
- [x] Schemas Pydantic (Create, Update, Response)
- [x] CRUD endpoints REST — empleados, departamentos, usuarios
- [x] Seeder con datos de prueba
- [x] Tests con pytest
- [x] JWT Authentication — login, tokens, rutas protegidas
- [x] Control de acceso por rol (`admin` / `user`)

### 🚧 Frontend — En progreso

**Setup**
- [x] Proyecto Vite + TypeScript (`react-ts`)
- [x] Tailwind CSS v4 con `@tailwindcss/vite`
- [x] Colores StaffCore en `@theme` — `#2a5a2a` / `#7fd4a0`
- [x] Path aliases configurados (`@/*` → `src/*`)
- [x] shadcn/ui inicializado — Radix + Luma
- [x] Axios con interceptor JWT
- [x] React Router con rutas protegidas (`ProtectedRoute`)

**Vistas**
- [x] Layout — Sidebar con hover expand + Header con métricas reales
- [x] Login — pantalla dividida, autenticación JWT, redirección automática
- [x] Dashboard — métricas, tabla de empleados recientes, gráfica de barras por departamento
- [x] Empleados — CRUD completo, búsqueda en tiempo real, paginación, modal crear/editar
- [ ] Departamentos
- [ ] Nómina
- [ ] Roles & Acceso

---

## Diseño

El sistema de diseño está basado en **Stitch de Google** — enterprise moderno con tonal layering.

| Elemento | Decisión de diseño |
|---|---|
| Sidebar | Hover expand 56px → 220px · fondo `#0a0a0a` · ítem activo con borde verde |
| Header | Métricas reales inline · avatar con iniciales · altura 80px |
| Cards | `rounded-xl` · borde `border-gray-100` · hover con `translateY` · barra verde animada |
| Tabla | Sin bordes verticales · hover `bg-gray-50` · badge de estado |
| Fondo | `#F7F9FB` — gris muy claro para diferenciar niveles |
| Acento | Verde `#2a5a2a` → `#7fd4a0` |
| Tipografía | Manrope (headlines) · Inter (body y datos) via shadcn Luma |
| Iconos | Lucide via shadcn Luma |

---

## Vistas

| Vista | Ruta | Estado | Descripción |
|---|---|---|---|
| Login | `/login` | ✅ | Autenticación con email y password, redirección automática |
| Dashboard | `/dashboard` | ✅ | Métricas, empleados recientes, gráfica por departamento |
| Empleados | `/empleados` | ✅ | CRUD completo, búsqueda, paginación, modal crear/editar |
| Departamentos | `/departamentos` | 🔲 | Lista con conteo de empleados por área |
| Nómina | `/nomina` | 🔲 | Resumen de salarios con gráfica |
| Roles & Acceso | `/roles` | 🔲 | Gestión de permisos por usuario |

---

## Estructura del proyecto

```
staffcore/
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── jwt.py               # genera y verifica tokens
│   │   │   └── dependencies.py      # get_current_user — guardia de rutas
│   │   ├── models/                  # Employee, Department, User
│   │   ├── routers/                 # auth, employees, departments, users
│   │   ├── schemas/                 # Pydantic schemas
│   │   ├── database.py
│   │   └── main.py
│   ├── tests/
│   ├── seeder.py
│   └── requirements.txt
│
└── frontend/
    └── src/
        ├── api/
        │   └── axios.ts             # instancia Axios + interceptor JWT
        ├── components/
        │   ├── ui/                  # componentes shadcn
        │   └── layout/              # Sidebar, Header, Layout
        ├── pages/
        │   ├── Login.tsx            # ✅
        │   ├── Dashboard.tsx        # ✅
        │   ├── Empleados.tsx        # ✅
        │   ├── Departamentos.tsx    # 🔲
        │   ├── Nomina.tsx           # 🔲
        │   └── Roles.tsx            # 🔲
        ├── App.tsx                  # rutas + ProtectedRoute
        └── main.tsx
```

---

## Instalación

### Backend

```bash
# Entorno virtual
python -m venv venv
source venv/bin/activate      # Linux/Mac
.\venv\Scripts\activate       # Windows

# Dependencias
pip install -r requirements.txt

# Datos de prueba
python seeder.py

# Servidor
uvicorn app.main:app --reload
```

> API: `http://localhost:8000` · Swagger: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

> App: `http://localhost:5173`

---

## Autenticación

```
POST /auth/login  →  { access_token, token_type }
                          ↓
           Authorization: Bearer <token>
                          ↓
              Rutas protegidas con Depends(get_current_user)
                          ↓
              Control de acceso por current_user.role
```

El token se guarda en `localStorage` y el interceptor de Axios lo agrega automáticamente a cada petición. `ProtectedRoute` en el frontend redirige al login si no hay token.

---

## Variables de entorno

Crear `.env` en la raíz del backend:

```env
DATABASE_URL=postgresql://usuario:password@host/db
SECRET_KEY=clave_secreta_larga_y_aleatoria
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

> ⚠️ `.env` está en `.gitignore` — nunca sube a GitHub.

---

<div align="center">

**StaffCore** · Daniel Alexis Valencia Nieves · Medellín · 2026

</div>