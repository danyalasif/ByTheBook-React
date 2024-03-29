import cors from 'cors';
import express from 'express';
const app = express();
import session from 'express-session';
import mongoose from 'mongoose';
import logger from 'morgan';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import path from 'path';
import User from './models/userSchema';
import index from './routes/index';
import reviews from './routes/reviews';
import users from './routes/users';
import cart from './routes/cart';
import { createServer } from 'http';
import MongoStore from 'connect-mongo';

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(
    () => {
        console.log('Mongoose Connection Successful');
    },
    err => {
        console.log(err);
    }
);

app.use(cors());
app.options('*', cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const staticFiles = express.static(path.join(__dirname, '../../client/build'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(expressValidator());
app.use(
    session({
        key: 'Reactive Session',
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ client: mongoose.connection.getClient() })

    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(staticFiles);

//Passport Configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to pass the user info to all routes
app.use(function (req, res, next) {
    //make available inside our template
    res.locals.currentUser = req.user;
    //important: move to the code that handles the route
    next();
});

app.use('/api', index);
app.use('/api/users', users);
app.use('/api/reviews', reviews);
app.use('/api/cart', cart);
app.use('/*', staticFiles);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind =
        typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log(`Up on http://localhost:${addr.port}`);
}



/**
 * Get port from environment and store in Express.
 */

 const port = process.env.APP_PORT || process.env.PORT || 3001;
 app.set('port', port);


/**
 * Create HTTP server.
 */

 const server = createServer(app);

 /**
  * Listen on provided port, on all network interfaces.
  */
 
 server.listen(port, () => console.log('Example app listening on port ' + port));
 server.on('error', onError);
 server.on('listening', onListening);


export default app;
