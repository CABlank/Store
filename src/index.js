const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');


const {database} = require('./keys');

//  initializations 
const app = express();
require('./lib/passport');



//settings 
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));     
    
app.set('view engine', '.hbs');



//middlewares
app.use(session({   
    secret: 'mysupersecreto',   
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'database_users'
    })
}))
app.use(flash());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());




//global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    next();
});



//routes
app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/products-seller', require('./routes/products-seller'));


//public
app.use(express.static(path.join(__dirname, 'public')));


//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
}); 

