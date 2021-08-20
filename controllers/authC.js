const {response} = require('express');
const  Usuario  = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const usuario = require('../models/usuario');


const crearUsuario = async (req, res = response)=>{

    
    const {email, password}= req.body;
    
    try {
const existeEmail = await Usuario.findOne({email});
if(existeEmail){
    return res.status(400).json({
        ok: false,
        msg:'El en correo ya esta registrado'
    });
}

    const usuario = new Usuario(req.body);

    //Encriptar password

    const salt = bcrypt.genSaltSync();

    usuario.password = bcrypt.hashSync(password, salt);
    
    //Generar el JWT
    const token = await generarJWT(usuario.id);
    await usuario.save();
      res.json({
          ok: true,
          msg:'Crear usuario!!!',
          usuario,
          token
          // body:req.body
      });
    
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'Error del servidor; Hable con el ADM...'
    })
}
}

const loginUsuario = async (req, res = response)=>{
    const {email, password}= req.body;
//Verificar si existe el email

try {
        const usuario = await Usuario.findOne({email});
        
        if(!usuario){
            return res.status(404).json({
                ok:false,
                msg:'Usuario / Password no son correcto - correo',
            });
        }
        //Verificar la contrasena
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok:false,
                msg: 'Usuario / Password no son correctos - Password',
            })
        }
        // Gererar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            ok:true,
             msg: 'Login OK',
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrado',
        });
    }

}

const renewToken = async(req, res = response)=>{
    const uid =req.uid;
    // const ee = req.body;
    // Gererar el JWT
    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);
    res.json({
        ok:true,
        msg:'Renew',
        usuario,
        // body: ee,
        token,
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
}