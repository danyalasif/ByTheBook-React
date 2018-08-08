//@ts-check

import { Router } from 'express';
import passport from 'passport';

import User from '../models/userSchema';
import Book from '../models/bookSchema';
import Order from '../models/orderSchema';
import Review from '../models/reviewSchema';
import mongoose from 'mongoose';
import { sendConfirmationEmail } from '../mailer';
import { removeElement, isInArray } from '../HelperFunctions';
import { storage } from '../HelperFunctions';

import multer from 'multer';

const upload = multer({ storage });
const router = Router();
let userImageName = '';

// Prepended by "/api/users"

/* GET users listing. */
router.get('/user', (req, res) => {
    console.log(req.user);
    User.findOne({ username: req.user.username }).then(user => {
        res.json(user);
    });
});

/* GET users wishlist. */
router.get('/wishlist', (req, res) => {
    let username = req.user.username;

    User.findOne({ username })
        .populate('wishlist')
        .then(user => res.json(user.wishlist));
    // res.json(req.user.wishlist);
});

//Get Orders list
router.get('/orders', (req, res) => {
    let username = req.user.username;
    User.findOne({ username }).then(user => {
        Order.find({ user_id: user._id })
            .populate('cart.book_id')
            .then(orders => {
                res.json(orders);
            });
    });
    // res.json(req.user.wishlist);
});

/* Add book to  users wishlist. */
router.post('/wishlist', (req, res) => {
    let username = req.user.username;
    let ISBN13 = req.body.isbn;
    User.findOne({ username }).then(user => {
        Book.findOne({ ISBN13 }).then(book => {
            if (isInArray(user.wishlist, book._id)) {
                removeElement(user.wishlist, book._id);
                res.json({
                    message: 'Removed Book from Wishlist',
                    isInWishlist: false
                });
            } else {
                user.wishlist.push(book._id);
                res.json({
                    message: 'Added Book To Wishlist',
                    isInWishlist: true
                });
            }
            user.save();
        });
    });

    // res.json(req.user.wishlist);
});

router.get('/isInWishlist/:isbn', (req, res) => {
    let ISBN13 = req.params.isbn;
    let username = req.user.username;

    Book.findOne({ ISBN13 }).then(book => {
        User.findOne({ username }).then(user => {
            if (isInArray(user.wishlist, book._id))
                res.json({ isInWishlist: true });
            else res.json({ isInWishlist: false });
        });
    });
});

/* GET users wishlist. */
router.get('/readlist', (req, res) => {
    User.findOne({ username: req.user.username })
        .populate('readlist')
        .then(user => res.json(user.readlist));
});

/* Add book to  users readlist. */
router.post('/readlist', (req, res) => {
    let username = req.user.username;
    let ISBN13 = req.body.isbn;
    User.findOne({ username }).then(user => {
        Book.findOne({ ISBN13 }).then(book => {
            if (isInArray(user.readlist, book._id)) {
                removeElement(user.readlist, book._id);
                res.json({
                    message: 'Removed Book from readlist',
                    isInReadlist: false
                });
            } else {
                user.readlist.push(book._id);
                res.json({
                    message: 'Added Book To readlist',
                    isInReadlist: true
                });
            }
            user.save();
        });
    });

    // res.json(req.user.readlist);
});

router.get('/isInReadlist/:isbn', (req, res) => {
    let username = req.user.username;
    let ISBN13 = req.params.isbn;

    Book.findOne({ ISBN13 }).then(book => {
        User.findOne({ username }).then(user => {
            if (isInArray(user.readlist, book._id))
                res.json({ isInReadlist: true });
            else res.json({ isInReadlist: false });
        });
    });
});

router.post('/register', (req, res, next) => {
    // @ts-ignore
    User.register(
        new User({ username: req.body.username, email: req.body.email }),
        req.body.password,

        (err, account) => {
            if (err) {
                res.status(422).json({ error: err.message });
            } else {
                // account.set({email: req.body.email})
                // account.save(err => {});
                account.setConfirmationToken();
                account.save(err => {});
                sendConfirmationEmail(account);
                passport.authenticate('local', (err, user, info) => {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        return res
                            .status(401)
                            .json({ error: 'Wrong Username or Password' });
                    }
                    req.logIn(user, err => {
                        if (err) {
                            return next(err);
                        }
                        return res.json({
                            user: user.toAuthJSON()
                        });
                    });
                })(req, res, next);
            }
        }
    );
});

//logout logic
router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json('User Logged Out ' + req.user);
});

router.post('/login', (req, res, next) => {
    console.log(req.body.username);
    console.log(req.body.password);
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res
                .status(401)
                .json({ error: 'Wrong Username or Password' });
        }
        req.logIn(user, err => {
            if (err) {
                return next(err);
            }

            return res.status(200).json({
                user: user.toAuthJSON()
            });

            // return res.json({ user: user.username });
        });
    })(req, res, next);
});

router.post('/uploadUserImage', upload.single('user_image'), (req, res) => {
    userImageName = req.file.filename;
    res.status(200).json({ message: { success: 'Uploaded Successfully' } });
});

router.put('/editUser', (req, res) => {
 
    User.findOne({ username: req.user.username })
        .then(user => {
            user.about = req.body.userData.description;
            user.user_img = `/images/${userImageName}`;
            user.save();
        })
        .catch(err => console.log(err));
});

// router.post('/login', passport.authenticate('local'), (req, res) => {
//     console.log("Inside Login")
//     // res.status(200).json("Logged In");
//     res.status(200).json({ user: {username: req.user.username, password: req.user.password}});

// });

router.post('/confirmation', (req, res) => {
    const token = req.body.token;
    console.log(token);
    User.findOneAndUpdate(
        { confirmationToken: token },
        { confirmationToken: '', confirmed: true },
        { new: true }
    ).then(
        user =>
            user
                ? res.json({ user: user.toAuthJSON() })
                : res.status(400).json({})
    );
});

export default router;
