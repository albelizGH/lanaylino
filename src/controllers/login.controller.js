import { getConnection } from "./../database/database";
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

// Controlador de login corregido
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ codigo: -1, mensaje: "El email y la contraseña son requeridos." });
        }

        const connection = await getConnection();
        
        // 1. Desestructura el resultado en [rows, fields]
        const [data, metadata] = await connection.query("SELECT id_usuario, nombre, apellido, rol FROM usuario WHERE email = ? AND password = ?", [email, password]);

        // 2. Verifica si se encontró un usuario (si el arreglo 'rows' tiene algo)
        if (data.length > 0) {
            console.log("Se encontró el usuario");
            console.log(data);
            
            // 3. Obtén el objeto del usuario
            const usuario = data[0];

            // 4. Crea el token JWT con los datos correctos y una mejor expiración
            const token = jwt.sign({
                sub: usuario.id_usuario, 
                name: usuario.nombre,   
            }, secret, {
                expiresIn: transformarTiempoASegundos(5), 
            });
            
            console.log(token);

            // 5. Envía solo el objeto del usuario en el payload
            res.json({ codigo: 200, mensaje: "OK", payload: usuario, jwt: token });

        } else {
            console.log("Usuario no encontrado");
            res.status(401).json({ codigo: -1, mensaje: "Usuario o contraseña incorrecta" }); 
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

function transformarTiempoASegundos(tiempoEnHoras){
  return Date.now() + tiempoEnHoras * 3600;
}

// const resetearPassword = async(req, res) => {
//     try{
//         const { id } = req.params
//         const {
//             password
//         } = req.body
//         const connection = await getConnection();
//         const respuesta = await connection.query("UPDATE usuario set password = ? where id_usuario = ?", [password, id]);
//         if(respuesta.affectedRows == 1){
//             res.json({codigo: 200, mensaje:"Contraseña restablecida", payload: []})
//         }
//         else{
//             res.json({codigo: -1, mensaje:"Usuario no encontrado", payload: []})
//         }
//         console.log(respuesta);
//     }
//     catch(error){
//         res.status(500);
//         res.send(error.message);
//     }
// }


export const methods = {
    login,
    // resetearPassword
};