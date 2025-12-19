# Panadería - Sistema de Gestión

Bienvenido al repositorio del sistema de gestión para **Panadería**. Este proyecto permite administrar productos, categorías, pedidos y explorar la tienda online desde una interfaz moderna y fácil de usar.

## 🥖 Características Principales

- **Gestión de Productos:** Agrega, edita y elimina productos.
- **Gestión de Categorías:** Organiza productos en categorías. No se pueden eliminar categorías con productos asociados.
- **Búsqueda Avanzada:** Encuentra productos de manera rápida y visual con buscador inteligente.
- **Carrito de Compras:** Agrega productos al carrito, selecciona cantidad y gestiona tu compra.
- **Gestión de Pedidos:** Administra los pedidos de los clientes.
- **Diseño Responsivo:** Interfaz adaptable a móviles, tablets y computadoras.

## 🚀 Inicio Rápido

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/caramba-panaderia.git
   cd caramba-panaderia
   ```

2. **Instala las dependencias**
   ```bash
   bun install
   ```

3. **Configura el entorno**
   
   Crea un archivo `.env` en la raíz del proyecto con tus variables de entorno (por ejemplo, claves de Supabase, endpoints, etc).

4. **Ejecuta la aplicación**
   ```bash
   bun dev
   ```

## 📁 Estructura Principal

- `src/components/` - Componentes reutilizables (NavBar, tablas, formularios)
- `src/pages/` - Páginas de la app (admin de productos, categorías, tienda)
- `src/store/` - Estado global (por ejemplo: carrito)
- `src/hooks/` - Hooks personalizados para datos (productos, categorías)
- `src/schemas/` - Tipado y validaciones

## ✨ Detalles Destacados

- Uso de **React**, **Vite**, **TypeScript**, y **Supabase** para backend.
- Notificaciones amigables para confirmaciones y errores.
- Protecciones para evitar borrar productos o categorías accidentalmente.
- Búsqueda visual en tiempo real.

## 🛠️ Scripts Útiles

- `bun dev` - Inicia el entorno de desarrollo local
- `bun run build` - Compila la app para producción

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Puedes hacer un fork, crear tu rama y enviar un Pull Request.

1. Haz fork al repo
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit a tus cambios
4. Haz push a tu rama
5. Abre un Pull Request

## 📝 Licencia

MIT

## 📬 Contacto

Si tienes dudas o sugerencias, puedes contactar a los desarrolladores vía [correo electrónico](mailto:m.angelrequena20@gmail.com).

---

