import React from "react";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"
import logo from "../assets/images/logo.jpeg";


function Footer() {
    return (
        <footer className="flex-row bg-neutral-900 text-white w-full  mt-auto">
            <div className="grid grid-cols-1 justify-items-center sm:grid-cols-3 gap-3 p-2">
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-col space-y-2 p-1 m-0.5">
                        <img
                            src={logo}  
                            alt="Logo"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    </div>
                    <div>
                        <div>
                            <h1 className="text-shadow-grey">Athinemmusic</h1>
                            <h1 className="text-shadow-grey">Create.Connect.Conquer</h1>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h1>Socials</h1>
                        <ul className="flex space-x-4">
                            <li>
                                <a href="https://www.instagram.com/athinemmusic/" target="_blank" rel="noopener noreferrer">
                                    <Instagram />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/atharva.acharya.902" target="_blank" rel="noopener noreferrer">
                                    <Facebook />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.twitter.com/athinemmusic" target="_blank" rel="noopener noreferrer">
                                    <Twitter />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/@athinemmusic8402" target="_blank" rel="noopener noreferrer">
                                    <Youtube />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <h1>Quick Links</h1>
                    <ul className="flex flex-col space-y-2">
                        <li>
                            <a href="/">-Home</a>
                        </li>
                        <li>
                            <a href="/about">-About Us</a>
                        </li>
                        <li>
                            <a href="/beats">-Beats</a>
                        </li>
                        <li>
                            <a href="/packs">-Sample Packs</a>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col space-y-2">
                    <h2>Support</h2>
                    <ul className="flex flex-col space-y-2">
                        <li>
                            <a href="/faq">-FAQ</a>
                        </li>
                        <li>
                            <a href="/terms">-Terms of Service</a>
                        </li>
                        <li>
                            <a href="/contact">-Contact Us</a>
                        </li>
                        <li>
                            <a href="/license">-license</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex justify-center items-center h-16 bg-black-400">
                <p className="text-white text-shadow-md">
                    ©️ 2023 Athinemmusic. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
