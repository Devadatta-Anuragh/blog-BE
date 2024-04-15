const express = require("express");
const { handleCreatePost, handleGetPosts, addComment } = require("../controllers/post");
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Endpoint to create a new post
router.post("/create", handleCreatePost);

// Endpoint to create a new comment
router.post("/comment", addComment);


// Endpoint to get all posts
router.get("/get", handleGetPosts);

// Endpoint to serve images
router.get("/images/:imageName", (req, res) => {
    const imagePath = path.join(__dirname, '..', '../images/', req.params.imageName);
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).json({ msg: "Image not found" });
    }
});

module.exports = router;
