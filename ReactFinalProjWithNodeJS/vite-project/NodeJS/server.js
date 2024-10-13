import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import jwt from 'jsonwebtoken';
import User from './Model/user.model.js';
import mongoose from "mongoose";
import { routes } from "./Routes/products.routes.js";
import cors from "cors";

const app = new express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));


// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;

db.on("open", () => {
    console.log("Connected to the Database");
});

db.on("error", () => {
    console.log("Connection Failed");
});

// Apply the routes
routes(app);
