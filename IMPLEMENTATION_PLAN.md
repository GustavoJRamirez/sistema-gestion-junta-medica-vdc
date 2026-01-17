# Plan de Implementación - Sistema de Gestión de Juntas Médicas VDC

## Objetivo

Desarrollar una aplicación web demo funcional para gestión de juntas médicas con sistema de roles, flujo de estados, y vistas diferenciadas por rol.

---

## Decisiones de Diseño

> [!IMPORTANT]
> **Demo Mode:** Se usará SQLite en lugar de PostgreSQL para simplificar la demo. El dictamen médico usará un formulario placeholder hasta recibir el documento oficial.

---

## Cambios Propuestos

### Backend (Node.js + Express)

---

#### [NEW] [package.json](file:///c:/Users/Gustavital/Desktop/Gustavital/sistema-gestion-junta-vdc/backend/package.json)
Configuración del proyecto con dependencias: express, sqlite3, bcryptjs, jsonwebtoken, multer, cors

#### [NEW] [server.js](file:///c:/Users/Gustavital/Desktop/Gustavital/sistema-gestion-junta-vdc/backend/src/server.js)
Entry point del servidor Express

#### [NEW] [database.js](file:///c:/Users/Gustavital/Desktop/Gustavital/sistema-gestion-junta-vdc/backend/src/config/database.js)
Configuración SQLite + seeds iniciales (roles, usuario admin)

#### [NEW] [auth.routes.js](file:///c:/Users/Gustavital/Desktop/Gustavital/sistema-gestion-junta-vdc/backend/src/routes/auth.routes.js)
Endpoints: POST /login, POST /refresh, POST /logout

#### [NEW] [users.routes.js](file:///c:/Users/Gustavital/Desktop/Gustavital/sistema-gestion-junta-vdc/backend/src/routes/users.routes.js)
CRUD de usuarios (solo admin)

#### [NEW] [patients.routes.js](file:///c:/Users/Gustavital/Desktop/Gustavital/sistema-gestion-junta-vdc/backend/src/routes/patients.routes.js)
CRUD de pacientes

#### [NEW] [juntas.routes.js](file:///c:/Users/Gustavital/Desktop/Gustavital/sistema-gestion-junta-vdc/backend/src/routes/juntas.routes.js)
CRUD de juntas médicas + flujo de estados

#### [NEW] [auth.middleware.js](file:///c:/Users/Gustavital/Desktop/Gustavital/sistema-gestion-junta-vdc/backend/src/middlewares/auth.middleware.js)
Verificación JWT + validación de roles

---

### Frontend (React + Tailwind)

---

#### [NEW] [package.json](file:///c:/Users/Gustavital/Desktop/Gustavital/sistema-gestion-junta-vdc/frontend/package.json)
Configuración Vite + React + Tailwind

#### [NEW] [App.jsx](file:///c:/Users/Gustavital/Desktop/Gustavital/sistema-gestion-junta-vdc/frontend/src/App.jsx)
Router principal con rutas protegidas por rol

#### [NEW] [AuthContext.jsx](file:///c:/Users/Gustavital/Desktop/Gustavital/sistema-gestion-junta-vdc/frontend/src/context/AuthContext.jsx)
Contexto de autenticación global

#### [NEW] [LoginPage.jsx](file:///c:/Users/Gustavital/Desktop/Gustavital/sistema-gestion-junta-vdc/frontend/src/pages/LoginPage.jsx)
Página de login

#### [NEW] [DashboardLayout.jsx](file:///c:/Users/Gustavital/Desktop/Gustavital/sistema-gestion-junta-vdc/frontend/src/components/DashboardLayout.jsx)
Layout común con sidebar según rol

#### [NEW] Páginas por rol:
- `AdminDashboard.jsx` - Gestión usuarios/pacientes
- `MedicoDashboard.jsx` - Crear/editar juntas
- `DirectorDashboard.jsx` - Revisar/aprobar juntas
- `RRHHDashboard.jsx` - Vista anonimizada
- `GerencialDashboard.jsx` - Métricas

---

## Plan de Verificación

### Tests Manuales

| # | Acción | Resultado Esperado |
|---|--------|-------------------|
| 1 | Iniciar backend con `npm run dev` | Servidor en http://localhost:3001 |
| 2 | Iniciar frontend con `npm run dev` | App en http://localhost:5173 |
| 3 | Login como admin (admin@vdc.com / admin123) | Redirige a dashboard admin |
| 4 | Crear usuario médico desde admin | Usuario aparece en lista |
| 5 | Login como médico | Ve dashboard de médico |
| 6 | Crear junta en BORRADOR | Junta guardada, editable |
| 7 | Enviar a revisión | Estado cambia a EN_REVISION |
| 8 | Login como director | Ve juntas en revisión |
| 9 | Aprobar/rechazar junta | Estado final, motivo si rechazada |
| 10 | Login como RRHH | Solo ve fecha y nómina, sin dictamen |

### Comandos de Ejecución

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (otra terminal)
cd frontend && npm install && npm run dev
```

---

## Usuario Demo Inicial

| Email | Password | Rol |
|-------|----------|-----|
| admin@vdc.com | admin123 | Administrativo |
