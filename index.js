const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const passport = require('passport');

// begin router
const user = require('./routers/user.router');
const mailer = require('./routers/nodemailer.router');
const post = require('./routers/post.router');
const categoryparent = require('./routers/category-parent.router');
const categorychild = require('./routers/category-child.router');
const search = require('./routers/search.router');
const area = require('./routers/area.router');
const image = require('./routers/upload.router');


// end router
const database = require('./config/mongodb.config');
// cấu hình stragety
const configPassport = require("./middleware/passport");
configPassport.configStrategyJwt();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors()); // FE connect to server
app.use(passport.initialize()); // initial passport
app.use(passport.session());
database.dbConnection();

// API DOC using Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/user', user);
app.use('/post', post);
app.use('/categoryparent', categoryparent);
app.use('/categorychild', categorychild);
app.use('/search', search);
app.use('/area', area);
app.use('/image', image);

// nodemailer
app.use('/mail', mailer);

app.get('/', (req, res) => {
    res.render('homepage');
})

// app.get('/auth', passport.authenticate('facebook'));
const port = process.env.PORT || 8088
app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
})
