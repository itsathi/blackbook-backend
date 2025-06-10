// filepath: /path/to/your/frontend/components/Header.jsx

import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpeg";
import Navbar from "./navbar"; // Assuming Navbar is a separate component

// Import icons from lucide-react
import { ShoppingCart } from 'lucide-react';

// Import the useCart hook to access cart data
import { useCart } from '../contexts/CartContext'; // Adjust path if necessary

const Header = () => {
    const { getItemCount } = useCart(); // Get the total item count from cart context

    return (
        <header>
            <div className="flex items-center justify-between px-5 py-2 bg-white border-b border-gray-200">
                <Link to="/" className="flex items-center no-underline text-gray-800 font-bold text-lg">
                    <img src={logo} alt="Logo" className="h-10 rounded-3xl" />
                </Link>

                <nav className="flex items-center space-x-4"> {/* Added flex for spacing */}
                    {/* Cart Link with Icon and Item Count */}
                    <Link
                        to="/cart"
                        className="no-underline text-gray-800 hover:text-blue-600 transition-colors duration-200 ease-in-out flex items-center space-x-1 font-bold text-base relative"
                    >
                        <ShoppingCart size={24} /> {/* Cart Icon */}
                        {getItemCount() > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                                {getItemCount()}
                            </span>
                        )}
                    </Link>

                    {/* Placeholder for other header nav items if any,
                        or you might integrate the "Account" link here if not moving to Navbar/Sidebar */}
                </nav>
            </div>
            <Navbar /> {/* Navbar component will contain the Account link now */}
        </header>
    );
};

export default Header;