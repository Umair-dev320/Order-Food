import React, { useState } from "react";
import "./CreateAccount.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { toast } from "react-toastify";

// Initialize Firebase Auth
const auth = getAuth();

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    plan: "",
    card: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, name, phone, plan, card } = formData;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          name: name,
          email: user.email,
          phone: phone,
          plan: plan,
          card: card,
        });

        console.log("User Registered Successfully!!");
        toast.success("User Registered Successfully!!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="create-account">
      <h2 className="create-account-heading">Create Your Account</h2>
      <form className="create-account-form">
        <div className="form-groups">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            autoComplete="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            autoComplete="tel"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="plan" className="form-label">
            Select Your Plan
          </label>
          <select
            id="plan"
            name="plan"
            className="form-select"
            value={formData.plan}
            onChange={handleChange}
            autoComplete="off"
          >
            <option value="" disabled>
              Select the option
            </option>
            <option value="starter">Starter Plan</option>
            <option value="complete">Complete Plan</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="credit-card" className="form-label">
            Credit Card
          </label>
          <input
            type="number"
            id="credit-card"
            name="card"
            className="form-input"
            value={formData.card}
            onChange={handleChange}
            placeholder="Enter your card number"
            autoComplete="cc-number"
          />
        </div>
      </form>
      <button type="submit" className="buttons" onClick={handleRegister}>
        CreateAccount
      </button>
    </div>
  );
};

export default CreateAccount;
