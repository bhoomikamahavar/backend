const Product = require("../models/productSchema");

// http://127.0.0.1:7777/api/products/createproduct
const createProduct = async (req, res) => {
    console.log(req.body);
    try {
        const product = new Product(req.body);
        const newProduct = await product.save();
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(400).send(errors.name.properties.message);
        res.json({
            error: "Bad request",
            message: error.message
        });
    }
}

// http://127.0.0.1:7777/api/products/
const getProduct = async (req, res) => {
    console.log("Hello", req.body);
    const getProduct = await Product.find();
    res.send(getProduct);
}

// http://127.0.0.1:7777/api/products/singleproduct/:id
const getSingleProduct = async (req, res) => {
    console.log(req.body);
    const getSingleProduct = await Product.findById(req.params.id);
    res.send(getSingleProduct);
}

// http://127.0.0.1:7777/api/products/delete/:id
const deleteProduct = async (req, res) => {
    // console.log(req.id);
    // console.log(req.params.id);
    const deleteProduct1 = await Product.findByIdAndDelete(req.params.id);
    res.send(deleteProduct1);
}

// http://127.0.0.1:7777/api/products/update/:id
const updateProduct = async (req, res) => {
    // const updatedProduct1 = await Product.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true,
    // });
    // res.send(updatedProduct1);
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Update failed" });
    }
}

module.exports = {
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    getSingleProduct
};