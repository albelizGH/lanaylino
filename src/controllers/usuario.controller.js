import { getConnection } from "./../database/database";
const secret = process.env.secret;
const jwt = require ("jsonwebtoken");

const obtenerDatosUsuario = async (req, res) => {
    try{
        const resultadoVerificar = verificarToken(req);
        if(resultadoVerificar.estado == false){
            return res.send({codigo: -1, mensaje: resultadoVerificar.error})
        }
        const id = req.params.id
        const connection = await getConnection();
        const [response,metadata] = await connection.query("SELECT * from usuario u where u.id_usuario = ?",id);
        console.log(response);
        if(response.length == 1){
            res.json({codigo: 200, mensaje:"OK", payload: response})
        }
        else{
            res.json({codigo: -1, mensaje:"Usuario no encontrado", payload: []})
        }

    }
    catch(error){
            res.status(500);
            res.send(error.message);
    }
}

const modificarUsuario = async (req, res) => {
    try{
        const resultadoVerificar = verificarToken(req);
        if(resultadoVerificar.estado == false){
            return res.send({codigo: -1, mensaje: resultadoVerificar.error})
        }
        const { id } = req.params
        const {
            nombre,
            apellido,
            direccion,
            email,
            telefono,
            rol,
            password
        } = req.body

        const usuario = {
            nombre,
            apellido,
            direccion,
            password,
            email,
            telefono,
            rol,
        }
        const connection = await getConnection();
        const response = await connection.query("UPDATE usuario u SET ? where u.id_usuario = ?",[usuario,id]);
        if(response.affectedRows > 0){
            res.json({codigo: 200, mensaje:"OK", payload: []})
        }
        else{
            res.json({codigo: -1, mensaje:"Error modificando datos del usuario", payload: []})
        }

    }
    catch(error){
            res.status(500);
            res.send(error.message);
    }
}

const crearUsuario = async (req, res) => {
    try{
        const {
            nombre,
            apellido,
            direccion,
            email,
            telefono,
            rol,
            password
        } = req.body

        const usuario = {
            nombre,
            apellido,
            direccion,
            password,
            email,
            telefono,
            rol,
        }

        const connection = await getConnection();
        const response = await connection.query("INSERT INTO usuario set ?",usuario)
        if(response){
            res.json ({codigo: 200, mensaje: "Usuario registrado exitosamente", payload: []});
        }
        else{
            res.json({codigo: -1, mensaje: "Error registrando usuario", payload: []});
        }
        
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }
}



function verificarToken(req){
    const typeToken = 'Bearer ';
    const tokenRecibido = req.headers.authorization;
    const token = req.headers.authorization && req.headers.authorization.startsWith(typeToken) ? req.headers.authorization.slice(typeToken.length) : null; 

    if(!token){
        return {estado: false, error: "Token no proporcionado"}
    }
    try{
        const payload = jwt.verify(token, secret);
        console.log(payload);
        if(Date.now() > payload.exp){
            return {estado: false, error: "Token expirado"}
        }
        return {estado: true};
    }
    catch(error){
        return {estado: false, error: "Token inválido"}
    }  

}

export const methods = {
    obtenerDatosUsuario,
    crearUsuario,
    modificarUsuario
}