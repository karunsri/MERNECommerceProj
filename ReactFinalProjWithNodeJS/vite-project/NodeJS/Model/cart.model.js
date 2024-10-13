import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    items: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const cartModel = mongoose.model('cart', cartSchema);

  export default cartModel;
  
  
  