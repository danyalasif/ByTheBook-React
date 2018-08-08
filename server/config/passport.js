// import passport from 'passport';
import User from '../models/userSchema';
import passport from 'passport';
// const LocalStrategy = require('passport-local').Strategy;
import { Strategy as LocalStrategy } from 'passport-local';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    findById(id, (err, user) => {
        done(err, user);
    });
});
console.log('Passport Loaded!');

module.exports = passport => {
    passport.use(
        'local.register',
        new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            (req, username, password, done) => {
                console.log('Entering register');
                req.checkBody('username', 'Invalid Username').notEmpty();
                req
                    .checkBody('password', 'Invalid Password')
                    .notEmpty()
                    .isLength({
                        min: 3
                    });

                var errors = req.validationErrors();
                if (errors) {
                    var messages = [];
                    errors.forEach(error => {
                        messages.push(error.msg);
                    });
                    return done(null, false, req.flash('error', messages));
                }
                findOne(
                    {
                        username: username
                    },
                    (err, user) => {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            return done(null, false, {
                                message: 'This username is already being used'
                            });
                        }
                        var newUser = new User();
                        newUser.username = req.body.username;
                        newUser.about = req.body.about;
                        newUser.email = req.body.email;
                        newUser.address = req.body.address;
                        newUser.username = username;
                        newUser.password = newUser.encryptPassword(password);
                        newUser.save((err, result) => {
                            if (err) {
                                return done(err);
                            }
                            return done(null, newUser);
                        });
                    }
                );
            }
        )
    );
};

passport.use(
    'local.login',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, username, password, done) => {
            req.checkBody('username', 'Invalid username').notEmpty();
            req.checkBody('password', 'Invalid Password').notEmpty();
            var errors = req.validationErrors();
            if (errors) {
                var messages = [];
                errors.forEach(error => {
                    messages.push(error.msg);
                });
                return done(null, false, req.flash('error', messages));
            }
            findOne(
                {
                    username: username
                },
                (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {
                            message: 'User Not Found!'
                        });
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, {
                            message: 'Invalid Password!'
                        });
                    }
                    return done(null, user);
                }
            );
        }
    )
);