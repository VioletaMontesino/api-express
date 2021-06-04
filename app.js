const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const connectDB = require('./server/database/connection');



// Importamos variables
dotenv.config({path:'config.env'})
const PORT = process.env.PORT;

// Configuramos app express
const app = express();

// Configuramos logs
app.use(morgan('tiny'));

// Conexión a MongoDB
connectDB();

//  Middleware para parsear la request
app.use(bodyParser.urlencoded({extended:true}));

// Configuramos el motor ejs
app.set('view engine', 'ejs')
//app.set('views', path.resolve(__dirname,'views'))

// Configuramos los assets
app.use('/css',express.static(path.resolve(__dirname, 'assets/css')))
app.use('/img',express.static(path.resolve(__dirname, 'assets/img')))
app.use('/js',express.static(path.resolve(__dirname, 'assets/js')))

// Conexión al router
app.use('/',require('./server/routes/router'))


// Middleware para  manejar los errores (handling)
app.use(function(err,req,res,next) {
    //console.log(err);
    res.status(422).send({error: err.message});
})

// Iniciando el servidor
app.listen(PORT, function(){
    console.log(`Servidor excuchando por el puerto ${PORT}`);
});
