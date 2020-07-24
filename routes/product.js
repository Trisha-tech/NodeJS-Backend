const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Product = mongoose.model("Product")

//GET ALL PRODUCTS ROUTE STARTS
router.get('/platform/products', (req, res) => {
    Product.find()
        .then(products => {
            res.json({ products })
        })
        .catch(err => {
            console.log(err)
        })
})
//GET ALL PRODUCTS ROUTE

//CREATE PRODUCT ROUTE STARTS
router.post('/platform/products/create', (req, res) => {
    const { name, brand, category, countInStock, price, description } = req.body
    if (!name || !brand || !category || !countInStock || !price || !description) {
        return res.status(404).json({ error: "Please add all the fields" })
    }
    const product = new Product({
        name,
        brand,
        category,
        countInStock,
        price,
        description,
        postedBy: req.user
    })
    product.save().then(result => {
        res.json({ post: result })
    })
        .catch(err => {
            console.log(err)
        })
})
//CREATE PRODUCT ROUTE ENDS

//DELETE PRODUCT ROUTE STARTS
router.delete('/platform/deleteProduct/:productId', (req, res) => {
    Product.findOne({ _id: req.params.productId })
        .populate("postedBy", "_id")
        .exec((err, product) => {
            if (err || !product) {
                return res.status(422).json({ error: err })
            }

            product.remove()
                .then(result => {
                    res.json({ message: "successfully deleted" })
                }).catch(err => {
                    console.log(err)
                })

        })
})
//DELETE PRODUCT ROUTE


module.exports = router