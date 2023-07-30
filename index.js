import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import anuncioRoutes from "./routes/anuncioRoutes.js";

const app = express()
app.use("/", express.json());

dotenv.config();

conectarDB();

//Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOption = {
    origin: function(origin, callback) {
        if(whitelist.includes(origin)){
            callback(null, true);
        } else {
            callback(new Error("Error de Cors"));
        }
    }
}

app.use(cors(corsOption ))

//Routing
app.use("/api/usuarios", usuarioRoutes); // use acepta todos los verbos http
app.use("/api/anuncios", anuncioRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});