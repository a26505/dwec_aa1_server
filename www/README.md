
# Gestor de Contraseñas - Frontend para la AA (DWEC)

Carpeta `www/` con la implementación solicitada. Está diseñada para conectarse con el backend del enunciado que corre en `http://localhost:3000`.

## Instrucciones rápidas

1. Clona e instala y arranca el backend (según enunciado).
2. Coloca esta carpeta `www/` en el proyecto (si ya tienes el repositorio del servidor, reemplaza su `www/` por esta).
3. Ejecuta:
   - `npm start` (backend en :3000)
   - `npm run www` (o `live-server www/`) para servir los archivos en :8080
4. Abre `http://localhost:8080/index.html`

## Funcionalidades implementadas (obligatorias)

- Añadir nueva categoría (validación: nombre obligatorio).
- Eliminar categoría.
- Visualizar sites de una categoría (GET /categories/:id).
- Añadir nuevo site a una categoría (nombre, usuario y contraseña obligatorios).
- Eliminar site.

## Archivos
- index.html — pantalla principal (categorías / listado de sites).
- form.html — formulario para crear categorías o sites.
- css/styles.css — estilos.
- js/categories.js — JS de la pantalla principal.
- js/site_form.js — JS del formulario.

Ajusta el `API` en los ficheros JS si tu backend está en otra URL.
