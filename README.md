# Módulo de Diagnóstico - Backend (AQUALUB)

Este es el backend del módulo de diagnóstico, construido con Node.js, Express y TypeScript. Se conecta a una base de datos MySQL.

## ¿Qué se implementó y corrigió en esta versión?

1. **Estructura y Arquitectura (POO)**:
   - Se organizó el código siguiendo el patrón de Capas (Rutas -> Controladores -> Servicios -> Repositorios).
   - Se refactorizaron las clases `TemplatePreguntaController` y `TemplatePreguntaService` para instanciar las dependencias correctamente dentro de sus constructores (evitando variables globales y mejorando la inyección de dependencias).
   - Se corrigió el contexto de `this` en las rutas de Express usando *Arrow Functions* en los controladores.

2. **Configuración del Servidor Express**:
   - Se construyó el punto de entrada de la aplicación (`app.ts` y `server.ts`) para inicializar el servidor.
   - Se configuraron middlewares clave como `cors` (para permitir peticiones del frontend) y `express.json()`.
   - Se estructuró la URL base enfocada al módulo. Ahora todo funciona bajo: `/api/diagnostico`.

3. **Conexión a la Base de Datos**:
   - Se implementó la conexión usando `mysql2/promise` mediante un Pool de conexiones.
   - **Nota importante**: Se le agregó una tolerancia a fallos. Si las credenciales de la base de datos local son incorrectas, el servidor mostrará una alerta en la terminal pero **NO** detendrá su ejecución, permitiendo que la API siga corriendo y escuchando peticiones en el puerto 3000.

---

## Instrucciones para el Compañero Desarrollador

Para probar y arrancar el servidor en tu máquina local:

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar la Base de Datos MySQL
En el archivo `src/config/db.ts` encontrarás los parámetros de conexión. Por defecto intentará conectarse a `localhost`, con usuario `root` (sin contraseña) y a la base de datos `aqualub_db`. 
*Asegúrate de tener la base de datos creada en tu motor local o modifica esas variables según tu entorno.*

### 3. Iniciar el Servidor (Modo Dev)
```bash
npm run dev
```
La aplicación correrá en **http://localhost:3000**

---

## Endpoints Principales

- **Base / Bienvenida**: `GET http://localhost:3000/api/diagnostico`
- **Obtener todas las preguntas**: `GET http://localhost:3000/api/diagnostico/template-preguntas`
- **Obtener por ID**: `GET http://localhost:3000/api/diagnostico/template-preguntas/:id`
- **Crear pregunta**: `POST http://localhost:3000/api/diagnostico/template-preguntas`
- **Actualizar pregunta**: `PUT http://localhost:3000/api/diagnostico/template-preguntas/:id`
- **Eliminar pregunta**: `DELETE http://localhost:3000/api/diagnostico/template-preguntas/:id`
