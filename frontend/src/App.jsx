import React from "react";
import { BrowserRouter, Routes, Route, Router, Link } from "react-router-dom";
import HomePage from "./pages/Start";
import SignUpPage from "./pages/SignUpPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import UserLoginPage from "./pages/UserLoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import Start from "./pages/Start";
import Home from "./pages/Home";
import About from "./pages/about";
import Userprofile from "./pages/userprofile";
import BeatDetail from "./pages/BeatDetail";
import { CartProvider } from "./contexts/CartContext";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import Beats from "./pages/beats";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import GauriPaighanReleases from "./components/GauriPaighanReleases";
import AdminDashBoard from "./pages/admindashboard";
import Releases from "./pages/releases";
import UserProfilePage from "./pages/userprofile";

function App() {
  return (
    <div className="App">
       <CartProvider>
        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<Start />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/admin/dashboard"element={<AdminDashBoard/>}/>
          <Route path="/Userprofile" element={<Userprofile />} />
          <Route path="/beats/:id" element={<BeatDetail />} />
    
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage/>} />
          <Route path="/beats" element={<Beats/>}/>
          <Route path="/releases" element={<Releases/>}/>
          <Route path="/order-confirmation" element={<OrderConfirmationPage/>}/>
          <Route path="/music-releases" element={<GauriPaighanReleases />} />
            <Route path="/userprofile" element={<UserProfilePage/>} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;

