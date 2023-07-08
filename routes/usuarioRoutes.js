import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
  editarUsuario,
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Autenticacion, Registro y Confirmacion de Usuarios
router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword);

router.get("/perfil", checkAuth, perfil);
router.put("/editar/:id", checkAuth, editarUsuario )

export default router;
