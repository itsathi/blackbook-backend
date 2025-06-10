import React from 'react';
import Header from '../components/header'
import Footer from '../components/footer'
import Sidebar from '../components/sidebar'
import ShowAllPacks from '../components/ShowAllPacks'
import ShowAllBeats from '../components/ShowAllBeats'

function Packs() {
  return (
      <div className="flex flex-col min-h-screen bg-gray-50 transition-colors duration-300">
      <Header />
      <div className="flex flex-1 min-h-[80vh] transition-all duration-300">
        <Sidebar />
        <div className="flex-1 p-6 transition-all duration-300">
           
           <ShowAllPacks/>
          
        
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Packs