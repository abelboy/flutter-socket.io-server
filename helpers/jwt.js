const jwt = require('jsonwebtoken');

//Necesita el uid del usuario, es lo que se graba en el payload
const generarJWT = (uid)=>{
  return new Promise((resolve, reject)=>{

    const payload = {uid};
    jwt.sign(payload, process.env.JWT_KEY,{
        expiresIn:'24h'
    }, (err, token)=>{
        if(err){
            //No se pudo crear el token
            reject('No se pudo generar el JWT');
        }else{
            //TOKEN
            resolve(token);
        }
    });

  });
};

module.exports = {
    generarJWT
}