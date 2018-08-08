//@ts-check

import { Router } from 'express';
import User from '../models/userSchema';
import Book from '../models/bookSchema';
import Review from '../models/reviewSchema';
import mongoose from 'mongoose';

const router = Router();
// /api/reviews
router.post('/', (req, res) => {
    const username = req.body.data.username;
    const isbn = req.body.data.isbn;
    const text = req.body.data.review;
    const rating = req.body.data.rating;

    Book.findOne({ ISBN13: isbn })
        .then(book => {
            User.findOne({ username })
                .then(user => {
                    Review.find({ user_id: user._id, book_id: book._id }).then(
                        userReviews => {
                            console.log('Finding reviews!');
                            const reviewData = {
                                user_id: user._id,
                                book_id: book._id,
                                text,
                                rating
                            };
                            if (userReviews.length > 0) {
                                console.log('Already reviewed!');
                                res.status(400).json({
                                    error: 'Already Reviewed'
                                });
                            } else {
                                Review.create(reviewData)
                                    .then(review => {
                                        console.log('Review Posted!');
                                        Review.find({ book_id: book._id }).then(
                                            reviews => {
                                                let reviewCount = 0;
                                                let sumOfRatings = 0;
                                                let averageRating = 0;
                                                reviews.map(review => {
                                                    sumOfRatings +=
                                                        review.rating;
                                                    reviewCount += 1;
                                                });
                                                averageRating =
                                                    sumOfRatings / reviewCount;

                                                book.rating = averageRating;
                                                book.save();
                                            }
                                        );

                                        res.status(200).json({
                                            success: 'Review Posted!'
                                        });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(400).json({
                                            error: 'Review Not Posted'
                                        });
                                    });
                            }
                        }
                    );
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({ error: 'User not found' });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ error: 'Book not found' });
        });
});

router.delete('/:review_id', (req, res) => {
    let review_id = mongoose.Types.ObjectId(req.params.review_id);
    console.log(review_id);
    // @ts-ignore
    Review.findOneAndDelete({ _id: review_id })
        .then(() => {
            res.json({ message: 'Review Deleted Successfully' });
        })
        .catch(err => {
            console.log(err);
            res.json({ error: "Can't Delete Review" });
        });
});

router.put('/:review_id', (req, res) => {
    let review_id = mongoose.Types.ObjectId(req.params.review_id);
    let text = req.body.text;
    Review.findOneAndUpdate({ _id: review_id }, { text })
        .then(() => {
            res.json({ message: 'Review Updated' });
        })
        .catch(err => {
            console.log(err);
            res.json({ error: "Can't Update Review" });
        });
});

router.get('/:isbn', (req, res) => {
    let ISBN13 = req.params.isbn;
    Book.findOne({ ISBN13 })
        .then(book => {
            Review.find({ book_id: book._id })
                .populate('user_id', 'username')
                .then(reviews => {
                    res.status(200).json(reviews);
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

export default router;
