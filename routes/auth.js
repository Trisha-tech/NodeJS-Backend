const express = require('express')
const router = express.Router() //used to create APIs

//to save user details to mongo db
const mongoose = require('mongoose')
const User = mongoose.model("User")
const crypto = require('crypto')
//Used for security purpose
const bcrypt = require('bcrypt') //used to hash password
const jwt = require('jsonwebtoken') //library to create jwt token
const { JWT_SECRET, SENDGRID_API, EMAIL } = require('../keys') //gives a unique token to every entry
const requireLogin = require('../middleware/requireLogin') //middleware created between to verify the user during login

//Used for sending emails
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')


//SEND EMAIL FUNCTION STARTS
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: SENDGRID_API
    }
}))
//SEND EMAIL FUNCTION ENDS


//GET ALL USERS ROUTE START
router.get('/platform/users', (req, res) => {
    User.find()
        .then(users => {
            res.json({ users })
        })
        .catch(err => {
            console.log(err)
        })
})
//GET ALL USERS ROUTE END



//SIGNUP ROUTE START
router.post('/platform/signup', (req, res) => {
    const { name, email, password, contactNumber } = req.body //take user details from frontend
    if (!email || !name || !password || !contactNumber) { //if these fields are not present ,it sends a error with a status code of 422
        return res.status(422).json({ error: "please add all the fields" })
    }
    User.findOne({ email: email }) //find user with the help of email
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists with that email" })
            }
            bcrypt.hash(password, 12)//hashed the password
                .then(hashedpassword => {
                    const user = new User({ //Creating a new user to save the details
                        email,
                        name,
                        password: hashedpassword,
                        contactNumber
                    })
                    user.save()
                        .then(user => {
                            transporter.sendMail({  //sending mail to user email
                                to: user.email,
                                from: "49trishasahu@gmail.com",
                                subject: "signup success",
                                html: "<h2>Welcome to our website</h2>"
                            })
                            res.json({ message: "saved successfully" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        })
        .catch(err => {
            console.log(err)
        })
})
//SIGNUP ROUTE END 

//SIGNIN ROUTE START
router.post('/platform/login', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "please add email or password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) { //if user doesn't exist,send a error response
                return res.status(422).json({ error: "Invalid email or password" })
            }
            bcrypt.compare(password, savedUser.password) //compare the entered password with the existing one
                .then(doMatch => {
                    if (doMatch) {
                        //res.json({message:"Successfully signed in"})
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)//it returns a unique token for every user and convert the details into a token
                        res.json({ token })
                    } else {
                        res.status(422).json({ error: "Invalid email or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})
//SIGNIN ROUTE END

//PASSWORD RESET ROUTE STARTS
router.post('/platform/changePassword', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {  //create a token
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({ error: "User doesn't exist with that email" })
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save().then((result) => {
                    transporter.sendMail({
                        to: user.email,
                        from: "49trishasahu@gmail.com",
                        subject: "password-reset",
                        html: `
                                 <p>You requested for password reset</p>
                                    <h4>Click on this <a href="${EMAIL}/reset/${token}">link</a> to reset password.</h4>
                          
                                    `
                    })
                    res.json({ message: "Check your email " })
                })
            })
    })
})
//PASSWORD RESET ROUTE ENDS

//NEW PASSWORD ROUTE STARTS
router.post('/platform/new-password', (req, res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then(user => {
            if (!user) {
                res.status(422).json({ error: "Try again session expired" })
            }
            bcrypt.hash(newPassword, 12).then(hashedpassword => {
                user.password = hashedpassword
                user.resetToken = undefined
                user.expireToken = undefined
                user.save().then((savedUser) => {
                    res.json({ message: "Password updated successfully" })
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
})
//NEW PASSWORD ROUTE ENDS

//DELETE USER ROUTE START
router.delete('/platform/deleteUser/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId })
        .populate("postedBy", "_id")
        .exec((err, user) => {
            if (err || !user) {
                return res.status(422).json({ error: err })
            }

            user.remove()
                .then(result => {
                    res.json({ message: "successfully deleted" })
                }).catch(err => {
                    console.log(err)
                })

        })
})
//DELETE USER ROUTE END

module.exports = router

