import React, { useContext, useState } from "react";
import { AddToCartContext } from "../context/AddToCart";
import { FaTrashAlt } from "react-icons/fa";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { selectedProduct, cartItems, deleteItem, addToCart } =
    useContext(AddToCartContext);

  const [selectedImage, setSelectedImage] = useState(
    selectedProduct?.img1 || selectedProduct?.img || ""
  );

  if (!selectedProduct) return <div>Select a product to see details</div>;

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const images = [
    selectedProduct.img2 || selectedProduct.img,
    selectedProduct.img3 || selectedProduct.img,
    selectedProduct.img4 || selectedProduct.img,
  ].filter(Boolean); // remove any undefined/null values

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
        <h1 className="product-title">{selectedProduct.title}</h1>
        <p className="product-description">
          <span className="product-descrip">Description:</span>{" "}
          {selectedProduct.detail}
        </p>
        <h4 className="product-price">
          <span className="product-over">Price: Rs</span>{" "}
          {selectedProduct.price}
        </h4>
        <h4 className="product-calories">
          <span className="product-over"> Calories: </span>
          {selectedProduct.calories}
        </h4>
        <h4 className="product-cooktime">
          <span className="product-over"> Cooking Time: </span>{" "}
          {selectedProduct.cookingTime}
        </h4>
        <h4 className="product-category">
          <span className="product-over">Category:</span>{" "}
          {selectedProduct.category}
        </h4>
        <h4 className="product-rating">
          <span className="product-over"> Ratings: </span>
          {selectedProduct.ratings}
        </h4>
        <h4 className="product-spicelevel">
          <span className="product-over">Spice Level:</span>{" "}
          {selectedProduct.spiceLevel}
        </h4>
        <h4 className="product-available">
          <span className="product-over">Availability: </span>
          {selectedProduct.availability}
        </h4>
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
                  className="Delete-button"
                >
                  <FaTrashAlt />
                  deleteItem
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
