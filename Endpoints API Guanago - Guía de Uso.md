# API de Destinos Turísticos de Guanago

Esta API proporciona información sobre destinos turísticos en Guanacaste, Costa Rica.

## Base URL

```
http://localhost:8080/guanago
```

## Endpoints Disponibles

### 1. Registrar un Nuevo Usuario

- **URL:** `/registrar`
- **Método HTTP:** POST
- **Descripción:** Registra un nuevo usuario en el sistema.
- **Cuerpo de la Solicitud:** Debe contener los datos del usuario en formato JSON, incluyendo los siguientes campos:
  - `email` (String, obligatorio): El correo electrónico del usuario.
  - `contrasena` (String, obligatorio): La contraseña del usuario.
  - `nombre` (String, obligatorio): El nombre del usuario.
  - `apellido` (String, obligatorio): El apellido del usuario.
- **Respuesta Exitosa:** Retorna un código de estado 200 junto con los datos del usuario registrado en formato JSON.
- **Posibles Errores:**
  - `400 Bad Request`: Si la solicitud está mal formada o falta algún campo obligatorio.
  - `409 Conflict`: Si ya existe un usuario con el mismo correo electrónico.
- **Ejemplo de Solicitud:**

  ```http
  POST http://localhost:8080/guanago/usuarios/registrar
  Content-Type: application/json

  {
    "email": "ejemplo@gmail.com",
    "contrasena": "contraseña123",
    "nombre": "Juan",
    "apellido": "Pérez"
  }
  ```

- **Ejemplo de Respuesta Exitosa:**
  ```json
  {
    "id": 1,
    "email": "ejemplo@gmail.com",
    "nombre": "Juan",
    "apellido": "Pérez",
    "reservasId": null,
    "preferenciasId": null,
    "datosPersonalesId": null,
    "itinerarioId": null,
    "informacionPagoId": null
  }
  ```

### 2. Iniciar Sesión de Usuario

- **URL:** `/login`
- **Método HTTP:** POST
- **Descripción:** Permite a un usuario iniciar sesión en el sistema.
- **Cuerpo de la Solicitud:** Debe contener los datos de inicio de sesión en formato JSON, incluyendo los siguientes campos:
  - `email` (String, obligatorio): El correo electrónico del usuario.
  - `contrasena` (String, obligatorio): La contraseña del usuario.
- **Respuesta Exitosa:** Retorna un código de estado 200 junto con un token de autenticación en formato JSON.
- **Posibles Errores:**
  - `401 Unauthorized`: Si las credenciales de inicio de sesión son incorrectas.
- **Ejemplo de Solicitud:**

  ```http
  POST http://localhost:8080/guanago/usuarios/login
  Content-Type: application/json

  {
    "email": "ejemplo@gmail.com",
    "contrasena": "contraseña123"
  }
  ```

- **Ejemplo de Respuesta Exitosa:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### 3. Obtener Destinos en Oferta

- **URL:** `/en-oferta`
- **Método HTTP:** GET
- **Descripción:** Obtiene la lista de destinos turísticos que están en oferta.
- **Parámetros de la Solicitud:** No se requieren parámetros adicionales.
- **Respuesta Exitosa:** Retorna un código de estado 200 junto con la lista de destinos en oferta en formato JSON.
- **Ejemplo de Solicitud:**
  ```http
  GET http://localhost:8080/guanago/destinos/en-oferta
  ```
- **Ejemplo de Respuesta Exitosa:**
  ```json
  [
    {
      "id": 1,
      "imagen_dest": "imagen1.jpg",
      "dest_title": "Destino en Oferta 1",
      "lugar": "Ubicación del destino en oferta 1",
      "clasificacion": "9.2",
      "impuestos": 13,
      "descripcion": "Descripción del destino en oferta 1",
      "precio": 150000.0,
      "en_oferta": "1",
      "precio_oferta": 30
    },
    {
      "id": 2,
      "imagen_dest": "imagen2.jpg",
      "dest_title": "Destino en Oferta 2",
      "lugar": "Ubicación del destino en oferta 2",
      "clasificacion": "8.3",
      "impuestos": 13,
      "descripcion": "Descripción del destino en oferta 2",
      "precio": 110000.0,
      "en_oferta": "1",
      "precio_oferta": 20
    }
  ]
  ```

### 4. Obtener Destinos Disponibles en un Intervalo de Fechas

- **URL:** `/disponibilidad`
- **Método HTTP:** GET
- **Descripción:** Obtiene la lista de destinos turísticos disponibles en un intervalo de fechas especificado.
- **Parámetros de la Solicitud:**
  - `inicio` (String, obligatorio): Fecha de inicio del intervalo en formato "yyyy-MM-dd".
  - `fin` (String, obligatorio): Fecha de fin del intervalo en formato "yyyy-MM-dd".
- **Respuesta Exitosa:** Retorna un código de estado 200 junto con la lista de destinos disponibles en el intervalo de fechas en formato JSON.
- **Posibles Errores:**
  - `400 Bad Request`: Si los parámetros de fecha están mal formados.
- **Ejemplo de Solicitud:**
  ```http
  GET http://localhost:8080/guanago/destinos/disponibilidad?inicio=2024-04-15&fin=2024-04-20
  ```
- **Ejemplo de Respuesta Exitosa:**
  ```json
  [
    {
      "id": 1,
      "imagen_dest": "imagen1.jpg",
      "dest_title": "Destino en Oferta 1",
      "lugar": "Ubicación del destino en oferta 1",
      "clasificacion": "9.2",
      "impuestos": 13,
      "descripcion": "Descripción del destino en oferta 1",
      "precio": 150000.0,
      "en_oferta": "1",
      "precio_oferta": 30
    },
    {
      "id": 2,
      "imagen_dest": "imagen2.jpg",
      "dest_title": "Destino en Oferta 2",
      "lugar": "Ubicación del destino en oferta 2",
      "clasificacion": "8.3",
      "impuestos": 13,
      "descripcion": "Descripción del destino en oferta 2",
      "precio": 110000.0,
      "en_oferta": "1",
      "precio_oferta": 20
    }
  ]
  ```

### 5. Obtener Destinos Reservados por un Usuario

- **URL:** `/destinos-reservados`
- **Método HTTP:** GET
- **Descripción:** Obtiene la lista de destinos turísticos reservados por un usuario autenticado.
- **Parámetros de la Solicitud:** No se requieren parámetros adicionales.
- **Cabecera de Autorización:** Se debe incluir un token de autenticación en la cabecera de la solicitud.
- **Respuesta Exitosa:** Retorna un código de estado 200 junto con la lista de destinos reservados por el usuario en formato JSON.
- **Posibles Errores:**
  - `401 Unauthorized`: Si el token de autenticación es inválido o ha expirado.
- **Ejemplo de Solicitud:**
  ```http
  GET http://localhost:8080/guanago/usuarios/destinos-reservados
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Ejemplo de Respuesta Exitosa:**
  ```json
  [
    {
      "id": 1,
      "imagen_dest": "imagen1.jpg",
      "dest_title": "Destino en Oferta 1",
      "lugar": "Ubicación del destino en oferta 1",
      "clasificacion": "9.2",
      "impuestos": 13,
      "descripcion": "Descripción del destino en oferta 1",
      "precio": 150000.0,
      "en_oferta": "1",
      "precio_oferta": 30
    },
    {
      "id": 2,
      "imagen_dest": "imagen2.jpg",
      "dest_title": "Destino en Oferta 2",
      "lugar": "Ubicación del destino en oferta 2",
      "clasificacion": "8.3",
      "impuestos": 13,
      "descripcion": "Descripción del destino en oferta 2",
      "precio": 110000.0,
      "en_oferta": "1",
      "precio_oferta": 20
    }
  ]
  ```

### 6. Registrar Reserva de un Destino para un Usuario

- **URL:** `/registrar-destino/{idDestino}/{fecha_inicio}/{fecha_fin}`
- **Método HTTP:** POST
- **Descripción:** Registra una reserva de destino para un usuario autenticado.
- **Parámetros de la Solicitud:**
  - `idDestino` (int, obligatorio): ID del destino a reservar.
  - `fecha_inicio` (String, obligatorio): Fecha de inicio de la reserva en formato "yyyy-MM-dd".
  - `fecha_fin` (String, obligatorio): Fecha de fin de la reserva en formato "yyyy-MM-dd".
- **Cabecera de Autorización:** Se debe incluir un token de autenticación en la cabecera de la solicitud.
- **Respuesta Exitosa:** Retorna un objeto JSON con los detalles de la reserva.
- **Posibles Errores:**
  - `400 Bad Request`: Si los parámetros de fecha están mal formados.
  - `401 Unauthorized`: Si el token de autenticación es inválido o ha expirado.
- **Ejemplo de Solicitud:**
  ```http
  POST http://localhost:8080/guanago/usuarios/registrar-destino/1/2024-05-01/2024-05-07
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Ejemplo de Respuesta Exitosa:**
  ```json
  {
    "destino": {
      "id": 1,
      "imagen_dest": "imagen1.jpg",
      "dest_title": "El Mangroove Papagayo, Autograph Collection",
      "lugar": "Papagayo",
      "clasificacion": "8.4",
      "impuestos": 13,
      "descripcion": "Descripción del destino reservado 1",
      "precio": 200000.0,
      "en_oferta": "0",
      "precio_oferta": 0
    },
    "fecha_inicio": "2024-05-02",
    "fecha_fin": "2024-05-05",
    "precioAntesDelDescuento": 626000.0,
    "precioTotal": 626000.0
  }
  ```

### 7. Buscar Destinos Filtrados

- **URL:** `/buscar-destino`
- **Método HTTP:** GET
- **Descripción:** Busca destinos turísticos disponibles según los criterios de filtro especificados.
- **Parámetros de la Solicitud:**
  - `lugar` (String, obligatorio): Lugar o ubicación del destino.
  - `inicio` (String, obligatorio): Fecha de inicio del intervalo en formato "yyyy-MM-dd".
  - `fin` (String, obligatorio): Fecha de fin del intervalo en formato "yyyy-MM-dd".
  - `precio` (int, obligatorio): Precio máximo por día del destino.
- **Respuesta Exitosa:** Retorna un código de estado 200 junto con la lista de destinos filtrados en formato JSON.
- **Posibles Errores:**
  - `400 Bad Request`: Si los parámetros de fecha están mal formados.
- **Ejemplo de Solicitud:**
  ```http
  GET http://localhost:8080/guanago/destinos/buscar-destino?lugar=tamarindo&inicio=2024-04-02&fin=2024-04-04&precio=300000
  ```
- **Ejemplo de Respuesta Exitosa:**
  ```json
  [
    {
      "id": 1,
      "imagen_dest": "imagen1.jpg",
      "dest_title": "Destino en Oferta 1",
      "lugar": "Ubicación del destino en oferta 1",
      "clasificacion": "9.2",
      "impuestos": 13,
      "descripcion": "tamarindo",
      "precio": 300000.0,
      "en_oferta": "1",
      "precio_oferta": 30
    },
    {
      "id": 2,
      "imagen_dest": "imagen2.jpg",
      "dest_title": "Destino en Oferta 2",
      "lugar": "tamarindo",
      "clasificacion": "8.3",
      "impuestos": 13,
      "descripcion": "Descripción del destino en oferta 2",
      "precio": 220000.0,
      "en_oferta": "1",
      "precio_oferta": 20
    }
  ]
  ```

### 8. Crear Itinerario

- **URL:** `/crear-itinerario`
- **Método HTTP:** POST
- **Descripción:** Crea un nuevo itinerario para un usuario autenticado.
- **Cuerpo de la Solicitud:** Debe contener los datos del itinerario en formato JSON, incluyendo los siguientes campos:
  - `nombre_lugar` (String, obligatorio): Nombre del lugar del itinerario.
  - `descripcion` (String, obligatorio): Descripción del itinerario.
  - `fecha_inicio` (String, obligatorio): Fecha de inicio del itinerario en formato "yyyy-MM-dd".
  - `fecha_fin` (String, obligatorio): Fecha de fin del itinerario en formato "yyyy-MM-dd".
  - `ciudad_destino` (String, obligatorio): Ciudad de destino del itinerario.
  - `pais_destino` (String, obligatorio): País de destino del itinerario.
  - `actividades` (String, obligatorio): Actividades planificadas para el itinerario.
- **Cabecera de Autorización:** Se debe incluir un token de autenticación en la cabecera de la solicitud.
- **Respuesta Exitosa:** Retorna un objeto JSON con los detalles del itinerario creado.
- **Posibles Errores:**
  - `400 Bad Request`: Si la solicitud está mal formada o falta algún campo obligatorio.
  - `401 Unauthorized`: Si el token de autenticación es inválido o ha expirado.
- **Ejemplo de Solicitud:**

  ```http
  POST http://localhost:8080/guanago/destinos/crear-itinerario
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  Content-Type: application/json

  {
      "nombre_lugar": "Lugar del Itinerario",
      "descripcion": "Descripción del Itinerario",
      "fecha_inicio": "2024-06-15",
      "fecha_fin": "2024-06-26",
      "ciudad_destino": "Guanacaste",
      "pais_destino": "Costa Rica",
      "actividades": "Actividades planificadas",
      "destino": {
          "id": 2
      }
  }
  ```

- **Ejemplo de Respuesta Exitosa:**
  ```json
  {
    "id": 1,
    "nombre_lugar": "Lugar del Itinerario",
    "descripcion": "Descripción del Itinerario",
    "fecha_inicio": "2024-06-01",
    "fecha_fin": "2024-06-07",
    "ciudad_destino": "Guanacaste",
    "pais_destino": "Costa Rica",
    "actividades": "Actividades planificadas"
    "destino": {
          "id": 2
      }
  }
  ```

### 9. Obtener Itinerarios del Usuario

- **URL:** `/obtener-itinerarios`
- **Método HTTP:** GET
- **Descripción:** Obtiene todos los itinerarios asociados a un usuario autenticado.
- **Cabecera de Autorización:** Se debe incluir un token de autenticación en la cabecera de la solicitud.
- **Respuesta Exitosa:** Retorna un objeto JSON con la lista de itinerarios del usuario.
- **Posibles Errores:**
  - `401 Unauthorized`: Si el token de autenticación es inválido o ha expirado.
- **Ejemplo de Solicitud:**
  ```http
  GET http://localhost:8080/guanago/destinos/obtener-itinerarios
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Ejemplo de Respuesta Exitosa:**
  ```json
  [
    {
      "id": 1,
      "nombre_lugar": "Lugar del Itinerario 1",
      "descripcion": "Descripción del Itinerario 1",
      "fecha_inicio": "2024-06-01",
      "fecha_fin": "2024-06-07",
      "ciudad_destino": "Ciudad de Destino 1",
      "pais_destino": "País de Destino 1",
      "actividades": "Actividades planificadas 1"
      "destino": {
          "id": 1,
          "imagen_dest": "imagen1.jpg",
          "dest_title": "Destino en Oferta 1",
          "lugar": "Ubicación del destino en oferta 1",
          "clasificacion": "9.2",
          "impuestos": 13,
          "descripcion": "tamarindo",
          "precio": 300000.0,
          "en_oferta": "1",
          "precio_oferta": 30
      }
    },
    {
      "id": 2,
      "nombre_lugar": "Lugar del Itinerario 2",
      "descripcion": "Descripción del Itinerario 2",
      "fecha_inicio": "2024-06-10",
      "fecha_fin": "2024-06-15",
      "ciudad_destino": "Ciudad de Destino 2",
      "pais_destino": "País de Destino 2",
      "actividades": "Actividades planificadas 2"
      "destino": {
          "id": 1,
          "imagen_dest": "imagen1.jpg",
          "dest_title": "Destino en Oferta 1",
          "lugar": "Ubicación del destino en oferta 1",
          "clasificacion": "9.2",
          "impuestos": 13,
          "descripcion": "tamarindo",
          "precio": 300000.0,
          "en_oferta": "1",
          "precio_oferta": 30
      }
    }
  ]
  ```

### 10. Editar Itinerario

- **URL:** `/editar-itinerario`
- **Método HTTP:** PUT
- **Descripción:** Edita un itinerario existente.
- **Cuerpo de la Solicitud:** Debe contener los datos actualizados del itinerario en formato JSON.
- **Respuesta Exitosa:** Retorna el itinerario editado en formato JSON.
- **Posibles Errores:**
  - `404 Not Found`: Si el itinerario no existe.
- **Ejemplo de Solicitud:**

  ```http
  PUT http://localhost:8080/guanago/destinos/editar-itinerario
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

  {
    "id": 1,
    "nombre_lugar": "Nuevo Nombre del Itinerario",
    "descripcion": "Nueva Descripción del Itinerario",
    "fecha_inicio": "2024-07-01",
    "fecha_fin": "2024-07-10",
    "ciudad_destino": "Nueva Ciudad de Destino",
    "pais_destino": "Nuevo País de Destino",
    "actividades": "Nuevas Actividades planificadas"
  }
  ```

- **Ejemplo de Respuesta Exitosa:**
  ```json
  {
    "id": 1,
    "nombre_lugar": "Nuevo Nombre del Itinerario",
    "descripcion": "Nueva Descripción del Itinerario",
    "fecha_inicio": "2024-07-01",
    "fecha_fin": "2024-07-10",
    "ciudad_destino": "Nueva Ciudad de Destino",
    "pais_destino": "Nuevo País de Destino",
    "actividades": "Nuevas Actividades planificadas"
  }
  ```

### 11. Crear una Reseña para un Destino

- **URL:** `/crear-resena`
- **Método HTTP:** POST
- **Descripción:** Crea una nueva reseña para un destino específico.
- **Cuerpo de la Solicitud:** Debe contener los datos de la reseña en formato JSON, incluyendo los siguientes campos:
  - `resena` (String, obligatorio): La reseña del destino.
- **Parámetros de la Solicitud:**
  - `destino_id` (Integer, obligatorio): El ID del destino al que se asociará la reseña.
- **Respuesta Exitosa:** Retorna un código de estado 200 junto con un mensaje indicando que la reseña se ha agregado exitosamente.
- **Posibles Errores:**
  - `400 Bad Request`: Si la solicitud está mal formada o falta algún campo obligatorio.
- **Ejemplo de Solicitud:**

  ```http
  POST http://localhost:8080/guanago/destinos/crear-resena?destino_id=1
  Content-Type: application/json

  {
    "resena": "Este destino es increíble, ¡me encantó!"
  }
  ```

- **Ejemplo de Respuesta Exitosa:**

  ```json
  {
    "mensaje": "Reseña Agregada Exitosamente"
  }
  ```

### 12. Obtener Reseñas de un Destino

- **URL:** `/resenas-destino`
- **Método HTTP:** GET
- **Descripción:** Obtiene todas las reseñas asociadas a un destino específico.
- **Parámetros de la Solicitud:**
  - `destinoId` (Integer, obligatorio): El ID del destino del cual se quieren obtener las reseñas.
- **Respuesta Exitosa:** Retorna un código de estado 200 junto con una lista de objetos JSON que representan las reseñas del destino especificado.
- **Posibles Errores:**
  - `400 Bad Request`: Si la solicitud está mal formada o falta el parámetro `destinoId`.
- **Ejemplo de Solicitud:**

  ```http
  GET http://localhost:8080/guanago/destinos/resenas-destino?destinoId=1
  ```

- **Ejemplo de Respuesta Exitosa:**
  ```json
  [
    {
      "id": 1,
      "resena": "Este destino es increíble, ¡me encantó!"
    },
    {
      "id": 2,
      "resena": "Una experiencia maravillosa, definitivamente volveré."
    }
  ]
  ```

### 13. Obtener Destino por ID

- **URL:** `/destinoById`
- **Método HTTP:** GET
- **Descripción:** Obtiene un destino específico por su ID.
- **Parámetros de la Solicitud:**
  - `destinoId` (Integer, obligatorio): El ID del destino que se desea obtener.
- **Respuesta Exitosa:** Retorna un objeto JSON que representa el destino solicitado.
- **Posibles Errores:**
  - `404 Not Found`: Si no se encuentra ningún destino con el ID proporcionado.
- **Ejemplo de Solicitud:**

  ```http
  GET http://localhost:8080/guanago/destinos/destinoById?destinoId=1
  ```

- **Ejemplo de Respuesta Exitosa:**
  ```json
      "id": 2,
      "imagen_dest": "imagen2.jpg",
      "dest_title": "Destino en Oferta 2",
      "lugar": "Ubicación del destino en oferta 2",
      "clasificacion": "8.3",
      "impuestos": 13,
      "descripcion": "Descripción del destino en oferta 2",
      "precio": 110000.0,
      "en_oferta": "1",
      "precio_oferta": 20
    }
  ```

### 14. Editar Usuario

- **URL:** `/editar-usuario`
- **Método HTTP:** PUT
- **Descripción:** Permite al usuario editar su información en el sistema.
- **Encabezado de la Solicitud:** Debe contener el token de autenticación del usuario en el encabezado `Authorization`.
- **Cuerpo de la Solicitud:** Debe contener los datos actualizados del usuario en formato JSON, incluyendo los siguientes campos:
  - `nombre` (String, opcional): El nuevo nombre del usuario.
  - `apellido` (String, opcional): El nuevo apellido del usuario.
- **Respuesta Exitosa:** Retorna un código de estado 200 junto con un mensaje indicando que la información del usuario ha sido actualizada correctamente.
- **Posibles Errores:**
  - `401 Unauthorized`: Si el token de autenticación es inválido o no está presente en el encabezado.
- **Ejemplo de Solicitud:**

  ```http
  PUT http://localhost:8080/guanago/usuarios/editar-usuario
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

  {
    "nombre": "NuevoNombre",
    "apellido": "NuevoApellido"
  }
  ```

- **Ejemplo de Respuesta Exitosa:**
  ```json
  {
    "mensaje": "Usuario actualizado correctamente"
  }
  ```

### 15. Editar Contraseña del Usuario

- **URL:** `/editar-contrasena`
- **Método HTTP:** PUT
- **Descripción:** Permite al usuario editar su contraseña en el sistema.
- **Encabezado de la Solicitud:** Debe contener el token de autenticación del usuario en el encabezado `Authorization`.
- **Cuerpo de la Solicitud:** Debe contener la nueva contraseña del usuario en formato JSON, incluyendo el siguiente campo:
  - `contrasena` (String, obligatorio): La nueva contraseña del usuario.
- **Respuesta Exitosa:** Retorna un código de estado 200 junto con un mensaje indicando que la contraseña del usuario ha sido actualizada correctamente.
- **Posibles Errores:**
  - `401 Unauthorized`: Si el token de autenticación es inválido o no está presente en el encabezado.
- **Ejemplo de Solicitud:**

  ```http
  PUT http://localhost:8080/guanago/usuarios/editar-contrasena
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

  {
    "contrasena": "NuevaContraseña123"
  }
  ```

- **Ejemplo de Respuesta Exitosa:**
  ```json
  {
    "mensaje": "Contraseña actualizada correctamente"
  }
  ```

### 16. Obtener Datos del Usuario

- **URL:** `/datos-usuario`
- **Método HTTP:** GET
- **Descripción:** Obtiene los datos del usuario actualmente autenticado en el sistema.
- **Encabezado de la Solicitud:** Debe contener el token de autenticación del usuario en el encabezado `Authorization`.
- **Respuesta Exitosa:** Retorna un objeto JSON que representa los datos del usuario, sin incluir la contraseña ni información sensible.
- **Posibles Errores:**
  - `401 Unauthorized`: Si el token de autenticación es inválido o no está presente en el encabezado.
- **Ejemplo de Solicitud:**

  ```http
  GET http://localhost:8080/datos-usuario
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

- **Ejemplo de Respuesta Exitosa:**
  ```json
  {
    "id": 1,
    "email": "usuario@example.com",
    "contrasena": null,
    "nombre": "Nombre",
    "apellido": "Apellido",
    "reservas": null,
    "preferencias": null,
    "informacionPago": null
  }
  ```
