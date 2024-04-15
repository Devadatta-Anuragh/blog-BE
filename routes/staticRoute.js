const express = require("express");

const router = express.Router();

router.get("/login", (req, res) => {
    const message = 'Welcome to the login page!';
    res.send(`Message: ${message}`);
});