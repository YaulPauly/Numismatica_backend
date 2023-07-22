import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req,res) => {
    //Evitar registros duplicados por el email
    const {email, celular} = req.body;
    const existeUsuario = await Usuario.findOne({email}) || await Usuario.findOne({celular});
    if(existeUsuario){
        const error = new Error("Usuario ya registrado");
        res.status(400).json({msg: error.message})
    }

    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        await usuario.save();
        res.json({msg: "Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta"});
    } catch (error) {
        console.log(error);
    }
};


const autenticar = async (req, res) => {
    const {email, celular, password} = req.body;

    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({email}) || await Usuario.findOne({celular})
    if(!usuario) {
        const error = new Error("El Usuario no existe");
        return res.status(404).json({msg: error.message});
    }

    //Comprobar si el usuario esta confirmado
    if(!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({msg: error.message});
    }

    //Comprobar su password
    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id),
        });
        
    } else {
        const error = new Error("El Password es incorrecto");
        return res.status(404).json({msg: error.message});
    }
};

const confirmar = async (req,res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({token});
    if(!usuarioConfirmar) {
        const error = new Error("Token no valido");
        return res.status(403).json({msg: error.message})
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "";
        await usuarioConfirmar.save();
        res.json({msg: "Usuario Confirmado Correctamente"})
    } catch (error) {
        console.log(error);
    }
};

const olvidePassword = async (req, res) => {
    const { email, celular } = req.body;
    const usuario = await Usuario.findOne({ email }) || await Usuario.findOne({celular})
    if(!usuario) {
        const error = new Error("El Usuario no existe");
        return res.status(404).json({msg: error.message});
    }

    try {
        usuario.token = generarId();
        await usuario.save();
        res.json({msg: "Hemos enviado un email con las instrucciones"})
    } catch (error) {
        console.log(error);
    }
};

const comprobarToken = async (req,res) => {
    const { token } = req.params;

    const tokenValido = await Usuario.findOne({ token });
    if(tokenValido) {
        res.json({msg: "Token Valido y el Usuario Existe"})
    } else {
        const error = new Error("Token no valido");
        return res.status(403).json({msg: error.message})
    }
};

const nuevoPassword = async (req,res) => {
    const { token } = req.params;
    const {password}= req.body;

    const usuario = await Usuario.findOne({ token });
    if(usuario) {
        usuario.password = password;
        usuario.token = "";
        try {
            await usuario.save();
            res.json({msg: "Password Modificado Correctamente"})
        } catch (error) {
            console.log(error);
        }
    } else {
        const error = new Error("Token no valido");
        return res.status(403).json({msg: error.message})
    }
};

const perfil = (req,res) => {
    const { usuario } = req; //Esto viene del middleware checkAuth
    res.json(usuario)
};

const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    if(!usuario) {
        const error = new Error("No encontrado");
        return res.status(404).json({msg: error.message});
    };

    usuario.nombre = req.body.nombre || usuario.nombre;
    usuario.apellidos = req.body.apellidos || usuario.apellidos;
    usuario.password = req.body.password || usuario.password;
    usuario.email = req.body.email || usuario.email;
    usuario.celular = req.body.celular || usuario.celular;
    usuario.whatsapp = req.body.whatsapp || usuario.whatsapp;

    try {
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);
    } catch (error) {
        console.log();
    }


};

export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil,
    editarUsuario,
}