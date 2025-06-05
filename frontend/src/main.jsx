import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom'; 
import App from './App.jsx'; // Make sure this path is correct
import './index.css'; // Make sure this CSS file exists or remove the import if not needed

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);