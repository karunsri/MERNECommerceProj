import cartModel from "../Model/cart.model.js";
import productModel from "../Model/products.model.js";
export const addCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        console.log(product);
        let cart = await cartModel.findOne(); 
        if (!cart) {
            cart = new cartModel({ items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.equals(productId));
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update product quantity in cart
export const updateCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await cartModel.findOne();
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const item = cart.items.find(item => item.productId.equals(productId));
        if (!item) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        item.quantity = quantity;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// remove product from cart
export const deleteCart = async (req, res) => {
    const { productId } = req.body;

    try {
        const cart = await cartModel.findOne();
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => !item.productId.equals(productId));
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
