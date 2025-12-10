import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; // updated path to your CSS
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
