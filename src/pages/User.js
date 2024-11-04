import { FaUserCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AddToCartContext } from "../context/AddToCart";
import { useNavigate } from "react-router-dom";
import Image from "../assets/images/person.jpg";

const User = () => {
  const { isLoggedIn, userProfile } = useContext(AddToCartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user");
    }
    setLoading(false);
  }, [isLoggedIn, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {Image ? (
        <img
          src={Image}
          alt="User Profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ) : (
        <FaUserCircle size={100} />
      )}
      {isLoggedIn ? (
        userProfile ? (
          <div>
            <h2>
              Welcome, <br />
              {userProfile.name || "User"}!
            </h2>
            <p>{userProfile.email || "No email provided"}</p>
          </div>
        ) : (
          <div>Loading profile...</div>
        )
      ) : (
        <div>
          <h2>You are not logged in!</h2>
          <p>Please log in to view your profile.</p>
        </div>
      )}
    </div>
  );
};

export default User;
