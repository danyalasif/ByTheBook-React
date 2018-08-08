import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

import passportLocalMongoose from 'passport-local-mongoose';

var userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            index: true,
            unique: true
        },
        password: String,
        about: String,
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        address: String,
        user_img: String,
        confirmed: { type: Boolean, default: false },
        confirmationToken: { type: String, default: '' },
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book'
            }
        ],
        readlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book'
            }
        ],
        fav_authors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Author'
            }
        ],
        cart: [
            {
                book_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Book'
                },
                order_quantity: Number,
                sub_total: Number
            }
        ]
    },
    { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

userSchema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
        {
            username: this.username,
            email: this.email,
            confirmed: this.confirmed
        },
        '1234'
        // process.env.JWT_SECRET
    );
};

userSchema.methods.setConfirmationToken = function setConfirmationToken() {
    this.confirmationToken = this.generateJWT();
};

userSchema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
    return `http://localhost:3000/confirmation/${this.confirmationToken}`;
};

userSchema.methods.toAuthJSON = function toAuthJSON() {
    return {
        username: this.username,
        email: this.email,
        confirmed: this.confirmed,
        token: this.generateJWT()
    };
};

userSchema.plugin(uniqueValidator, { message: 'This email is already taken' });

export default mongoose.model('User', userSchema);
