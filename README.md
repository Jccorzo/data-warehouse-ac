#README.md

## Instrucciones para ejecutar el proyecto!

Este proyecto fue construido para ejecutarse de dos formas diferentes
Además, poseé dos usuarios para ingresar a la app:

    Usuario 1: jsmith@mail.com
    contraseña: 123456
    Admin: false

    Usuario 2: jford@mail.com
    contraseña 123456
    Admin: true

### 1. Mediante docker compose

Ejecutando el comando `docker-compose up` . Se creará un contenedor para la base de datos, uno para el back y uno para el front. Además se ejecuta un script el cual crea los usuarios en la bd, para que la aplicación quede lista para usar cuando los tres contenedores anteriores estén arriba.
(se necesita disponibilidad en los puertos: 27017, 3000, 30001 )

### 2. Manualmente

Es necesario tener instalado previamente mongoDB, y ejecutandose localmente, ya que es la base de datos que usa el proyecto.

#### 1. Poblar base de datos
    En la raíz de proyecto, ejecutar: `cd back`, y luego `npm run seed`

#### 2. Ejecutar Back
    En la raíz de proyecto, ejecutar: `cd back`, y luego `npm run start`

#### 3. Ejecutar Front
    En la raíz de proyecto, ejecutar: `cd front`, y luego `npm run start`


Después de haber ejecutado la aplicación de cualquiera de los dos métodos mencionados anteriormente, podrás acceder al front medinte la siguiente url:  **http://localhost:3000/** 

