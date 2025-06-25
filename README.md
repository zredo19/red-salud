# Sistema de Gestión para Clínica RedSalud
Este proyecto es una aplicación web full-stack diseñada para gestionar los boxes de atención, especialidades y profesionales de la Clínica RedSalud. La aplicación permite una administración
eficiente garantizando la coherencia entre los profesionales y los recursos asignados.

## Características Principales
El sistema cuenta con tres roles de usuario con diferentes niveles de acceso y funcionalidades:

## Administrador del Sistema
- Gestión de Especialidades: Crear, leer, actualizar y eliminar especialidades médicas.
- Gestión de Profesionales: Crear, leer, actualizar y eliminar perfiles de profesionales médicos.

## Coordinador de Boxes
- Gestión de Boxes: Crear, leer y actualizar los boxes de atención.
- Asignación de Especialidad a Box: Vincular un box a una especialidad médica específica.
- Gestión de Estado: Cambiar el estado de un box entre 'Disponible' y 'En mantención'.
- Gestión de Agenda: Crear y visualizar los bloques de atención, asignando profesionales y boxes.

## Doctor
- Consulta de Agenda: Visualizar su propia agenda de citas programadas de forma clara y sencilla.

# Stack Tecnológico
Este proyecto está construido con una arquitectura moderna de cliente-servidor:
- Frontend: Angular
- Backend: Node js(con Nest)
- Base de Datos: SQLite
  
La base de datos SQLite se autogenera en un archivo redsalud.db en la carpeta del backend, lo que hace que la configuración inicial sea extremadamente simple, sin necesidad de instalar
un gestor de base de datos externo.

# Estructura del Proyecto
El repositorio está organizado en dos carpetas principales, una para el frontend y otra para el backend:
/redsalud-gestion/
├── 📁 backend/     # Aplicación de NestJS (API)
└── 📁 frontend/    # Aplicación de Angular (Interfaz de Usuario)

# Instalación y Puesta en Marcha
Sigue estos pasos para levantar el proyecto completo en tu entorno local. ¡No necesitas instalar ninguna base de datos!

## Prerrequisitos
Asegúrate de tener instalado el siguiente software en tu máquina:
- Node.js (versión LTS recomendada)
- npm (normalmente se instala con Node.js)
- Angular CLI: npm install -g @angular/cli
- NestJS CLI: npm install -g @nestjs/cli

## Configuración del Backend
Primero, configuraremos y pondremos en marcha el servidor de la API.
```
# 1. Clona el repositorio (si aún no lo has hecho)
git clone <URL_DE_TU_REPOSITORIO>
cd redsalud-gestion/backend

# 2. Instala las dependencias de Node.js
# Este comando leerá el package.json e instalará todas las librerías necesarias.
npm install

# 3. Inicia el servidor de NestJS
npm run start:dev
```
¡Listo! Al iniciar, el backend creará automáticamente un archivo de base de datos llamado redsalud.db. La primera vez que se ejecute, el "Seeder" poblará esta base de datos con los usuarios
y datos iniciales. Tu backend ahora debería estar corriendo en http://localhost:3000.

## Configuración del Frontend
Ahora, en una nueva terminal, configuraremos la interfaz de usuario.
```
# 1. Navega a la carpeta del frontend
cd ../frontend  # (Asegúrate de estar en la carpeta redsalud-gestion/frontend)

# 2. Instala las dependencias de Node.js
npm install

# 3. Inicia la aplicación de Angular
# La opción --open abrirá automáticamente el navegador por ti.
ng serve --open
```
Tu frontend ahora debería estar corriendo y visible en http://localhost:4200.

## Credenciales
El sistema se inicia con tres usuarios creados por el "Seeder" del backend:
- Administrador del Sistema, email: admin@redsalud.cl, contraseña: admin123
- Coordinador de Boxes, email: coordinador@redsalud.cl, contraseña: coord123
- Doctor, email: doctor@redsalud.cl, contraseña: doc123

Si en algún momento deseas restaurar la base de datos a su estado inicial, simplemente detén el servidor del backend, elimina el archivo redsalud.db y vuelve a iniciar el servidor.
