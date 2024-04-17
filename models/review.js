const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', 
        required: true
    },
    reviewed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', 
        required: true
    }
}, {
    timestamps: true 
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
