const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/PinterestDB")

const postComments = new mongoose.Schema({
    type:Array,
    [
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
    ]
});


module.exports = mongoose.model('postComments', postSchema);


