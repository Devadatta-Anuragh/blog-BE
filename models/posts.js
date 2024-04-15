const mongoose = require("mongoose");


const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        tags: {
            type: String,
            required: true,
        },
        image: {
            type: { filename: { type: String }, path: { type: String } },
            // required: true,
        },
        comments: [{ type: String }],
    },
    { timestamps: true }
);

const Post = mongoose.model('post', postSchema);

module.exports = Post;