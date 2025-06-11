import { Router } from "express";
import { methods as usuarioController} from "./../controllers/usuario.controller";


const router = Router();

router.get("/obtenerDatosUsuario", usuarioController.obtenerDatosUsuario)
router.post("/registrarUsuario", usuarioController.crearUsuario)


export default router;