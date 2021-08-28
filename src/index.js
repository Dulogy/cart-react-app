import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKgrgUgOVWHVIO4L20ELB3w85QLoWSGCo",
  authDomain: "cart-dk.firebaseapp.com",
  projectId: "cart-dk",
  storageBucket: "cart-dk.appspot.com",
  messagingSenderId: "533212532183",
  appId: "1:533212532183:web:d600b83906f27cf9688f92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
