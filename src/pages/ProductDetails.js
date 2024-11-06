import React, { useContext, useState } from "react";
import { AddToCartContext } from "../context/AddToCart";
import { FaTrashAlt } from "react-icons/fa";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { selectedProduct, cartItems, deleteItem, addToCart } =
    useContext(AddToCartContext);

  const [selectedImage, setSelectedImage] = useState(
    selectedProduct ? selectedProduct.img1 : ""
  );

  if (!selectedProduct) return <div>Select a product to see details</div>;

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const images = [
    selectedProduct.img2,
    selectedProduct.img3,
    selectedProduct.img4,
  ];

  return (
    <div className="product-detail">
      {/* Display the main product image */}
      <div>
        <div className="product-image">
          <img src={selectedImage} alt={selectedProduct.title} />
        </div>
        {/* Display additional images if available */}
        <div className="product-images">
          {images.map(
            (img, index) =>
              img && (
                <img
                  key={index}
                  src={img}
                  alt={`${selectedProduct.title} - ${index + 2}`}
                  className={selectedImage === img ? "selected" : ""}
                  onClick={() => handleImageClick(img)}
                />
              )
          )}
        </div>
      </div>

      {/* Product details */}
      <div className="product-des">
        <h1>Title: {selectedProduct.title}</h1>
        <p>Description: {selectedProduct.detail}</p>
        <h4>Price: Rs {selectedProduct.price}</h4>
        <h4>Calories: {selectedProduct.calories}</h4>
        <h4>Cooking Time: {selectedProduct.cookingTime}</h4>
        <h4>Category: {selectedProduct.category}</h4>
        <h4>Ratings: {selectedProduct.ratings}</h4>
        <h4>Spice Level: {selectedProduct.spiceLevel}</h4>
        <h4>Availability: {selectedProduct.availability}</h4>
        <button
          className="me-item-button"
          onClick={() => addToCart(selectedProduct)}
        >
          Add to Cart
        </button>

        <div className="carting">
          {cartItems.map(({ id }) => (
            <div key={id} className="carting-item">
              <div className="carting-item-quantity">
                <button
                  onClick={() => deleteItem(id)}
                  className="quantityDelete-button"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
