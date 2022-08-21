//@ts-check

import { Router } from 'express';

import User from '../models/userSchema';
import Book from '../models/bookSchema';
import Order from '../models/orderSchema';
import mongoose from 'mongoose';

const router = Router();
// { $push: { cart: cartItem.book_id, order_quantity: cartItem.quantity } }

router.get('/cartItems', (req, res) => {
    User.findOne({ username: req.user.username })
        .populate('cart.book_id')
        .then(user => {
            res.status(200).json(user.cart);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// router.post('/addToCart', (req, res) => {
//     let cartItem = req.body.product;
//     console.log('caartItems' + cartItem);
//     User.findOne({ username: req.user.username })
//         .then(user => {
//             console.log('Inside User!');
//             // if (user.cart.some(e => e.book_id === cartItem.book_id)) {
//             //     let newCart = user.cart.filter(
//             //         prod => prod.book_id !== cartItem.book_id
//             //     );

//             //     user.cart = newCart;
//             // } else {
//             console.log('IN ELSE!');
//             user.cart.push({
//                 book_id: cartItem.book_id,
//                 order_quantity: cartItem.order_quantity
//             });
//             // }

//             console.log('Outside All Ifs');
//             user.save();
//             res.status(200).json(cartItem);
//         })
//         .catch(err => {
//             console.log('In Cactch');
//             res.status(400).json({ error: 'Something bad happened' });
//         });
// });

router.post('/updateCart', (req, res) => {
    const cart = req.body.cart;
    console.log({ cart })
    let builtCart = cart.map(item => {
        return {
            book_id: item.id,
            order_quantity: item.qty,
            sub_total: item.subTotal
        };
    });
    console.log(builtCart);

    User.findOne({ username: req.user.username })
        .then(user => {
            if (builtCart !== user.cart) {
                console.log('Not matched!');
                user.cart = builtCart;
                user.save();
            }

            user.populate('cart.book_id', (err, user) => {
                if (err) console.log(err);
                res.status(200).json(user.cart);
            });
        })
        .catch(err => res.status(400).json(err));
});

router.post('/checkout', (req, res) => {
    console.log('In checkout');
    User.findOne({ username: req.user.username })
        .then(user => {
            console.log(user.cart);
            if (user.cart.length < 1) {
                res.status(404).json({
                    message: 'No Items in Cart, Add Some Items'
                });
            }

            Order.create({ user_id: user._id, cart: user.cart, total: 0 })
                .then(order => {
                    let total = 0;
                    order.cart.map(cartItem => {
                        // Book.findOne({ _id: cartItem.book_id }).then(book => {
                        //     sub_total = cartItem.order_quantity * book.price;
                        //     cartItem.sub_total = sub_total;
                        //     order.save();
                        // });
                        console.log('Cart Item: ' + cartItem.sub_total);
                        total += cartItem.sub_total;
                    });
                    order.total = total;
                    order.save();
                    console.log('Order: ' + order.total);

                    user.cart.map(cart => {
                        Book.findOne({ _id: cart.book_id }).then(book => {
                            book.quantity -= cart.order_quantity;
                            book.save();
                        });
                    });
                    delete user.cart;
                    user.save();
                    res.json({
                        success: 'Order Created',
                        order_id: order._id
                    });
                })
                .catch(err => {
                    res.status(404).json({ error: err });
                });
        })
        .catch(err => res.status(404).json(err));
});

router.get('/checkout', (req, res) => {
    let books = {};
    User.findOne({ username: req.user.username })
        .populate('cart.book_id')
        .then(user => {
            res.json(user.cart);
        });
});
export default router;
