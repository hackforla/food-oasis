import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import './styles/root.css';
import App from './App';
import { StateProvider } from 'state/store';

const FoodOasis = (
  <StateProvider>
    <App />
  </StateProvider>
);

ReactDOM.render(FoodOasis, document.getElementById('root'));
