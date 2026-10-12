# Proyecto Integrador: Pipeline CI/CD Automatizado para API REST

Este repositorio contiene la implementación de un flujo de trabajo continuo (CI/CD) para una API REST desarrollada en Node.js con Express. El proyecto incluye pruebas automatizadas, contenedorización y un despliegue automático en la nube utilizando AWS EC2.

## Arquitectura del Proyecto

El sistema está diseñado bajo una arquitectura de integración y despliegue continuo que conecta las siguientes tecnologías:

1. **Desarrollo (Backend):** API RESTful construida con Node.js y Express.js, exponiendo 10 endpoints (CRUD) para gestionar `users` y `products`.
2. **Pruebas Automatizadas:** Implementadas con Jest y Supertest para evaluar respuestas HTTP, manejo de errores y alcanzar una cobertura de código (Coverage) superior al 70%.
3. **Contenedorización:** Empaquetado de la aplicación y sus dependencias en una imagen Docker optimizada (`Dockerfile` y `.dockerignore`).
4. **Automatización (CI/CD):** Pipeline configurado en GitHub Actions (`.github/workflows/main.yml`) que se ejecuta en cada `push` o `pull_request` a la rama `main`.
5. **Repositorio de Artefactos:** Docker Hub, donde el pipeline publica automáticamente la imagen etiquetada con `:latest` y el hash del commit.
6. **Infraestructura en la Nube:** Servidor de producción en AWS EC2 (Ubuntu Server) conectado mediante SSH para el despliegue automático de contenedores expuestos en el puerto 80.

## Comandos Locales

Si deseas ejecutar este proyecto en tu entorno local para desarrollo o pruebas, sigue estos pasos:

### 1. Clonar el repositorio
```bash
git clone https://github.com/mauriciogabrielvazquez/Proyecto-Parcial-1.git
cd Proyecto-Parcial-1
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Levantar la API localmente
```bash
npm start
```
El servidor se iniciará en `http://localhost:3000`.

### 4. Ejecutar las Pruebas y Cobertura
```bash
npm run test
```
Este comando ejecutará la batería de pruebas y mostrará una tabla con el porcentaje de cobertura de código en la consola.

## Pasos de Configuración (Pipeline y AWS)

Para que el pipeline funcione correctamente, la infraestructura debe estar configurada en estricto cumplimiento con las normas de seguridad (sin exponer credenciales en el código fuente). 

1. **Servidor AWS EC2:**
   - Instancia con Ubuntu Server.
   - Puertos habilitados en el Security Group: 22 (SSH) y 80 (HTTP).
   - Docker instalado (`docker.io`).
2. **GitHub Secrets:**
   El repositorio debe tener configurados los siguientes secretos en *Settings > Secrets and variables > Actions*:
   - `DOCKER_USERNAME`: Usuario de Docker Hub.
   - `DOCKER_PASSWORD`: Personal Access Token (PAT) de Docker Hub.
   - `EC2_HOST`: Dirección IP pública del servidor AWS.
   - `EC2_USERNAME`: Usuario SSH (`ubuntu`).
   - `EC2_SSH_KEY`: Clave privada SSH (contenido del archivo `.pem`).

---
*Desarrollado para la práctica de Gestión del Proceso de Desarrollo.*