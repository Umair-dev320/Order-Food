import React from "react";
import LogoImage from "../assets/images/omnifood-logo.png";
import { BsInstagram } from "react-icons/bs";
import { MdOutlineFacebook } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";
import "../App.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container grid--footer">
        <div className="logo-col">
          <a href="/" className="footer-logo">
            <img className="logos" alt="Omifood logo" src={LogoImage} />
          </a>
          <p className="description">
            Discover freshly prepared meals for every craving. From vegetarian
            to desi flavors and fast food, enjoy easy online ordering, fast
            delivery, and great service.
          </p>
          <ul className="social-links">
            <li>
              <a className="footer-link" href="https://www.instagram.com/">
                <BsInstagram className="social-icon" name="logo-Instagram" />
              </a>
            </li>

            <li>
              <a className="footer-link" href="https://www.facebook.com/">
                <MdOutlineFacebook
                  className="social-icon"
                  name="logo-facebook"
                />
              </a>
            </li>

            <li>
              <a className="footer-link" href="https://www.twitter.com/">
                <FaXTwitter className="social-icon" name="logo-twitter" />
              </a>
            </li>
          </ul>
        </div>

        <nav className="nav-col">
          <p className="footer-heading">Account</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="/">
                Create account
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                Sign in
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                iOS app
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                Android app
              </a>
            </li>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">Company</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="/">
                About Omnifood
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                For Business
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                Cooking partners
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                Careers
              </a>
            </li>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">Resorces</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="/">
                Recipe directory
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                Help center
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                Privacy & terms
              </a>
            </li>
          </ul>
        </nav>
        <div className="address-col">
          <p className="footer-heading">Contact us</p>

          <address className="contacts">
            <p className="address">
              623 Harrison St., 2nd Floor,
              <br /> San Francisco, CA 94107.
            </p>
            <p>
              <a className="footer-link" href="tel:415-201-6370">
                415-201-6370
              </a>{" "}
              <br />
              <a className="footer-link" href="mailto:hello@omnifood.com">
                hello@omnifood.com
              </a>
            </p>
          </address>
        </div>
      </div>
      <p className="copyright">
        Copyright &copy; ,<span className="year">2024</span> by Omnifood, Inc.
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
