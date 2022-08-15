const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
    const bearerHeader = req.headers.authorization;

    const TOKEN = process.env.TOKEN;
    if (typeof bearerHeader === "undefined") {
        return res.status(401).send("undefined header");
    }

    try {
        const adminToken = bearerHeader.split(" ")[1];
        const data = jwt.verify(adminToken, TOKEN);
        req.role= data.role;
        req.id = data.id;
        req.email = data.email;
        req.username = data.username;
        next();
        } catch {
        return res.status(401).send("Unauthorised");
        }
    };

module.exports = { authorization };