import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import AdminLoginPage from './pages/AdminLoginPage';
import UserLoginPage from './pages/UserLoginPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
   
      <div className="App">
        
        

        




        
          <Routes>
            {/* Define your routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/login" element={<UserLoginPage />} />

            {/* Catch-all route for 404 Not Found. This must be the last route. */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        
      </div>
    
  );
}

export default App;