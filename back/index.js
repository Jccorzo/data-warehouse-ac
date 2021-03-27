const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const middlewares = require('./middlewares/validation');
const userRoutes = require('./routes/user');
const contactRoutes = require('./routes/contact');
const companyRoutes = require('./routes/company');
const regionRoutes = require('./routes/region');
const countryRoutes = require('./routes/country');
const cityRoutes = require('./routes/city');
const config = require('./config');
const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use('*', middlewares.validateLogin);

mongoose.set('useUnifiedTopology', true);

// CONECTAR A LA BASE DE DATOS MONGO
mongoose.connect(`mongodb://${config.host}:27017/dataW`, {
    useNewUrlParser: true
}).then(() => {
    console.log("conexion exitosa con la base de datos");
}).catch(err => {
    console.log('no se pudo conectar a la base de datos', err);
    process.exit();
});

userRoutes(app);
contactRoutes(app);
companyRoutes(app);
regionRoutes(app);
countryRoutes(app);
cityRoutes(app);

app.listen(3001, () => {
    console.log('app started')
})