const { JWT_SECRET } = require("../keys")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model("User")

//MIDDLEWARE STARTS
//Checks the authorization and verify the user with their details
module.exports = (req, res, next) => {
    const { authorization } = req.headers
    //authorization===Bearer hgvijoehglkvsdlm
    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_SECRET, (err, payload) => { //verify the token 
        if (err) {
            return res.status(401).json({ error: "You must be logged in" })
        }

        const { _id } = payload
        User.findById(_id).then(userdata => {
            req.user = userdata
            next()
        })

    })
}
//MIDDLEWARE ENDS