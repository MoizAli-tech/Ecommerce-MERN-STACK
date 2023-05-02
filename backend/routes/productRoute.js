const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//middlewares
const {isAdmin, isAuthenticated} = require("../middlewares/auth");



//routes
router.route("/createProduct").post(isAuthenticated,isAdmin,productController().createProduct);

router.route("/products").get(productController().getAllProducts);

router.route("/product/:id")
.put(isAdmin,productController().updateProduct)
.delete(isAdmin,productController().deleteProduct)
.get(productController().getSingleProduct)






module.exports = router;