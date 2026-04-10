const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
    },
    image: {
        type: String,
        required: true,
        default: "https://placehold.co/50",
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    },
    {
        timestamps: true,
    }
);

// Product (.model("Product")) is document. in document name - object(field) , obejct have key:value pair
const Product = mongoose.model("Product", productSchema);

module.exports = Product;