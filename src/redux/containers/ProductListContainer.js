import { connect } from "react-redux";
// import ProductList from '../components/ProductList'; // Import your ProductList component
import { deleteProduct } from "../actions/productActions"; // Import your deleteProduct action
import ProductList from "../../components/ProductList";
// import ProductList from "../../components/ProductList";

// Map state to props
const mapStateToProps = (state) => {
  return {
    products: state.products // Assuming your products are stored in the Redux state
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteProduct: (productId) => {
      dispatch(deleteProduct(productId)); // Dispatch the deleteProduct action
    }
  };
};

// Connect the ProductList component with Redux
const ProductListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);

export default ProductListContainer;
