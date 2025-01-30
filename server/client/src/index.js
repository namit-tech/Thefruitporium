

import React from 'react';
import { Provider } from 'react-redux'; // Import Provider
import ReactDOM from 'react-dom/client'; // Use react-dom/client
import App from './App';
import store from '../src/components/redux/Store'; // Import your store
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // or your stylesheet

const script = document.createElement("script");
script.src = "https://checkout.razorpay.com/v1/checkout.js";
script.async = true;
document.body.appendChild(script);

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then((registration) => {
//         console.log('Service Worker registered with scope:', registration.scope);
//       })
//       .catch((error) => {
//         console.log('Service Worker registration failed:', error);
//       });
//   });
// }


// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));
// Render the application
root.render(
  <Provider store={store}> 
    <App />
  </Provider>
);






