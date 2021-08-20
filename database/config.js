const mongoose = require('mongoose');

const dbConnection = async()=>{
    try {
        //Aqui establezco la conexion con el servidor
     await   mongoose.connect(process.env.DB_CNN,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
     });

     console.log('DB_Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el Admin');
    }
}


    module.exports ={
        dbConnection
    }
