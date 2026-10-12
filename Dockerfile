# Usar una imagen base ligera de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto en el que corre tu API (ej. 3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]