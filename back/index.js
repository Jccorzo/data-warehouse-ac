const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const middlewares = require('./middlewares/validation');
const userRoutes = require('./routes/user');
const contactRoutes = require('./routes/contact');
const companyRoutes = require('./routes/company');
const config = require('./config');
const app = express();


app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use('*', middlewares.validateLogin);

mongoose.set('useUnifiedTopology',true);

// CONECTAR A LA BASE DE DATOS MONGO
mongoose.connect(config.url,{
    useNewUrlParser:true
}).then(()=> {
    console.log("conexion exitosa con la base de datos");
}).catch( err => {
    console.log('no se pudo conectar a la base de datos',  err);
    process.exit();
});

userRoutes(app);
contactRoutes(app);
companyRoutes(app);

app.listen(3001, () => {
    console.log('app started')
})