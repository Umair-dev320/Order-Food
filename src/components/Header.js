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
  const { cartItemCount, isLoggedIn, logout } = useContext(AddToCartContext);
  const [showLogout, setShowLogout] = useState(false);
  const toggleLogout = () => setShowLogout((prev) => !prev);
  const handleLogout = () => {
    logout(); // Log out the user
    setShowLogout(false); // Close the dropdown
  };
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
                activeclassname="active"
                className="main-nav-link"
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/menu"
                activeclassname="active"
                className="main-nav-link"
                onClick={closeMenu}
              >
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/howitworks"
                activeclassname="active"
                className="main-nav-link"
                onClick={closeMenu}
              >
                How it works
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pricing"
                activeclassname="active"
                className="main-nav-link"
                onClick={closeMenu}
              >
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                activenlassname="active"
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
            <ul className="main-nav-list">
              {isLoggedIn && (
                <li className="profile-container">
                  <NavLink
                    to="/user"
                    activeclassname="active"
                    className="main-nav-link"
                    onClick={closeMenu}
                  >
                    <div onClick={toggleLogout} className="profile-icon">
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
                    </div>
                  </NavLink>
                  {/* Logout button dropdown */}
                  {showLogout && (
                    <div className="logout-dropdown">
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </li>
              )}
            </ul>
            <div>
              <NavLink
                to="/login"
                activeclassname="active"
                className="main-nav-link nav-cta"
                onClick={closeMenu}
              >
                Try for Free
              </NavLink>
            </div>
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
