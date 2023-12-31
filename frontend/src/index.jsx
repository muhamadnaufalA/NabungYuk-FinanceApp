import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import "bulma/css/bulma.css";
import swDev from "./swDev";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// swDev();

// Jika ingin mendukung fitur push notification, pastikan izin notifikasi diizinkan oleh pengguna.
if ('Notification' in window && Notification.permission !== 'denied') {
  Notification.requestPermission();
}