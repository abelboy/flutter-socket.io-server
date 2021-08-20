const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El e-mail es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    online:{
        type: Boolean,
        default: false
    },
    

});

//Para sobre escribir la salida del json para no mostrar la contrasena
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
    //Vas a generar una instancia con sus valores respectivos

}
module.exports = model('Usuario', UsuarioSchema);