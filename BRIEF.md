# BRIEF FINAL - Sistema de Gestión de Juntas Médicas VDC

## Resumen Ejecutivo

Aplicación web para gestión de juntas médicas donde médicos evaluadores cargan expedientes/juntas (dictamen médico + nómina de participantes), que quedan almacenadas en un historial consultable por usuarios con distintos roles (administrativo, médico evaluador, director médico, RRHH, gerencial).

**Objetivo principal:** Permitir que un médico cargue una junta y que actores autorizados la consulten, editen o aprueben según su rol.

---

## Objetivos

| Tipo | Descripción |
|------|-------------|
| **Principal** | Carga y almacenamiento seguro de juntas médicas con historial consultable por roles |
| **Secundario** | Gestión de usuarios/roles |
| **Secundario** | Asignación de fechas para juntas |
| **Secundario** | Auditoría (quién hizo qué y cuándo) |
| **Secundario** | Trazabilidad de aprobaciones/rechazos con motivo |
| **Secundario** | Búsqueda y filtros de historial |
| **Secundario** | Métricas gerenciales |

---

## Roles y Permisos

### Administrativo
- Crear/editar usuarios
- Gestionar roles
- Configuración del sistema
- Programar juntas
- Asignar participantes
- Crear listado de pacientes

### Médico Evaluador
- Crear nueva junta
- Editar junta propia mientras esté en estado BORRADOR
- Ver historial de sus pacientes
- **Requiere:** Matrícula, DNI, Especialidad

### Director Médico
- Revisar juntas
- Aprobar/rechazar con comentario obligatorio
- **NO puede** modificar contenido original (solo estado + nota)
- **Requiere:** Matrícula, DNI, Especialidad

### RRHH
- Consulta limitada (vista anonimizada)
- **Solo ve:** Fecha realizada + Nómina (médicos y pacientes)
- **NO ve:** Contenido del dictamen médico
- Exportar reportes agregados

### Gerencial
- Visualización de métricas/estadísticas:
  - Cantidad de juntas por período
  - Tiempos de aprobación
  - Tasas de rechazo
- Acceso a juntas con restricciones (no ver datos sensibles sin autorización adicional)

---

## Modelo de Datos

### `users`
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| id | UUID | ✓ | PK |
| nombre_completo | VARCHAR(255) | ✓ | |
| email | VARCHAR(255) | ✓ | Único |
| dni | VARCHAR(15) | ✓ | Único |
| matricula | VARCHAR(50) | Condicional | Requerido para médico evaluador y director médico |
| especialidad | VARCHAR(100) | Condicional | Requerido para médico evaluador y director médico |
| role_id | FK → roles | ✓ | |
| hashed_password | VARCHAR(255) | ✓ | |
| estado | ENUM | ✓ | ACTIVO, INACTIVO |
| created_at | TIMESTAMP | ✓ | |
| updated_at | TIMESTAMP | ✓ | |

### `roles`
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| id | UUID | ✓ | PK |
| nombre | VARCHAR(50) | ✓ | administrativo, medico_evaluador, director_medico, rrhh, gerencial, superadmin |
| permisos | JSONB | ✓ | Array de permisos específicos |

### `patients`
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| id | UUID | ✓ | PK |
| nombre_completo | VARCHAR(255) | ✓ | |
| dni | VARCHAR(15) | ✓ | Único |
| fecha_nacimiento | DATE | ✓ | |
| sexo | ENUM | ✓ | M, F, OTRO |
| telefono | VARCHAR(20) | | |
| email | VARCHAR(255) | | |
| direccion_calle | VARCHAR(255) | | |
| direccion_numero | VARCHAR(20) | | |
| direccion_localidad | VARCHAR(100) | | |
| direccion_provincia | VARCHAR(100) | | |
| direccion_cp | VARCHAR(10) | | |
| created_at | TIMESTAMP | ✓ | |
| updated_at | TIMESTAMP | ✓ | |

### `juntas_medicas`
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| id | UUID | ✓ | PK |
| medico_evaluador_id | FK → users | ✓ | Quien crea la junta |
| fecha_programada | DATE | | Puede ser NULL |
| fecha_realizacion | DATE | | Se completa al realizar |
| estado | ENUM | ✓ | BORRADOR, EN_REVISION, APROBADA, RECHAZADA |
| dictamen_contenido | JSONB | ✓ | Contenido del dictamen médico (demo por ahora) |
| motivo_rechazo | TEXT | | Obligatorio si estado = RECHAZADA |
| director_revisor_id | FK → users | | Director que revisó |
| fecha_revision | TIMESTAMP | | |
| created_at | TIMESTAMP | ✓ | |
| updated_at | TIMESTAMP | ✓ | |

### `participantes_junta`
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| id | UUID | ✓ | PK |
| junta_id | FK → juntas_medicas | ✓ | |
| paciente_id | FK → patients | | Si es paciente |
| usuario_id | FK → users | | Si es médico/observador |
| rol_en_junta | ENUM | ✓ | PACIENTE, MEDICO, OBSERVADOR |
| asistencia_confirmada | BOOLEAN | | Default false |

### `documentos`
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| id | UUID | ✓ | PK |
| junta_id | FK → juntas_medicas | ✓ | |
| filename | VARCHAR(255) | ✓ | |
| storage_path | VARCHAR(500) | ✓ | |
| content_type | VARCHAR(50) | ✓ | Solo: application/pdf, image/jpeg, image/png |
| uploaded_by | FK → users | ✓ | |
| checksum | VARCHAR(64) | ✓ | SHA-256 |
| created_at | TIMESTAMP | ✓ | |

### `audit_logs`
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| id | UUID | ✓ | PK |
| entidad_tipo | VARCHAR(50) | ✓ | user, junta, patient, documento |
| entidad_id | UUID | ✓ | |
| accion | VARCHAR(50) | ✓ | CREATE, UPDATE, DELETE, APPROVE, REJECT, VIEW |
| datos_anteriores | JSONB | | Snapshot antes del cambio |
| datos_nuevos | JSONB | | Snapshot después del cambio |
| usuario_id | FK → users | ✓ | |
| ip_address | VARCHAR(45) | | IPv4/IPv6 |
| timestamp | TIMESTAMP | ✓ | |

---

## Flujo de Estados

```
┌──────────┐    Enviar a     ┌─────────────┐
│ BORRADOR │ ──────────────► │ EN_REVISION │
└──────────┘    revisión     └─────────────┘
     │                              │
     │                    ┌─────────┴─────────┐
     │                    ▼                   ▼
     │            ┌──────────┐         ┌───────────┐
     │            │ APROBADA │         │ RECHAZADA │
     │            └──────────┘         └───────────┘
     │                                       │
     ▼                                       │
 (editable)                           (NO vuelve a BORRADOR)
```

**Reglas:**
- Solo BORRADOR es editable por el médico evaluador
- RECHAZADA requiere motivo_rechazo obligatorio
- Una junta rechazada NO puede volver a BORRADOR

---

## Arquitectura Técnica

### Stack
| Capa | Tecnología |
|------|------------|
| Frontend | React + Tailwind CSS |
| Backend | Node.js + Express |
| Base de Datos | PostgreSQL |
| Autenticación | JWT + Refresh Tokens |
| Storage | Sistema de archivos local (demo) / S3 (producción) |
| Cache | Redis (opcional para producción) |

### Estructura de Proyecto
```
sistema-gestion-junta-vdc/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── utils/
│   ├── uploads/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── context/
│   └── package.json
└── README.md
```

---

## Campos PENDIENTES

> [!IMPORTANT]
> El contenido específico del **dictamen médico** será definido posteriormente cuando el usuario proporcione el documento con los campos a rellenar. Por ahora se implementará un formulario demo.

---

## Documentos Aceptados

- **PDF:** `application/pdf`
- **Imágenes:** `image/jpeg`, `image/png`

---

## Restricciones de Seguridad

1. Contraseñas hasheadas con bcrypt (mínimo 10 rounds)
2. JWT con expiración de 1 hora + refresh token de 7 días
3. Rate limiting en endpoints de autenticación
4. Validación de roles en cada endpoint
5. Logs de auditoría para todas las operaciones críticas
6. Sanitización de inputs para prevenir SQL injection/XSS
