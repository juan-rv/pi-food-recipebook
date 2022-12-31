import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';// componente para embvolver app 
import { Provider } from 'react-redux';
import {Auth0Provider} from '@auth0/auth0-react'
import store from './redux/store/store'
import axios from "axios"
import './index.css'

const domain = "dev-4grorxjpwzb2mzkw.us.auth0.com"
const clientID = 'NX0KxGJ7Jp67FQVPiUPCsC3TNNYyYllG'

//axios.defaults.baseURL = "http://localhost:3001"
axios.defaults.baseURL = "https://back-recipe-book.onrender.com/"


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>  {/* necesita recibir store; deja disponible redux para el componente que quiere utilizar */}
      <BrowserRouter>
        <Auth0Provider
          domain={domain}
          clientId={clientID}
          redirectUri={window.location.origin} >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

