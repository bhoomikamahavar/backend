const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {createProduct, getProduct, deleteProduct, updateProduct, getSingleProduct} = require("../controllers/productcontroller");

// http://127.0.0.1:7777/api/createproduct
router.post( "/createproduct",auth, createProduct );

// http://127.0.0.1:7777/api/
router.get( "/", getProduct );

router.delete( "/delete/:id",auth, deleteProduct );

router.put( "/updateproduct/:id",auth, updateProduct );

router.get( "/singleproduct/:id",auth, getSingleProduct );


module.exports = router;