import { connect } from "react-redux";
// import ProductForm from '../components/ProductForm'; // Import your ProductForm component
// import { addProduct, editProduct } from "../actions/productActions";
import ProductForm from "../../components/ProductForm";
import { editProduct } from "../actions/productActions";
import { addProduct } from "../actions/productActions";
// import ProductForm from "../../components/ProductForm";
// import { addProduct, editProduct } from '../actions/productActions'; // Import your addProduct and editProduct actions

// Map state to props
const mapStateToProps = (state) => {
  return {
    // You can map any product-related data from your Redux state here if needed
    products: state.products
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    onAddProduct: (product) => {
      dispatch(addProduct(product)); // Dispatch the addProduct action
    },
    onEditProduct: (product) => {
      dispatch(editProduct(product)); // Dispatch the editProduct action
    }
  };
};

// Connect the ProductForm component with Redux
const ProductFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm);

export default ProductFormContainer;
