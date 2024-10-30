import React, { useState } from "react";
import "./Login.css";
import "../App.css";

const Login = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whereDidYouKnow, setWhereDidYouKnow] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!fullName) newErrors.fullName = "Full Name is required";
    if (!email) newErrors.email = "Email Address is required";
    if (!whereDidYouKnow) newErrors.whereDidYouKnow = "Please choose an option";

    setErrors(newErrors);

    // If there are no errors then login:
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted");
    }
  };

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

          <form className="cta-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="full-name">Full Name</label>
              <input
                id="full-name"
                type="text"
                placeholder="Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <span className="error">{errors.fullName}</span>
              )}
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="me@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div>
              <label htmlFor="select-where">Where did you know from us?</label>
              <select
                id="select-where"
                value={whereDidYouKnow}
                onChange={(e) => setWhereDidYouKnow(e.target.value)}
              >
                <option value="">Please choose one option:</option>
                <option value="friends">Friends and Family</option>
                <option value="youtube">Youtube video</option>
                <option value="podcast">Podcast</option>
                <option value="ad">Facebook ad</option>
                <option value="others">others</option>
              </select>
              {errors.whereDidYouKnow && (
                <span className="error">{errors.whereDidYouKnow}</span>
              )}
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
