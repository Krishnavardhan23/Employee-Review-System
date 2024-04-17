const mongoose = require("mongoose");

const workSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    dueDate: {
        type: Date, 
        required: true
    }
});

const Work = mongoose.model('Work', workSchema);

module.exports = Work;
