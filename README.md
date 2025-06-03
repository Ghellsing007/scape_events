# Scape Events API

## Descripción General
Scape Events es una API REST desarrollada con Node.js, Express y PostgreSQL, utilizando Prisma como ORM. El sistema permite la gestión de eventos y usuarios.

## Estructura del Proyecto
```
scape_events/
├── prisma/
│   ├── schema.prisma    # Esquema de la base de datos
│   └── seed.ts         # Datos de prueba
├── index.js            # Punto de entrada de la aplicación
├── package.json        # Dependencias y scripts
└── .env               # Variables de entorno
```

## Modelos de Datos

### User
```prisma
model User {
  id        Int        @id @default(autoincrement())
  name      String
  email     String     @unique
  password  String
  events    Event[]    @relation("UserEvents")
  attendees Attendee[]
}
```

### Event
```prisma
model Event {
  id          Int        @id @default(autoincrement())
  title       String
  description String?
  category    String
  date        DateTime
  location    String
  creatorId   Int
  creator     User       @relation(fields: [creatorId], references: [id], name: "UserEvents")
  attendees   Attendee[]
  likes       Int        @default(0)
  views       Int        @default(0)
}
```

### Attendee
```prisma
model Attendee {
  id        Int     @id @default(autoincrement())
  userId    Int
  eventId   Int
  confirmed Boolean @default(false)
  user      User    @relation(fields: [userId], references: [id])
  event     Event   @relation(fields: [eventId], references: [id])

  @@unique([userId, eventId])
}
```

## Configuración Inicial

### 1. Instalación de Dependencias
```bash
npm install
```

### 2. Configuración de la Base de Datos
Crear archivo `.env` con la URL de la base de datos:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/scape_events?schema=public"
```

### 3. Generación del Cliente Prisma
```bash
npx prisma generate
```

### 4. Población de Datos de Prueba
```bash
npm run seed
```

## Endpoints Disponibles

### GET /
- **Descripción**: Ruta de prueba
- **Respuesta**: 
  ```json
  {
    "message": "API de Scape Events funcionando correctamente"
  }
  ```

### GET /api/events
- **Descripción**: Obtiene todos los eventos
- **Respuesta**: Lista de eventos con información del creador
- **Incluye**: Datos del creador (id, nombre, email)

## Pasos Siguientes para la Entrega

### 1. Implementación de Funcionalidades Pendientes

#### Autenticación y Autorización
- [ ] Implementar registro de usuarios
- [ ] Implementar login con JWT
- [ ] Middleware de autenticación

#### Gestión de Eventos
- [ ] Crear evento (POST /api/events)
- [ ] Actualizar evento (PUT /api/events/:id)
- [ ] Eliminar evento (DELETE /api/events/:id)
- [ ] Obtener evento específico (GET /api/events/:id)

#### Gestión de Asistentes
- [ ] Confirmar asistencia (POST /api/events/:id/attend)
- [ ] Cancelar asistencia (DELETE /api/events/:id/attend)
- [ ] Listar asistentes (GET /api/events/:id/attendees)

### 2. Mejoras de Seguridad
- [ ] Implementar hash de contraseñas con bcrypt
- [ ] Validación de datos de entrada
- [ ] Manejo de errores global
- [ ] Rate limiting
- [ ] CORS configurado específicamente

### 3. Documentación Adicional
- [ ] Documentación de API con Swagger/OpenAPI
- [ ] Guía de despliegue
- [ ] Guía de contribución
- [ ] Documentación de pruebas

### 4. Pruebas
- [ ] Pruebas unitarias
- [ ] Pruebas de integración
- [ ] Pruebas de carga

### 5. Despliegue
- [ ] Configuración de variables de entorno para producción
- [ ] Scripts de migración para producción
- [ ] Configuración de CI/CD
- [ ] Monitoreo y logging

## Comandos Útiles
```bash
# Iniciar servidor en modo desarrollo
npm run dev

# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Poblar base de datos con datos de prueba
npm run seed

# Abrir Prisma Studio
npx prisma studio
```

## Consideraciones de Producción
1. Implementar logging
2. Configurar manejo de errores
3. Implementar caché
4. Configurar backup de base de datos
5. Implementar monitoreo
6. Configurar SSL/TLS
7. Implementar rate limiting
8. Configurar CORS específicamente

## Tecnologías Utilizadas
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- TypeScript
- JWT para autenticación
- bcrypt para hash de contraseñas

## Contribución
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia
Este proyecto está bajo la Licencia ISC.

## Contacto
Arkit SRL - [https://github.com/ArkitSRL/scape_events](https://github.com/ArkitSRL/scape_events)
