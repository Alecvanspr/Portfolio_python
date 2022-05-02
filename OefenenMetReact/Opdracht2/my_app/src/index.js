import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from "./BussinessCard/Header"
import About from './BussinessCard/About';
import Footer from './BussinessCard/Footer';
import reportWebVitals from './reportWebVitals';
import logo from './logo.svg';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='app'>
      <Header />
      <About />
      <App />
      <Footer />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
