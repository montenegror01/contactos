
# Proyecto Angular

## Requisitos del sistema

- Node.js >= 14.x
- NPM >= 6.x
- Angular CLI >= 12.x

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/montenegror01/contactos.git
cd tcontactos
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
ng serve
o
npm start
```

4. Cambiar la url de la api
Se modifica el archivo src/services/contact.service.ts
en la linea de codigo
```
private apiUrl = 'http://tu-url-api/api/contactos';
```

5. Acceder a la aplicación en el navegador:

```
http://localhost:4200
```

