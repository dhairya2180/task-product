import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import productReducer from './redux/reducers/productReducer';

const rootReducer = combineReducers({
  products: productReducer, // Replace 'products' with the name you've given to your product reducer
  // Add other reducers as needed
});

const middleware = [thunk]; // You can add more middleware if necessary

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
    