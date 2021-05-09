import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import './index.css';
import throttle from 'lodash/throttle'
import {saveCart} from "./features/cart/cartLocalStorage";


// We save the cart state to browser local storage,
// to persist it between page reloads
// We set up a subscriber to the redux store,
// which will save the cart state when notified of a change to
// the redux store content.
// We use throttle from lodash, to limit the frequency
// at which this action is performed, as writing to local
// storage can be resource intensive.
store.subscribe(throttle(() =>
    saveCart({
        cart: store.getState().cart
    }),
1000));

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

