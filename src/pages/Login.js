import React from "react";
import "./Login.css";
import "../App.css";

const Login = () => {
  return (
    <>
      <section className="cta">
        <div className="cta-text-box">
          <h2 className="heading-secondary">Get your first meal for free!</h2>
          <p className="cta-text">
            Healthy, tasty and hassle-free meals are waiting for you. Start
            eating well today. You can cancel or pause anytime. And the first
            meal is on us!
          </p>

          <form className="cta-form">
            <div>
              <label htmlFor="full-name">Full Name</label>
              <input id="full-name" type="text" placeholder="Smith" required />
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="me@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="select-where">Where did you know from us?</label>
              <select id="select-where" required>
                <option value="">Please choose one option:</option>
                <option value="friends">Friends and Family</option>
                <option value="youtube">Youtube video</option>
                <option value="podcast">Podcast</option>
                <option value="ad">Facebook ad</option>
                <option value="others">others</option>
              </select>
            </div>

            <button className="btn btn--form">Sign up now</button>
          </form>
        </div>
        <div
          className="cta-img-box"
          role="img"
          aria-label="Woman enjoying food"
        ></div>
      </section>
    </>
  );
};

export default Login;
