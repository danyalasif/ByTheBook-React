import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        text: String,
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        book_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        },
        rating: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
