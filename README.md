# Sistema de Gestión de Empresa

## Descripción

***Sistema de Gestión de Empresa*** es una aplicación backend (API RESTful) desarrollada con ***Node.js y Express*** que permite administrar la información organizativa de una empresa, gestionando áreas departamentales y sus respectivos empleados. El proyecto implementa una base de datos local basada en un archivo plano mediante el uso del módulo de sistema de archivos, brindando control total sobre la persistencia de datos.

El objetivo principal es ofrecer una infraestructura sólida y eficiente para la lectura, escritura y estructuración de la gestión del recurso humano corporativo.

Actualmente incluye:
- Operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para todos los niveles de la organización.
- Gestión jerárquica integral: Entidad (Empresa), Departamentos y Empleados.
- Estructura modular (Patrón MVC) para organizar la lógica de negocio y las rutas.
- Backend independiente utilizando persistencia de datos en un archivo db.json mediante el módulo File System (fs) nativo de Node.js, eliminando dependencias externas.

---

## Tecnologías utilizadas
* Node.js
* Express
* Cors
* Módulo fs (File System) nativo

---

## Estructura del proyecto

gestion-empresa/
├── backend/
│   ├── config/         # Configuración y manipulación de la base de datos (db.js)
│   ├── controllers/    # Lógica de negocio (empresa, departamentos, empleados)
│   ├── models/         # Definición de estructuras de datos
│   ├── routes/         # Definición e indexación de los endpoints
│   ├── node_modules/   # Dependencias del manejador de paquetes
│   ├── app.js          # Punto de entrada y configuración del servidor
│   ├── db.json         # Base de datos persistente (archivo de texto plano JSON)
│   ├── package-lock.json
│   └── package.json
└── README.md

---

## Instalación

Siga estos pasos para ejecutar el proyecto localmente:

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

# 2. Entrar a la carpeta del backend
cd gestion-empresa/backend

# 3. Instalar dependencias
npm install
```

---

## Ejecución del proyecto

### 1. Iniciar el servidor
```bash
node app.js
```

* API disponible en: http://localhost:3000

---

## Uso

1. Ejecute el servidor mediante la consola de comandos.
2. Utilice un cliente HTTP diseñado para desarrollo de APIs como Postman o Insomnia.
3. Configure la solicitud hacia los endpoints pertinentes para interactuar con el sistema (`GET`, `POST`, `PUT`, `DELETE` en `/api/empresa`, `/api/departamentos`, `/api/empleados`).
4. Para operaciones de inserción y modificación de datos, envíe la carga útil (payload) dentro del cuerpo de la solicitud configurado en formato JSON (`raw`).

Este sistema está diseñado proporcionando una trazabilidad clara para el escalamiento a motores de base de datos formales en caso de ser requerido posteriormente.

---

## Scripts disponibles

```bash
node app.js       # Ejecuta el servidor principal
npm install       # Instala o restaura las dependencias necesarias
```

---

## Buenas prácticas implementadas
* Implementación de ***arquitectura MVC*** (Separación de Controladores y Rutas).
* Construcción de base de datos autónoma estructurada, abandonando entornos pre-compilados.
* Captura y manejo estandarizado de excepciones mediante bloques ***try/catch***.
* Códigos de estado HTTP rigurosamente aplicados (200, 201, 404, 500).
* Uso de ***Markdown*** formal y profesional para documentación.

---

## Contribución

Las contribuciones son bienvenidas. Para colaborar:

1. Haz un fork del proyecto
2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad)
3. Realiza tus cambios
4. Haz commit (git commit -m "Agrega nueva funcionalidad")
5. Haz push (git push origin feature/nueva-funcionalidad)
6. Abre un Pull Request

---

## Licencia

Puedes usarlo, modificarlo y distribuirlo libremente.

---

## Autor

Desarrollado para la materia y gestión del desarrollo backend empresarial.

---

## Notas adicionales
* Este proyecto utiliza un manejador de archivos personalizado mediante Node.js, por lo que no requiere conexión a un gestor de base de datos SQL / NoSQL (MySQL, MongoDB, etc.).
* El ambiente está optimizado para facilitar el aprendizaje arquitectónico empresarial y el prototipado backend avanzado.

---

# Estado del proyecto
En desarrollo activo. Las últimas optimizaciones incluyen el refinamiento en la modificación y eliminación de objetos unificados en la base de datos local y la correcta separación del enrutamiento.

¿Ideas, bugs o sugerencias? ¡Abre un issue!

# Gracias por visitar Sistema de Gestión de Empresa
