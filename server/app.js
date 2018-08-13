import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
const app = express();
import session from 'express-session';
import expressValidator from 'express-validator';
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
require('dotenv').config();
// const MongoStore = ConnectMongo(app);
const MongoStore = require('connect-mongo')(session);
// 'mongodb://localhost:2000/bythebook'
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
const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(
    session({
        key: 'Reactive Session',
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//Passport Configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to pass the user info to all routes
app.use(function(req, res, next) {
    //make available inside our template
    res.locals.currentUser = req.user;
    //important: move to the code that handles the route
    next();
});

app.use('/api', index);
app.use('/api/users', users);
app.use('/api/reviews', reviews);
app.use('/api/cart', cart);
app.use('/*', staticFiles)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
