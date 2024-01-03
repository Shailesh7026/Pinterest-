const mongoose = require('mongoose');
mongoose.connect("mongodb://mongo:f6BChdGDE1-B4af14GEegc11Gh55cBah@roundhouse.proxy.rlwy.net:42207")

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


