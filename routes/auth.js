/*

path: api/login

*/


const{Router}= require('express');
const {check} = require('express-validator');


const {crearUsuario, loginUsuario, renewToken} = require('../controllers/authC');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router =Router();

//Validamos con un Midellware es el 2do argumento
router.post('/new',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El Email es Requerido').not().isEmpty(),
    check('email', 'El correo no es válido; Intente nuevamente!!!').isEmail(),
    check('password', 'El  password debe ser minimo 6 caracteres; Intente nuevamente!!!').isLength({ min: 6 }),
    validarCampos,
],crearUsuario);

//Login usuario

router.post('/',[
    check('email', 'El correo no es válido; Intente nuevamente!!!').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
],loginUsuario);

//validarJWT,
router.get('/renew', validarJWT, renewToken);


module.exports = router;