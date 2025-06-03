# 📱 ****** App - Documentación de Arquitectura Backend

## 📋 Resumen
Esta documentación describe la arquitectura backend para una aplicación tipo Meetup, diseñada para ser escalable, segura y compatible con plataformas web y móviles. Utiliza Node.js, Express y PostgreSQL como tecnologías principales, con un enfoque en un diseño modular y eficiente.

## 🏗️ Arquitectura General
La aplicación sigue una arquitectura cliente-servidor con una API RESTful:

- **Frontend**: React (web) / React Native (móvil)
- **Backend**: Node.js + Express
- **Base de datos**: PostgreSQL (relacional)
- **Autenticación**: JWT + BCrypt, con soporte para OAuth (Google/Facebook)
- **Almacenamiento**: Firebase Storage o AWS S3 para imágenes
- **Notificaciones**: Resend (email), OneSignal/FCM (push)
- **Documentación**: Swagger para endpoints

## 📊 Modelo de Datos (PostgreSQL)

### Tablas Principales
- 👥 `users` - Información de usuarios
- 👥 `groups` - Grupos de usuarios
- 📍 `locations` - Ubicaciones de eventos
- 🎉 `events` - Eventos creados
- ✅ `rsvps` - Confirmaciones de asistencia
- 💬 `messages` - Mensajes en grupos
- 🏷️ `categories` - Categorías de eventos

### Diagrama ER
```
┌────────────┐
│   users    │◄────────────┐
└────────────┘             │
   ▲     ▲                 ▼
   │     │             ┌────────────┐
   │     └────────────►│  messages  │◄────────────┐
   │                   └────────────┘             │
   │                                             │
   │                    ┌────────────┐            │
   ├───────────────────►│   groups   │────────────┘
   │                    └────────────┘
   │                           ▲
   │                           │
   │                           ▼
   │                     ┌────────────┐
   └────────────────────►│   events   │◄────────┐
                         └────────────┘         │
                              ▲                 │
                              │                 │
┌────────────┐               ▼                 ▼
│ locations  │         ┌────────────┐     ┌────────────┐
└────────────┘         │   rsvps    │     │event_categ.│
                       └────────────┘     └────────────┘
                                              ▲
                                              │
                                        ┌────────────┐
                                        │ categories │
                                        └────────────┘
```

## 🛠️ Tecnologías y Librerías

| Funcionalidad | Tecnología/Librería |
|---------------|-------------------|
| ORM | Prisma o Sequelize |
| Seguridad | Helmet, CORS, BCrypt |
| Validación | Zod o Joi |
| Autenticación | JWT + Passport.js |
| Subida de archivos | Multer + Firebase/S3 |
| Emails | Resend / Nodemailer |
| Notificaciones push | OneSignal / Firebase |
| Pruebas | Jest / Supertest |
| Documentación API | Swagger (swagger-jsdoc) |

## 📁 Estructura de Carpetas
```
/meetup-api
├── controllers/       # Lógica de los endpoints
├── models/           # Modelos de datos
├── routes/           # Definición de rutas
├── middlewares/      # Autenticación, validaciones
├── services/         # Lógica de negocio
├── utils/            # Funciones reutilizables
├── config/           # Configuraciones
├── migrations/       # Migraciones de base de datos
├── app.js           # Configuración de Express
└── server.js        # Entrada del servidor
```

## 📅 Plan de Desarrollo

### Fase 1: Planificación (Semana 1)
- Definir MVP
- Asignar roles
- Crear tablero Kanban

### Fase 2: Backend (Semanas 2-6)
- Inicialización del proyecto
- Configuración básica
- Modelo de datos
- Autenticación
- CRUD de eventos y RSVP
- Grupos y mensajes

### Fase 3: Frontend (Semanas 3-7)
- Desarrollo de interfaces
- Integración con API
- Implementación de funcionalidades

### Fase 4: Integración y QA (Semanas 8-10)
- Pruebas unitarias
- Validaciones
- Deploy

### Fase 5: Documentación y Entrega (Semanas 11-12)
- Documentación completa
- Demo funcional

## 👥 División de Equipo

| Rol | Tareas |
|-----|--------|
| Backend Lead | Prisma, endpoints, lógica de negocio |
| Frontend Lead | Interfaz web/móvil, diseño responsivo |
| QA/Integrador | Pruebas, documentación, deploy |
| Extra Dev | Soporte mixto según necesidad |

Para más detalles sobre decisiones pendientes y consideraciones técnicas, consulta [DECISIONES_PENDIENTES.md](./DECISIONES_PENDIENTES.md). 