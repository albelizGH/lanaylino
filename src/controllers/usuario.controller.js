import { getConnection } from "./../database/database";
const secret = process.env.secret;
const jwt = require ("jsonwebtoken");

const obtenerDatosUsuario = async (req, res) => {
    try{
        const resultadoVerificar = verificarToken(req);
        if(resultadoVerificar.estado == false){
            return res.send({codigo: -1, mensaje: resultadoVerificar.error})
        }
        const id = req.params
        const connection = await getConnection();
        const response = await connection.query("SELECT * from usuario u where u.id_usuario = ?",id);
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


function verificarToken(req){
    const token = req.headers.authorization;
    if(!token){
        return {estado: false, error: "Token no proporcionado"}
    }
    try{
        const payload = jwt.verify(token, secret);
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
    obtenerDatosUsuario
}