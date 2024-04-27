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
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true 
});

reviewSchema.index({ createdAt: 1 }, { expireAfterSeconds: 180 });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
