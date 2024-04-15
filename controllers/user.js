const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../service/auth");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("107954496633-879mkm2p1cacotlhocqb52nqqff4djng.apps.googleusercontent.com");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    console.log(req.body);
    try {
        await User.create({
            name,
            email,
            password,
        });
        console.log("user created")
        return res.json({ msg: "Signed Up" })
    }
    catch {
        return res.status(400).json({ msg: "email already exists" })
    }
}


async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });

        if (!user) {
            res.status(401).json({ error: "Inavaild username or password" });
        }

        sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie("uid", sessionId, { httpOnly: true, secure: true, sameSite: "strict" });

        return res.status(200).json(sessionId);
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "An internal server error occurred" });
    }
}

async function handleGoogleSignin(req, res) {
    console.log("hitted")
    const { idToken } = req.body; // Assume you send the ID token from the frontend

    try {
        // Verify the ID token with Google
        const ticket = await client.verifyIdToken({
            idToken,
            audience: "107954496633-879mkm2p1cacotlhocqb52nqqff4djng.apps.googleusercontent.com",
        });

        const payload = ticket.getPayload();
        const { name, email } = payload;

        // Check if the user already exists in your database
        let user = await User.findOne({ email });

        if (!user) {
            // Create a new user record if the user doesn't exist
            user = await User.create({ name, email });
        }

        // Set the user's information in the session
        sessionId = uuidv4();
        console.log(sessionId)
        setUser(sessionId, user);



        res.status(200).json({ message: 'User signed in successfully', sessionId });
    } catch (error) {
        res.status(500).json({ message: 'Failed to sign in with Google', error: error.message });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleGoogleSignin
}