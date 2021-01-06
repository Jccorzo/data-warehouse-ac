const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const middlewares = require('./middlewares/validation');
const userRoutes = require('./routes/user');
const contactRoutes = require('./routes/contact');
const companyRoutes = require('./routes/company');
const app = express();


app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('*', middlewares.validateLogin);

userRoutes(app);
contactRoutes(app);
companyRoutes(app);

app.listen(3001, () => {
    console.log('app started')
})