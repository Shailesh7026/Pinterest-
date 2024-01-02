const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/PinterestDB")

const postSchema = new mongoose.Schema({
    postFile: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    likes: {
        type: Array,
        default: []
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'
            },
            CommentTime: {
                type: Date,
                default: Date.now
            },
            comment: {
                type: String,
            }
        }
    ],
    time: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Posts', postSchema);


