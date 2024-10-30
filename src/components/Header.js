import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import "../App.css";
import LogoImage from "../assets/images/omnifood-logo.png";
import { FaBars } from "react-icons/fa";
import { TfiShoppingCart } from "react-icons/tfi";
import { FaUserCircle } from "react-icons/fa";
import Image from "../assets/images/person.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
// Import the context
import { AddToCartContext } from "../context/AddToCart";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Get the cart value from context
  const { cartItemCount, isLoggedIn } = useContext(AddToCartContext);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Set the duration
    });
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <NavLink to="/" onClick={closeMenu} data-aos="fade-up-right">
          <img className="logo" alt="Bite logo" src={LogoImage} />
        </NavLink>
        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          <ul className="main-nav-list">
            <li>
              <NavLink
                to="/"
                activeClassName="active"
                className="main-nav-link"
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/menu"
                activeClassName="active"
                className="main-nav-link"
                onClick={closeMenu}
              >
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/howitworks"
                activeClassName="active"
                className="main-nav-link"
                onClick={closeMenu}
              >
                How it works
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pricing"
                activeClassName="active"
                className="main-nav-link"
                onClick={closeMenu}
              >
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                activeClassName="active"
                className="main-nav-link cart-icon-link"
                onClick={closeMenu}
              >
                <TfiShoppingCart />
                {/* Show cart item count if greater than 0 */}
                {cartItemCount > 0 && (
                  <span className="cart-item-count">{cartItemCount}</span>
                )}
              </NavLink>
            </li>
            {/* Conditionally render if the user is logged in */}
            {isLoggedIn && (
              <li>
                <NavLink
                  to="/user"
                  activeClassName="active"
                  className="main-nav-link"
                  onClick={closeMenu}
                >
                  {Image ? (
                    <img
                      src={Image}
                      alt="User Profile"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <FaUserCircle size={20} />
                  )}
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/login"
                activeClassName="active"
                className="main-nav-link nav-cta"
                onClick={closeMenu}
              >
                Try for Free
              </NavLink>
            </li>
          </ul>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu}>
          <FaBars />
        </button>
      </header>
    </>
  );
};

export default Header;
