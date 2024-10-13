import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../utils/cartActions'; // Ensure this path is correct
import './ProductItem.css';

const ProductItem = (props) => {
  const { name, price, rating, description } = props.product;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(props.product)); // Pass the entire product object
  };

  return (
    <div className="product-item">
      <h2 className='name'>{name}</h2>
      <p className='price'>${price}</p>
      <h3 className='rating'>Rating: {rating}</h3> {/* Add context to the rating */}
      <p className='description'>{description}</p>
      <button onClick={handleAddToCart} className='atc-btn'>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
