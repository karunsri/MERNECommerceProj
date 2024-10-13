import { createProduct, fetchProducts, updateProduct } from "../Controller/products.controller.js";
import { registerUser, loginUser, protect } from '../Controller/auth.controller.js';
import { addCart, updateCart, deleteCart } from "../Controller/cart.controller.js";
import express from "express";
export function routes(app) {
    app.post("/api/product", createProduct);
    app.get("/api/products", fetchProducts);
    app.put("/api/product/:id", updateProduct);
    // app.post('/api/cart', addCart);
    // app.put('/api/cart/:id', updateCart);
    // app.delete('/api/cart', deleteCart);
    app.post('/api/cart', protect, addCart);
    app.put('/api/cart', protect, updateCart);
    app.delete('/api/cart', protect, deleteCart);
    app.post('/register', registerUser);
    app.post('/login', loginUser);
};