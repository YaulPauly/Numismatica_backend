import express from "express";
import {
    verTotalAnuncios,
    verAnuncios,
    verAnuncio,
    crearAnuncio,
    editarAnuncio,
    eliminarAnuncio,
} from "../controllers/anuncioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
    .route("/")
    .get(checkAuth, verAnuncios)
    .post(checkAuth, crearAnuncio);

router.get("/publicos", verTotalAnuncios)

router
    .route("/:id")
    .get(checkAuth, verAnuncio)
    .put(checkAuth, editarAnuncio)
    .delete(checkAuth, eliminarAnuncio);


export default router;
