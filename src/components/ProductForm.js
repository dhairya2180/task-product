import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../redux/actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ProductForm = ({
  initialProduct = null,
  onDiscountedSellPriceChange
}) => {
  const categories = ["Electronics", "Clothing", "Furniture", "Books", "Toys"];

  const [discountedSellPrice, setDiscountedSellPrice] = useState(0);
  const [product, setProduct] = useState(
    initialProduct || {
      id: "",
      name: "",
      category: "",
      description: "",
      expiryDate: "",
      costPrice: "",
      sellPrice: "",
      discount: "",
      discountedSellPrices: ""
    }
  );

  const [finalPrice, setFinalPrice] = useState(0);

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!product.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!product.category) {
      newErrors.category = "Category is required";
    }

    if (!product.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!product.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry Date is required";
    }

    if (isNaN(parseFloat(product.costPrice))) {
      newErrors.costPrice = "Valid Cost Price is required";
    }

    if (isNaN(parseFloat(product.sellPrice))) {
      newErrors.sellPrice = "Valid Sell Price is required";
    } else if (parseFloat(product.sellPrice) < parseFloat(product.costPrice)) {
      newErrors.sellPrice = "Sell Price cannot be lower than Cost Price";
    }

    if (isNaN(parseFloat(product.discount))) {
      newErrors.discount = "Valid Discount (%) is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const updateDiscountedSellPrices = (newDiscountedSellPrices) => {
    setProduct({
      ...product,
      discountedSellPrices: newDiscountedSellPrices
    });
  };

  useEffect(() => {
    // Calculate discounted sell price and final price whenever relevant fields change
    if (
      !isNaN(parseFloat(product.costPrice)) &&
      !isNaN(parseFloat(product.sellPrice)) &&
      !isNaN(parseFloat(product.discount))
    ) {
      const discountedPrice =
        product.sellPrice - (product.sellPrice * product.discount) / 100;
      setDiscountedSellPrice(discountedPrice);
      const final = product.sellPrice - product.costPrice;
      setFinalPrice(final);
      updateDiscountedSellPrices(discountedPrice);
      // setProduct.discountedSellPrices(discountedPrice);
    } else {
      setDiscountedSellPrice(0);
      setFinalPrice(0);
    }
  }, [product.costPrice, product.sellPrice, product.discount]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      if (!product.id) {
        product.id = uuidv4();
      }

      if (initialProduct) {
        dispatch(editProduct(product));
        navigate("/");
      } else {
        dispatch(addProduct(product));
        navigate("/");
      }

      setProduct({
        id: "",
        name: "",
        category: "",
        description: "",
        expiryDate: "",
        costPrice: "",
        sellPrice: "",
        discount: "",
        discountedSellPrices: ""
      });

      setDiscountedSellPrice(0);
      setFinalPrice(0);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Link to="/">
             <div style={{display:"flex",justifyContent:"end"}}>
              <button style={{padding:"10px"}}>Product List</button></div>
             </Link>
      <div style={{display:"flex",justifyContent:"space-around"}}>
      <div className="form-group" style={{ width: "40%" }}>
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div className="form-group" style={{ width: "40%" }}>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          required
        >
          <option value="" disabled>
            Select a Category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <div className="error">{errors.category}</div>}
      </div>

      </div>

      <div style={{display:"flex",justifyContent:"space-around"}}>
      <div className="form-group" style={{ width: "40%" }}>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          required
        />
        {errors.description && (
          <div className="error">{errors.description}</div>
        )}
      </div>

      <div className="form-group" style={{ width: "40%" }}>
        <label htmlFor="expiryDate">Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          value={product.expiryDate}
          onChange={(e) =>
            setProduct({ ...product, expiryDate: e.target.value })
          }
          required
        />
        {errors.expiryDate && <div className="error">{errors.expiryDate}</div>}
      </div>
      </div>

      <div style={{display:"flex",justifyContent:"space-around"}}>
      <div className="form-group" style={{ width: "40%" }}>
        <label htmlFor="costPrice">Cost Price</label>
        <input
          type="number"
          name="costPrice"
          value={product.costPrice}
          onChange={(e) =>
            setProduct({ ...product, costPrice: e.target.value })
          }
          required
        />
        {errors.costPrice && <div className="error">{errors.costPrice}</div>}
      </div>

      <div className="form-group" style={{ width: "40%" }}>
        <label htmlFor="sellPrice">Sell Price</label>
        <input
          type="number"
          name="sellPrice"
          value={product.sellPrice}
          onChange={(e) =>
            setProduct({ ...product, sellPrice: e.target.value })
          }
          required
        />
        {errors.sellPrice && <div className="error">{errors.sellPrice}</div>}
      </div>
      </div>


<div style={{display:"flex",justifyContent:"space-around"}}>
      <div className="form-group" style={{ width: "40%" }}>
        <label htmlFor="discount">Discount (%)</label>
        <input
          type="number"
          name="discount"
          value={product.discount}
          onChange={(e) => setProduct({ ...product, discount: e.target.value })}
          required
        />
        {errors.discount && <div className="error">{errors.discount}</div>}
      </div>

      <div className="form-group" style={{ width: "40%" }}>
        <label htmlFor="discountedSellPrices">discounted Sell Price</label>
        <input
          type="number"
          name="discountedSellPrices"
          value={product.discountedSellPrices}
          // onChange={(e) =>
          //   setProduct({ ...product, discountedSellPrices: e.target.value })
          // }
          required
          disabled
        />
        {/* {errors.sellPrice && <div className="error">{errors.sellPrice}</div>} */}
      </div>
      </div>

      {/* <div style={{ display: "flex" }}>
        <p>Discounted Sell Price:  </p>
      </div> */}
<div style={{display:"flex",justifyContent:"center"}}>
      <button type="submit" style={{ width: "50%",display:"flex",justifyContent:"center",padding:"12px " }}>
        Save
      </button>
      </div>
    </form>
  );
};

export default ProductForm;
