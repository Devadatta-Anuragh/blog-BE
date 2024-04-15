const Post = require("../models/posts");
const multer = require('multer');

const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images'); // Save uploaded files to the 'images' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Use a unique filename
    },
});
const upload = multer({ storage: storage });


async function handleCreatePost(req, res) {

    try {
        upload.single('image')(req, res, async (err) => {
            const { title, description, tags } = req.body;
            console.log(req.body)
            console.log(req.file);
            const attachments = {
                filename: req.file.filename,
                path: req.file.path
            };
            await Post.create({
                title,
                description,
                tags,
                image: attachments // Save the file path in the database
            });
            console.log("post created");
            return res.json({ msg: "created" });
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({ msg: "not created" });
    }
}



async function handleGetPosts(req, res) {
    try {
        const posts = await Post.find();

        // Map each post to include the image URL
        const postsWithImageUrl = posts.map(post => {
            const imagePath = path.join(__dirname, '..', post.image.path);
            const imageData = fs.readFileSync(imagePath, 'base64');
            const imageUrl = `data:image/jpeg;base64,${imageData}`;
            return {
                ...post.toObject(),
                imageUrl: imageUrl
            };
        });

        console.log(postsWithImageUrl);
        return res.json({ posts: postsWithImageUrl, msg: "done" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}


async function addComment(req, res) {
    const postId = req.body.postId;
    const { text } = req.body;
    console.log(text);

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        if (!post.comments) {
            post.comments = [];
        }

        post.comments.push(text);
        await post.save();

        res.status(201).json({ msg: 'Comment added successfully', post });
        console.log(post)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}




module.exports = { handleGetPosts, handleCreatePost, addComment };