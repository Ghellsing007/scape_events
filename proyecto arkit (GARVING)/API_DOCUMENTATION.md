# 📚 Documentación de la API - Meetup App

## 🔑 Autenticación
Todos los endpoints requieren autenticación mediante JWT, excepto los marcados como públicos.

### Headers Requeridos
```
Authorization: Bearer <token>
Content-Type: application/json
```

## 📍 Endpoints

### 👤 Usuarios

#### Registro
```http
POST /auth/register
```
**Cuerpo:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### Login
```http
POST /auth/login
```
**Cuerpo:**
```json
{
  "email": "string",
  "password": "string"
}
```

#### Perfil
```http
GET /auth/me
```

### 🎉 Eventos

#### Listar Eventos
```http
GET /events
```
**Query Params:**
- `page`: número de página
- `limit`: eventos por página
- `category`: filtro por categoría
- `location`: filtro por ubicación

#### Crear Evento
```http
POST /events
```
**Cuerpo:**
```json
{
  "title": "string",
  "description": "string",
  "datetime_start": "ISO date",
  "datetime_end": "ISO date",
  "location_id": "number",
  "group_id": "number",
  "is_virtual": "boolean"
}
```

#### RSVP
```http
POST /events/:id/rsvp
```
**Cuerpo:**
```json
{
  "status": "going" | "interested" | "not_going"
}
```

### 👥 Grupos

#### Listar Grupos
```http
GET /groups
```

#### Crear Grupo
```http
POST /groups
```
**Cuerpo:**
```json
{
  "name": "string",
  "description": "string"
}
```

#### Mensajes
```http
POST /groups/:id/messages
```
**Cuerpo:**
```json
{
  "content": "string"
}
```

## 📊 Códigos de Estado

| Código | Descripción |
|--------|-------------|
| 200 | OK |
| 201 | Creado |
| 400 | Error en la solicitud |
| 401 | No autorizado |
| 403 | Prohibido |
| 404 | No encontrado |
| 500 | Error del servidor |

## 🔒 Seguridad

### Rate Limiting
- 100 solicitudes por minuto por IP
- 1000 solicitudes por hora por usuario

### Validación
- Todos los inputs son validados con Zod
- Sanitización de datos en cada endpoint

## 📝 Notas de Implementación

### Paginación
- Por defecto: 20 items por página
- Máximo: 100 items por página

### Ordenamiento
- Por defecto: ordenado por fecha de creación (desc)
- Campos ordenables: `created_at`, `datetime_start`, `title`

### Búsqueda
- Búsqueda por texto en títulos y descripciones
- Filtros por categoría, ubicación y fecha

## 🧪 Ejemplos de Uso

### Crear un Evento
```javascript
const response = await fetch('/api/events', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: "Meetup de Programación",
    description: "Discusión sobre las últimas tendencias",
    datetime_start: "2024-03-20T18:00:00Z",
    location_id: 1
  })
});
```

### Obtener Eventos
```javascript
const response = await fetch('/api/events?page=1&limit=10', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
``` 