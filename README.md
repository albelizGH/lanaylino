Servicios

* Login:

    . POST - /api/login
        body:
        {
            usuario: string,
            password: string
        }
* Productos:
    . GET - /api/obtenerProductos

    . POST - /api/crearCategoria
        body: 
        {
            nombre: string
        }

    . POST - /api/cargarProducto
        body:
        {
            nombre: string
            descripcion: string
            precio: number
            genero: string
            id_categoria: number
            imagen: string

        }
    .
* Usuarios:
    . POST - /api/registrarUsuario
        body:
        {
            nombre: string
            apellido: string
            direccion: string
            email: string
            telefono: string
            rol: string
            password: password

        }
    . GET - /api/obtenerDatosUsuario/:id

    . POST - /api/modificarUsuario/:id
    body:
        {
            nombre: string
            apellido: string
            direccion: string
            email: string
            telefono: string
            rol: string
            password: password

        }
    

