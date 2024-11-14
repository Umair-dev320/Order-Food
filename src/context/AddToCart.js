import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Create context
export const AddToCartContext = createContext();
const googleProvider = new GoogleAuthProvider();

export const AddToCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  // Check for user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Fetch additional profile data if needed
        setUserProfile({
          name: user.displayName,
          email: user.email,
        });
      } else {
        setUser(null);
        setUserProfile(null); // Clear profile if user logs out
      }
    });
    return () => unsubscribe();
  }, []);

  // Cart persistence
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCart) setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      navigate("/userlogin");
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });

    setCartItemCount((prevCount) => prevCount + 1);
    setPopupVisible(true);

    setTimeout(() => {
      setPopupVisible(false);
    }, 3000);
  };

  const signupUserwithEmailAndPassword = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await addDoc(collection(db, "Register Users"), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
      });
      alert("User signed up successfully!");
      navigate("/user");
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user: " + error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginUserwithEmailAndPassword = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User logged in successfully!");
      navigate("/user"); // Navigate to profile after login
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to login: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signinWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/user"); // Navigate to profile after Google login
      return result.user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Failed to sign in with Google: " + error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setCartItems([]); // Clear cart on logout
      navigate("/"); // Redirect to login page after logout
      alert("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to logout: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === itemId && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  // Delete item from cart
  const deleteItem = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== itemId)
    );
    setCartItemCount((prevCount) => prevCount - prevCount);
  };

  const isLoggedIn = user ? true : false; // Login status

  return (
    <AddToCartContext.Provider
      value={{
        cartItems,
        addToCart,
        cartItemCount,
        popupVisible,
        signupUserwithEmailAndPassword,
        loginUserwithEmailAndPassword,
        decreaseQuantity,
        increaseQuantity,
        deleteItem,
        isLoggedIn,
        logout,
        signinWithGoogle,
        loading,
        userProfile,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </AddToCartContext.Provider>
  );
};
