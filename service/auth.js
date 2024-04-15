const sessionIdtoUserMap = new Map();
// console.log(sessionIdtoUserMap);
function setUser(id, user) {
    console.log(sessionIdtoUserMap.set(id, user))
    sessionIdtoUserMap.set(id, user);
}

function getUser(id) {
    return sessionIdtoUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
}