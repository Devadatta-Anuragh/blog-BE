const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
    console.log(req.cookies);
    const userUid = req.cookies?.uid;
    console.log(userUid);
    if (!userUid) return res.status(400).json({ msg: "do login" });
    const user = getUser(userUid);
    if (!user) return res.status(400).json({ msg: "do login" });

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;
    console.log(userUid);
    const user = getUser(userUid);

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}