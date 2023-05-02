const Products = require("../models/productModel");
const ApiFeatures = require("../utils/ApiFeatuers");
const ErrorHandler = require("../utils/ErrorHandler")
function productController() {
  return {
    async createProduct(req, res, next) {
      try {
        const product = new Products(req.body);
        const result = await product.save();
        res.status(201).send(result);
      } catch (error) {
        next(error);
      }
    },

    async getAllProducts(req, res, next) {
      try {

        const apiFeatures = new ApiFeatures(Products,req.query).search().filter().pagination();
        const productCount = await Products.countDocuments()
        const result = await apiFeatures.query;
        res.status(200).json({result,productCount});
      } catch (error) {
        next(error);
      }
    },

    async getSingleProduct(req, res, next) {
      try {
        let product = await Products.findById(req.params.id);
        if (!product) {
            next(new ErrorHandler("product does not exist",500))
          return;
        }
        res.status(200).json({ success: true, product });
      } catch (error) {
        next(error);
      }
    },

    async updateProduct(req, res, next) {
      try {
        let result = await Products.findById(req.params.id);

        if (!result) {
            next(new ErrorHandler("product does not exist",500))
          return;
        }

        let product = await Products.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true, useFindandModify: true }
        );

        res.status(200).json({ success: true, product });
      } catch (error) {
        next(error);
      }
    },

    async deleteProduct(req, res, next) {
      try {
        let result = await Products.findById(req.params.id);
        if (!result) {

            next(new ErrorHandler("product does not exist",500))
          
          return;
        }

        await Products.deleteOne({_id:req.params.id});

        res
          .status(200)
          .json({ success: true, message: "product has been deleted" });
      } catch (error) {
          next(error)
      }
    },
  };
}

module.exports = productController;
