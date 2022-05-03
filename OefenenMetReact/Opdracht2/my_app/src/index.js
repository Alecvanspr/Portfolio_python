import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./Airbnb/Style.css"
import Hero from "./Airbnb/Hero"
import App from './App';
import Header from './Airbnb/Header';
import Card from './Airbnb/Card';

import reportWebVitals from './reportWebVitals';
import logo from './logo.svg';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Header />
        <Hero />
        <div class="deck">
          <Card 
                img = "image 12.png"
                rating = "5.0" 
                reviewCount = { 6 }
                country = "USA"
                title= "Life Lessons with Katie Zaferes"
                price= {136}
          />

    <Card 
                img = "wedding-photography 1.png"
                rating = "5.0" 
                reviewCount = { 6 }
                country = "USA"
                title= "Life Lessons with Katie Zaferes"
                price= {136}
          />
  </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
