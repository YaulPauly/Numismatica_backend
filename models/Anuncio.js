import mongoose from "mongoose";

const anuncioSchema = mongoose.Schema({
        titulo: {
            type: String,
            required: true,
            trim: true
        },
        img: {
            type: [{
                type: String,
                trim: true
            }],
            required: true
        },
        descripcion: {
            type: String,
            required: true,
            trim: true
        },
        precio: {
            type: Number,
            required: true,
            trim: true,
        },
        año: {
            type: Number,
            required: true,
            trim: true,
        },
        disponibilidad: {
            type: Boolean,
            default: true,
        },
        estado: {
            type: String,
            enum: ['Perfecta condición', 'Deteriorado', 'Reacondicionado']
        },
        creador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        },
        celular: {
            type: mongoose.Schema.Types.Number,
            ref: "Usuario"
        },
        whatsapp: {
            type: mongoose.Schema.Types.Boolean,
            ref: "Usuario"
        },
        email: {
            type: mongoose.Schema.Types.String,
            ref: "Usuario"
        }
    }, 
    {
        timestamps: true,
    }
);

const Anuncio = mongoose.model("Anuncio", anuncioSchema);
export default Anuncio;