var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        cart: [
            {
                book_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Book',
                    required: true
                },
                order_quantity: Number,
                sub_total: Number
            }
        ],
        total: Number
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
