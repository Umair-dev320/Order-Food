import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import HowItWorks from "./pages/HowItWorks";
import Header from "./components/Header";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import CreateAccount from "./pages/CreateAccount";
import Popup from "./components/Popup";
import CartItem from "./pages/CartItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLogin from "./userLogin/UserLogin";
import UserRegister from "./userLogin/UserRegister";
import User from "./pages/User";
import Menu from "./pages/Menu";
import PaymentMethod from "./pages/PaymentMethod";
import { CreditCard } from "./pages/CreditCard";
import Jazzcash from "./pages/Jazzcash";
import Easypaisa from "./pages/Easypaisa";
import Address from "./pages/Address";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="App">
      <Header />
      <Popup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userregister" element={<UserRegister />} />
        <Route path="/address" element={<Address />} />
        <Route path="/paymentmethod" element={<PaymentMethod />} />
        <Route path="/payment/creditcard" element={<CreditCard />} />
        <Route path="/payment/jazzcash" element={<Jazzcash />} />
        <Route path="/payment/easypaisa" element={<Easypaisa />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
