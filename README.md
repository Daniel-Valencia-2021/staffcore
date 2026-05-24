<div align="center">

# ◆ StaffCore

**Sistema de gestión de empleados — construido con precisión.**

*FastAPI · PostgreSQL · React · TypeScript · Tailwind v4*

---

![Backend](https://img.shields.io/badge/Backend-Completo-2a5a2a?style=flat-square)
![Frontend](https://img.shields.io/badge/Frontend-Completo-2a5a2a?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.11+-3776ab?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)
![AI](https://img.shields.io/badge/AI%20Assisted-Claude%20Sonnet-6366f1?style=flat-square)

</div>

---

## Vista previa

| Login | Dashboard |
|---|---|
| ![Login](./screenshots/login.png) | ![Dashboard](./screenshots/dashboard.png) |

| Empleados | Departamentos |
|---|---|
| ![Empleados](./screenshots/empleados.png) | ![Departamentos](./screenshots/departamentos.png) |

| Nómina | Roles & Acceso |
|---|---|
| ![Nomina](./screenshots/nomina.png) | ![Roles](./screenshots/roles.png) |

---

## ¿Qué es StaffCore?

StaffCore es una plataforma interna de gestión de empleados con un diseño **enterprise moderno** basado en el sistema de diseño Stitch de Google — tipografía Manrope + Inter, paleta de slate profundo con acento verde, cards con tonal layering y tablas sin bordes verticales.

- Empleados gestionados desde un solo lugar
- Departamentos con métricas y nómina por área
- Nómina con resumen de salarios y distribución visual
- Control de acceso por roles — Admin, Manager y Viewer
- API REST completamente documentada con Swagger

---

## Proceso de desarrollo

El backend fue desarrollado íntegramente por **Daniel Alexis Valencia Nieves**. Para el frontend, dado que no es su área principal, se utilizó **Claude Sonnet (Anthropic)** como agente de IA asistente — siguiendo un flujo de trabajo estructurado donde Daniel construía la lógica y Claude asistía con la arquitectura de componentes, el sistema de diseño y la adaptación al stack elegido.

### Metodología de trabajo con IA

- Daniel implementaba la lógica de cada vista (estados, llamadas a la API, CRUD)
- Claude revisaba, retroalimentaba y aplicaba el sistema de diseño Stitch
- Las decisiones de arquitectura, rutas y modelo de datos fueron siempre de Daniel
- El frontend no fue generado automáticamente — fue construido iterativamente con guía y revisión

> Esta forma de trabajar refleja una habilidad profesional real: saber dirigir herramientas de IA para complementar áreas fuera del stack principal, manteniendo control sobre el proyecto.

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
| **Claude Sonnet** | Agente de IA — diseño, revisión y arquitectura frontend |

---

## Estado del proyecto

### ✅ Backend — Completo

- [x] Modelos SQLAlchemy (`Employee`, `Department`, `User`)
- [x] Schemas Pydantic (Create, Update, Response)
- [x] CRUD endpoints REST — empleados, departamentos, usuarios
- [x] Seeder con datos de prueba
- [x] Tests con pytest
- [x] JWT Authentication — login, tokens, rutas protegidas
- [x] Control de acceso por rol (`Admin` / `Manager` / `Viewer`)

### ✅ Frontend — Completo

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
- [x] Dashboard — métricas, tabla de empleados recientes, gráfica por departamento
- [x] Empleados — CRUD completo, búsqueda en tiempo real, paginación, modal crear/editar
- [x] Departamentos — CRUD completo, conteo de empleados y nómina por departamento
- [x] Nómina — métricas, tabla ordenada por salario con % del total, gráfica por departamento
- [x] Roles & Acceso — gestión de usuarios, control de acceso por rol, solo visible para Admin

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

| Vista | Ruta | Roles | Descripción |
|---|---|---|---|
| Login | `/login` | Todos | Autenticación con email y password |
| Dashboard | `/dashboard` | Admin, Manager | Métricas, empleados recientes, gráfica por departamento |
| Empleados | `/empleados` | Admin, Manager | CRUD completo, búsqueda, paginación, modal crear/editar |
| Departamentos | `/departamentos` | Admin, Manager | CRUD, conteo de empleados y nómina por área |
| Nómina | `/nomina` | Admin, Manager | Resumen de salarios con gráfica y porcentajes |
| Roles & Acceso | `/roles` | Solo Admin | Gestión de usuarios y roles del sistema |

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
        │   ├── Departamentos.tsx    # ✅
        │   ├── Nomina.tsx           # ✅
        │   └── Roles.tsx            # ✅
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

## Autenticación y roles

```
POST /auth/login  →  { access_token, token_type }
                          ↓
           Authorization: Bearer <token>
                          ↓
              Rutas protegidas con Depends(get_current_user)
                          ↓
              Control de acceso por current_user.role
```

| Rol | Permisos |
|---|---|
| **Admin** | Acceso total — incluyendo Roles & Acceso |
| **Manager** | Acceso a Dashboard, Empleados, Departamentos y Nómina |
| **Viewer** | Solo lectura — sin acceso a vistas de gestión |

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

*Backend desarrollado por Daniel · Frontend construido con asistencia de Claude Sonnet (Anthropic)*

</div>