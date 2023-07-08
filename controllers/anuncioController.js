import Anuncio from "../models/Anuncio.js";

const verTotalAnuncios = async (req,res) => {
    const anunciosTotal = await Anuncio.find();
    res.json(anunciosTotal)
};

const verAnuncios = async (req,res) => {
    const anuncios = await Anuncio.find().where("creador").equals(req.usuario)
    res.json(anuncios)
};
const verAnuncio = async (req,res) => {
    const { id } = req.params;
    const anuncio = await Anuncio.findById(id);

    if(!anuncio) {
        const error = new Error("No encontrado");
        return res.status(404).json({msg: error.message});
    };

    if(anuncio.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no válida");
        return res.status(401).json({msg: error.message})
    }

    res.json(anuncio);
};

const crearAnuncio = async (req,res) => {
    const anuncio = new Anuncio(req.body);
    anuncio.creador = req.usuario._id;
    anuncio.email = req.usuario.email;
    anuncio.celular = req.usuario.celular;
    anuncio.whatsapp = req.usuario.whatsapp;

    try {
        const anuncioAlmacenado = await anuncio.save();
        res.json(anuncioAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const editarAnuncio = async (req,res) => {
    const { id } = req.params;
    const anuncio = await Anuncio.findById(id);

    if(!anuncio) {
        const error = new Error("No encontrado");
        return res.status(404).json({msg: error.message});
    };

    if(anuncio.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no válida");
        return res.status(401).json({msg: error.message})
    }

    anuncio.titulo = req.body.titulo || anuncio.titulo;
    anuncio.img = req.body.img || anuncio.img;
    anuncio.descripcion = req.body.descripcion || anuncio.descripcion;
    anuncio.precio = req.body.precio || anuncio.precio;
    anuncio.año = req.body.año || anuncio.año;
    anuncio.disponibilidad = req.body.disponibilidad || anuncio.disponibilidad;
    anuncio.estado = req.body.estado || anuncio.estado;
    anuncio.precio = req.body.precio || anuncio.precio;

    try {
        const anuncioAlmacenado = await anuncio.save();
        res.json(anuncioAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const eliminarAnuncio = async (req,res) => {
    const { id } = req.params;
    const anuncio = await Anuncio.findById(id);

    if(!anuncio) {
        const error = new Error("No encontrado");
        return res.status(404).json({msg: error.message});
    };

    if(anuncio.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no válida");
        return res.status(401).json({msg: error.message})
    }

    try {
        await anuncio.deleteOne();
        res.json({msg: "Proyecto Eliminado"});
    } catch (error) {
        console.log(error);
    }
};

export {
    verTotalAnuncios,
    verAnuncios,
    verAnuncio,
    crearAnuncio,
    editarAnuncio,
    eliminarAnuncio,
};