# Delfosti Challegue

1. Crear una colección de productos en MongoDB y agregar 10 items con los siguientes valores:
   \_id
   name
   category
   name
   slug
   brand
   name
   slug
   slug
   status

2. Hacer los servicios para la gestión de productos:
   Servicios para CRUD:
   Obtener un producto
   Obtener varios productos con posibilidad de paginado
   Actualizar un producto
   Eliminar un producto
   Servicio de búsqueda:
   Crear un servicio con método de búsqueda que devuelva los items de productos que contengan la fracción de palabra en base a:
   Nombre de producto (name)
   URL de producto (slug)
   Nombre de categoría de producto (category {name})
   Nombre de marca de producto (brand {name})

3. Administrador de productos en Angular:
   - ### Listado de productos:
   1. Ordenados por fecha de creación con cabecera de nombre habilitada para ordenarlos por esa elección.
   2. Paginado de registros
   3. Caja de búsqueda que cumple con lo siguiente:
      - Sugerencia de autocompletado en lista desplegable al dejar de escribir en la caja de texto después de 0.5 segundos.
      - Ejecución de búsqueda con renderizado de contenido de listado en base al resultado.
   - ### Formulario para creación de producto
   - ### Formulario para editar producto
   - ### Popup de eliminación de producto
