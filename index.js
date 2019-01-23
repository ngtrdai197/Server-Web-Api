const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// begin router
const customer = require('./routers/customer.router');
const user = require('./routers/user.router');
// end router
const database = require('./config/mongodb.config');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.options('*', cors()); // FE connect to server
database.dbConnection();

// API DOC usng Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/customer', customer);
app.use('/user', user);

app.get('/', (req, res) => {
    res.render('homepage');
})

app.listen(process.env.PORT || 8088, () => {
})