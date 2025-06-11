import React from "react";
import Addbeats from "../components/uploadbeats";
import Footer from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

function AdminDashBoard() { // Renamed to PascalCase for consistency
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100 font-sans"> {/* Dark background for the whole page */}
      <Header /> {/* Assuming Header is styled separately */}

      <div className="flex flex-1 min-h-[80vh]">
        <Sidebar /> {/* Assuming Sidebar is styled separately with dark theme */}
        <div className="flex-1 p-8 transition-all duration-300 ease-in-out bg-gray-900"> {/* Dark content area */}
          <Addbeats /> {/* Assuming Addbeats is styled separately */}
        </div>
      </div>

      <Footer /> {/* Assuming Footer is styled separately */}
    </div>
  );
}

export default AdminDashBoard;
