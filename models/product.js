//CREATING MONGOOSE SCHEMA NAMED "Product" TO STORE PRODUCT'S DETAIL

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const productSchema = new mongoose.Schema({
    indexnumber: {
        type: String,
        default: "0"
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    countInStock: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    rating: {
        type: String,
        default: "0"
    },

    
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
})

mongoose.model("Product", productSchema)