import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';// componente para embvolver app 
import { Provider } from 'react-redux';
import store from './redux/store/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>  {/* necesita recibir store; deja disponible redux para el componente que quiere utilizar */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

