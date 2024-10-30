import React, { useContext, useMemo } from "react";
import { AddToCartContext } from "../context/AddToCart";
import "./CartItem.css";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const CartItem = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, deleteItem } =
    useContext(AddToCartContext);

  // Calculate total price of items:
  const calculateTotal = useMemo(() => {
    return cartItems.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );
  }, [cartItems]);

  return (
    <div className="cart-page">
      <h2>Your Bucket</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map(
              ({ id, img, alt, title, detail, price, quantity }) => (
                <li key={id} className="cart-item">
                  <img src={img} alt={alt} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h3>{title}</h3>
                    <p>{detail}</p>
                    <p>
                      Price: Rs {price} x {quantity} = Rs
                      {price && quantity
                        ? Number(price) * Number(quantity)
                        : " Invalid Price"}
                    </p>
                    <div className="cart-item-quantity">
                      <button
                        onClick={() => decreaseQuantity(id)}
                        className="quantity-button"
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity">{quantity}</span>
                      <button
                        onClick={() => increaseQuantity(id)}
                        className="quantity-button"
                      >
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => deleteItem(id)}
                        className="quantityDelete-button"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>

          {/* Display the total price */}
          <div className="cart-total">
            <h3>Total Price: Rs {calculateTotal.toFixed(2)}</h3>
          </div>

          {/* Show payment button only if there are items in the cart */}
          <NavLink to="/address">
            <button className="links">Address Details</button>
          </NavLink>
        </>
      )}
    </div>
  );
};

export default CartItem;
