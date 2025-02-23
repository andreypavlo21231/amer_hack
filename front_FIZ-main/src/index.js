import React from 'react';  // Import React
import ReactDOM from 'react-dom/client';  // Import ReactDOM for rendering
import './main.css';  // Enabling Styles
import './reset.css';
import App from './App';  // Importing a component App

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />  {/* Rendering of the App component */}
  </React.StrictMode>
);
