import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './index.css';
import 'aos/dist/aos.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Aos from 'aos';
import App from './App';

Aos.init();

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);