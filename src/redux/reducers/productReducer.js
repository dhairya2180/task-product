import { ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT } from '../actions/productActions';

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      // Handle adding a product to the state
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case EDIT_PRODUCT:
      // Handle editing a product in the state
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case DELETE_PRODUCT:
      // Handle deleting a product from the state
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };
    default:
      return state;
  }
};

export default productReducer;
