import React, { useContext } from "react";
import "./Popup.css";
import { AddToCartContext } from "../context/AddToCart";

const Popup = () => {
  const { popupVisible } = useContext(AddToCartContext);

  return (
    popupVisible && (
      <div className="popup">
        <p>Item added to cart!</p>
      </div>
    )
  );
};

export default Popup;
