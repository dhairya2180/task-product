import React from "react";
import ProductForm from "./ProductForm";
import { useLocation } from "react-router-dom";
const EditProductForm = () => {
  const location = useLocation();
  const { product, onSubmit } = location.state;

  return (
    <div>
      <h2>Edit Product</h2>
      <ProductForm initialProduct={product} onSubmit={onSubmit} />
    </div>
  );
};

export default EditProductForm;
