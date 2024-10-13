import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import './ProductList.css';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Change to null instead of false

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products'); // Use the passed URL
        if (!response.ok) throw new Error("Network error");
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Ensure loading is set to false when done
      }
    };
    fetchData();
  }, [url]); // Include url in dependency array

  return [data, loading, error];
}

const ProductList = () => {
  const [data, loading, error] = useFetch('http://localhost:5000/api/products'); // Fetch data directly

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products: {error}</div>;

  return (
    <div className="product-list">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <div>No products available.</div>
      )}
    </div>
  );
};

export default ProductList;
