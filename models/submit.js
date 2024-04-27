const mongoose = require('mongoose');

const submittedWorkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    githubLink: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});


submittedWorkSchema.index({ createdAt: 1 }, { expireAfterSeconds: 259200 });
const SubmittedWork = mongoose.model('SubmittedWork', submittedWorkSchema);
async function deleteEntryAfterTimeout(userId) {
    try 
    {
        console.log(`Entry for user ID ${userId} will be deleted automatically`);
    } 
    catch (error) 
    {
        console.error(`Error deleting entry for user ID ${userId}: ${error.message}`);
    }
}

module.exports = { SubmittedWork, deleteEntryAfterTimeout };
