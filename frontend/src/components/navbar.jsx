import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Music, Box, User, Info } from 'lucide-react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <nav className="lg:hidden bg-gray-400 text-white p-4">
            <div className="flex items-center">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white text-2xl focus:outline-none transition-transform duration-200"
                    aria-label="Toggle navigation"
                >
                    {isOpen ? '✖' : '☰'}
                </button>
            </div>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <ul className="flex flex-col mt-4 space-y-2">
                    <li>
                        <NavLink
                            to="/beats"
                            className={({ isActive }) =>
                                `flex items-center gap-2 block px-2 py-1 rounded transition-colors duration-200 hover:bg-gray-800 ${
                                    isActive ? 'bg-gray-800' : ''
                                }`
                            }
                        >
                            <Music size={18} /> Beats
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/packs"
                            className={({ isActive }) =>
                                `flex items-center gap-2 block px-2 py-1 rounded transition-colors duration-200 hover:bg-gray-800 ${
                                    isActive ? 'bg-gray-800' : ''
                                }`
                            }
                        >
                            <Box size={18} /> Packs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `flex items-center gap-2 block px-2 py-1 rounded transition-colors duration-200 hover:bg-gray-800 ${
                                    isActive ? 'bg-gray-800' : ''
                                }`
                            }
                        >
                            <Info size={18} /> About Me
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/Userprofile"
                            className={({ isActive }) =>
                                `flex items-center gap-2 block px-2 py-1 rounded transition-colors duration-200 hover:bg-gray-800 ${
                                    isActive ? 'bg-gray-800' : ''
                                }`
                            }
                        >
                            <User size={18} /> Account
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;