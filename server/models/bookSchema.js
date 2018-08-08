import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    ISBN13: {
        type: String,
        required: true,
        maxlength: 13,
        minlength: 13
    },
    description: {
        type: String,
        required: true
    },
    pages: Number,
    price: Number,
    title: String,
    language: String,
    rating: {
        type: Number,
        default: 0
    },
    book_img: String,
    quantity: Number,
    publisher: String,
    publish_date: Date,
    genre: [String],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    website: String
});

export default mongoose.model('Book', bookSchema);
