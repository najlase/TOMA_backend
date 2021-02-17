const jwt = require("jsonwebtoken")
const TOKEN = require('./consts').TOKEN

class AuthMiddleware {
    authorize(req, res, next, roles) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401) // if there isn't any token

        jwt.verify(token, TOKEN, (err, user) => {
            if (err) return res.sendStatus(403)

            if(roles.indexOf(user.role) === -1) return res.sendStatus(401) // if user doesn't have the appropriate role

            req.user = user
            next() // pass the execution off to whatever request the client intended
        })
    }
}

module.exports = new AuthMiddleware()
