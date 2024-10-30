import React from "react";
import "./Pricing.css";
import {
  IoCheckmarkOutline,
  IoCloseOutline,
  IoInfiniteOutline,
  IoNutritionOutline,
  IoLeafOutline,
  IoPauseOutline,
} from "react-icons/io5";

const featureIcons = {
  IoInfiniteOutline: IoInfiniteOutline,
  IoNutritionOutline: IoNutritionOutline,
  IoLeafOutline: IoLeafOutline,
  IoPauseOutline: IoPauseOutline,
};

const pricingPlans = [
  {
    name: "Starter",
    price: 399,
    pricePerMeal: 13,
    perks: [
      { text: "1 meal per day", included: true },
      { text: "Order from 11am to 9pm", included: true },
      { text: "Delivery is free", included: false },
      { text: "Get access to the latest recipes", included: false },
    ],
  },
  {
    name: "Complete",
    price: 649,
    pricePerMeal: 11,
    perks: [
      { text: "2 meals per day", included: true },
      { text: "Order 24/7", included: true },
      { text: "Delivery is free", included: true },
      { text: "Get access to the latest recipes", included: true },
    ],
  },
];

const features = [
  {
    id: 1,
    icon: "IoInfiniteOutline",
    title: "Never cook again!",
    text: "Our subscriptions cover 365 days per year, even including major holidays.",
  },
  {
    id: 2,
    icon: "IoNutritionOutline",
    title: "Local and organic",
    text: "Our cooks only use local, fresh, and organic products to prepare your meals.",
  },
  {
    id: 3,
    icon: "IoLeafOutline",
    title: "No waste",
    text: "All our partners only use reusable containers to package all your meals.",
  },
  {
    id: 4,
    icon: "IoPauseOutline",
    title: "Pause anytime",
    text: "Going on vacation? Just pause your subscription, and we refund unused days.",
  },
];

const Pricing = () => {
  return (
    <section className="section-pricing">
      <div className="contained">
        <h2 className="heading">Eating well without breaking the bank</h2>
      </div>

      <div className="container main-contaniners">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-plan ${
              plan.name === "Complete" ? "pricing-plan--complete" : ""
            }`}
          >
            <header className="plan-header">
              <p className="plan-name">{plan.name}</p>
              <p className="plan-price">
                <span>$</span>
                {plan.price}
              </p>
              <p className="plan-text">
                per month, That's just ${plan.pricePerMeal} per meal!
              </p>
            </header>
            <ul className="list">
              {plan.perks.map((perk, i) => (
                <li key={i} className="list-item">
                  {perk.included ? (
                    <IoCheckmarkOutline className="list-icon" />
                  ) : (
                    <IoCloseOutline className="list-icon" />
                  )}
                  <span>{perk.text}</span>
                </li>
              ))}
            </ul>
            <div className="plan-sign-up">
              <a href="/createaccount" className="button-m ">
                Start eating well
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="container grid">
        <aside className="plan-details">
          Prices include all applicable taxes. You can cancel at any time. Both
          plans include the following:
        </aside>
      </div>
      <div className="container  grid-4">
        {features.map((feature) => {
          const Icon = featureIcons[feature.icon];
          return (
            <div className="feature" key={feature.id}>
              <Icon className="feature-icon" />
              <p className="feature-title">{feature.title}</p>
              <p className="feature-text">{feature.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Pricing;
