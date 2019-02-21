const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const passport = require('passport');

// begin router
const user = require('./routers/user.router');
const mailer = require('./routers/nodemailer.router');
// end router
const database = require('./config/mongodb.config');
// cấu hình stragety
const configPassport = require("./middleware/passport");
configPassport.configStrategyJwt();
configPassport.configStrategyFacebook();
configPassport.configStrategyGithub();
// end cấu trình stragety

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.options('*', cors()); // FE connect to server
app.use(passport.initialize()); // initial passport
app.use(passport.session());
database.dbConnection();

// API DOC using Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// nodemailer


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/user', user);
app.use('/mail', mailer);

app.get('/', (req, res) => {
    res.render('homepage');
})

// app.get('/auth', passport.authenticate('facebook'));
const port = process.env.PORT || 8088
app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
})
