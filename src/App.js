import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductFormContainer from "./redux/containers/ProductFormContainer";
import ProductListContainer from "./redux/containers/ProductListContainer";
import EditProductForm from "./components/EditProductForm";

function App() {
  return (
    <div className="App">
      <Router>
        <h1>Product Management</h1>
        <Routes>
          <Route path="/" element={<ProductListContainer />} />
          <Route path="/add" element={<ProductFormContainer />} />
          <Route path="/edit/:id" element={<EditProductForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
