import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = getProductById(id);
    
    if (!foundProduct) {
      navigate("/");
    } else {
      setProduct(foundProduct);
    }
  }, [id, navigate]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <img src={product.image} alt={product.name} className="product-card-image" />
          <div className="product-card-content">
            <h1 className="product-card-name">{product.name}</h1>
            <p className="product-card-price">${product.price}</p>
            <p>{product.description}</p>
            <button className="button button-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;