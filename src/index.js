import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/homePage.css';
import './css/loginModal.css';
import './css/searchPage.css';
import './css/petModal.css';
import './css/petPage.css';
import './css/homepageUsers.css';
import './css/profile.css';
import './css/myPets.css';
import './css/adminPage.css';
import './css/admUserPage.css';
import './css/editPetPage.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
