
const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');


const bands = new Bands();
    bands.addBand(new Band('Oscarcito'));
    bands.addBand(new Band('Amigos Invisibles'));
    bands.addBand(new Band('Zapato tres'));
    bands.addBand(new Band('Hombres G'));
    bands.addBand(new Band('Moises y su Banda de locos'));
    
    // console.log(bands);
//Mensajes de socket
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });

     client.on('mensaje', (payload)=>{
         console.log('Mensaje', payload);
         io.emit('mensaje', {admin: 'Nuevo mensaje'})
     });

     client.on('vote-band', (payload)=>{
        //  console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
     })
     client.on('add-band', (payload)=>{
         const newBand = new Band(payload.name);
        // console.log(payload);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
     })

     client.on('delete-band', (payload)=>{
        const deleteBand = (payload.id);
       // console.log(payload);
       bands.deleteBand(deleteBand);
       io.emit('active-bands', bands.getBands());
    })
    //  client.on('emitir-mensaje', (payload)=>{
        
    //     // io.emit('nuevo-mensaje', payload);//emite a todos
    //     client.broadcast.emit('nuevo-mensaje', payload);//Emite a todos menos el que envia
    // })
  });