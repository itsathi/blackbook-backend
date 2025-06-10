import React from "react";
import { Upload } from "lucide-react";
import Addbeats from "../components/uploadbeats";
import Footer from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Addpacks from "../components/uploadpacks"

function admindashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1 min-h-[80vh] transition-all duration-300">
        <Sidebar />
        <div className="flex-1 p-6 transition-all duration-300">
          <Addbeats />
          <Addpacks/>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default admindashboard;
