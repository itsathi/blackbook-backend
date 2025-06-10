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
import AdminDashboard from "./pages/admindashboard";
import Userprofile from "./pages/userprofile";
import BeatDetail from "./pages/BeatDetail";
import PackDetail from "./pages/PackDetail";
import { CartProvider } from "./contexts/CartContext";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import Beats from "./pages/beats";
import Packs from "./pages/pack";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import GauriPaighanReleases from "./components/GauriPaighanReleases";

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
          {/* Catch-all route for 404 Not Found. This must be the last route. */}
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/AdminDashBoard" element={<AdminDashboard />} />
          <Route path="/Userprofile" element={<Userprofile />} />
          <Route path="/beats/:id" element={<BeatDetail />} />
          <Route path="/packs/:id" element={<PackDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage/>} />
          <Route path="/beats" element={<Beats/>}/>
          <Route path="/packs" element={<Packs/>}/>
          <Route path="/order-confirmation" element={<OrderConfirmationPage/>}/>
          <Route path="/music-releases" element={<GauriPaighanReleases />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
