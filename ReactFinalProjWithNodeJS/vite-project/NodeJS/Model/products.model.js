import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    "name": String,
    "price": Number,
    "rating": Number,
    "description": String,
});

const productModel = mongoose.model("products", productSchema);

export default productModel;

