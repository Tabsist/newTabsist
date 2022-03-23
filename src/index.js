import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import browser from "webextension-polyfill";
// import reportWebVitals from './reportWebVitals';
console.log("hi")
const insertionPoint = document.createElement("div");
insertionPoint.id = "insertion-point";
document.body.parentNode.insertBefore(insertionPoint, document.body);

// browser.runtime.sendMessage({type: "tabsist_session",action:"add"}).then( function(response) {
//   console.log("12",response);
//   browser.runtime.sendMessage({type: "tabsist_session",action:"getAllSessions"}).then( function(response) {
//     console.log("211",response);
//   });
// });

// browser.runtime.sendMessage({type: "tabsist_session",action:"getAllSessions"}).then( function(response) {
//   console.log("21",response);
// });

window.onload = function() {
  // setInterval(() => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      insertionPoint
      // document.getElementById('insertion-point')
    );
  // }, 5000);

}


