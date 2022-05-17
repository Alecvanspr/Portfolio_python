import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./TravelJournal/Style.css"
import Header from "./TravelJournal/Header"
import Data from "./TravelJournal/Data"
import Topic from './TravelJournal/Topic';


import reportWebVitals from './reportWebVitals';

const topics = Data.map(
      item=>
            <Topic 
                  key = {item.id}
                  item = {item}
            /> 
      );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Header />
            <div className='deck'>
              {topics}
            </div>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
