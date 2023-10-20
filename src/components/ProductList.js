import React, { useState } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import ConfirmationModal from "./ModalConfirm";

const ProductList = ({ products, onDeleteProduct, discountedSellPrice }) => {
  console.log("dddddhairya", products);
  const categoriesss = [
    "Electronics",
    "Clothing",
    "Furniture",
    "Books",
    "Toys"
  ];

  const columnsToFilter = ["ExpiryDate", "CostPrice", "SellPrice", "Discount"];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState({});
  const [sortColumn, setSortColumn] = useState("");
  const [isSortDescending, setIsSortDescending] = useState(true);
  const [toggle, setToggle] = useState(false);
  const sortedProducts = [...products.products];
const [showSelectModal,setShowSelectModal]=useState(false)
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedProductForDeletion, setSelectedProductForDeletion] = useState(
    null
  );

  // Function to open the confirmation modal
  const openConfirmationModal = (product) => {
    setSelectedProductForDeletion(product);
    setConfirmationModalOpen(true);
  };

  // Function to close the confirmation modal
  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  const closeSelectedModal=()=>{
    setShowSelectModal(false)
  }

  // Function to confirm and delete the selected product
  const confirmDelete = () => {
    onDeleteProduct(selectedProductForDeletion.id);
    setSelectedProductForDeletion(null); // Reset the selected product
    setConfirmationModalOpen(false); // Close the modal
  };

  const sortData = (column, isDescending) => {
    sortedProducts.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) {
        return isDescending ? -1 : 1;
      }
      if (aValue > bValue) {
        return isDescending ? 1 : -1;
      }
      return 0;
    });
  };

  if (sortColumn) {
    sortData(sortColumn, isSortDescending);
  }

  const handleSort = (column) => {
    if (column === sortColumn) {
      setIsSortDescending(!isSortDescending);
    } else {
      setSortColumn(column);
      setIsSortDescending(true);
    }
  };

  const [filterCriteria, setFilterCriteria] = useState(null);

  const filterProducts = (criteria) => {
    setFilterCriteria(criteria);
  };

  const handleBulkDelete = () => {
    const selectedProductIds = Object.keys(selectedProducts).filter(
      (productId) => selectedProducts[productId]
    );


    if (selectedProductIds.length === 0) {
      alert("Please select at least one product to delete.");
      return;
    }

      selectedProductIds.forEach((productId) => {
        onDeleteProduct(productId);
      });

      setSelectedProducts({});
      setShowSelectModal(false)
  };

  const filteredProducts = sortedProducts.filter((product) => {
    const isMatchingCategory =
      selectedCategory === "All" || product.category === selectedCategory;
  
    const isMatchingSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
      console.log("Filter Criteria Applied:", filterCriteria);
     console.log("Filtered Products:", filteredProducts); 

    const isMatchingFilters =
      !filterCriteria ||
      Object.keys(filterCriteria).every((column) => {
        return (
          product[column]?.toLowerCase()?.includes(filterCriteria[column].toLowerCase()) ?? false
        );
      });
      console.log("isMatchingCategory:", isMatchingCategory);
      console.log("isMatchingSearch:", isMatchingSearch);
      console.log("isMatchingFilters:", isMatchingFilters);
    return isMatchingCategory && isMatchingSearch && isMatchingFilters;
  });
  

  return (
    <div>
      <div style={{ display: "flex", marginBottom: "5px" }}>
        <div style={{ justifyContent: "start" }}>Product List</div>
        <div style={{ justifyContent: "center", marginLeft: "10px" }}>
          <Link to="/add">
            <button style={{ padding: "5px" }}>Add Product</button>
          </Link>

          <button style={{ padding: "5px" }} onClick={()=>
                                                setShowSelectModal(true)
          }>
            Delete Selected
          </button>
          <button
            style={{ padding: "5px" }}
            onClick={() => setToggle((prev) => !prev)}
          >
            Filter Product
          </button>
        </div>
      </div>
      <div>{toggle && <Filter filterProducts={filterProducts} columnsToFilter={columnsToFilter} />
}</div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search Products  And Description"
        value={searchTerm}
        style={{ width: "50%" }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category filter dropdown */}
      <label>
        Categories Filter &nbsp;
        </label>
      <select
        value={selectedCategory}
        style={{ width: "50%" }}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        {categoriesss.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      
      <table>
        <thead>
          <tr>
            <th></th>
            <th onClick={() => handleSort("name")}>
              Name{" "}
              {sortColumn === "name" && !isSortDescending ? (
                <span>&uarr;</span>
              ) : (
                <span>&darr;</span>
              )}
            </th>
            <th onClick={() => handleSort("category")}>
              Category{" "}
              {sortColumn === "category" && !isSortDescending ? (
                <span>&uarr;</span>
              ) : (
                <span>&darr;</span>
              )}
            </th>
            <th onClick={() => handleSort("description")}>
              Description{" "}
              {sortColumn === "description" && !isSortDescending ? (
                <span>&uarr;</span>
              ) : (
                <span>&darr;</span>
              )}
            </th>
            {/* Add similar header cells for other columns */}
            <th onClick={() => handleSort("expiryDate")}>
              Expiry Date{" "}
              {sortColumn === "expiryDate" && !isSortDescending ? (
                <span>&uarr;</span>
              ) : (
                <span>&darr;</span>
              )}
            </th>
            <th onClick={() => handleSort("costPrice")}>
              Cost Price{" "}
              {sortColumn === "costPrice" && !isSortDescending ? (
                <span>&uarr;</span>
              ) : (
                <span>&darr;</span>
              )}
            </th>
            <th onClick={() => handleSort("sellPrice")}>
              Sell Price{" "}
              {sortColumn === "sellPrice" && !isSortDescending ? (
                <span>&uarr;</span>
              ) : (
                <span>&darr;</span>
              )}
            </th>
            <th onClick={() => handleSort("discount")}>
              Discount(%){" "}
              {sortColumn === "discount" && !isSortDescending ? (
                <span>&uarr;</span>
              ) : (
                <span>&darr;</span>
              )}
            </th>
            <th onClick={() => handleSort("discountedSellPrices")}>
              Discounted Sell Price{" "}
              {sortColumn === "discountedSellPrices" && !isSortDescending ? (
                <span>&uarr;</span>
              ) : (
                <span>&darr;</span>
              )}
            </th>
            <th onClick={() => handleSort("discountedSellPrices")}>
              Final Price{" "}
              {sortColumn === "discountedSellPrices" && !isSortDescending ? (
                <span>&uarr;</span>
              ) : (
                <span>&darr;</span>
              )}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedProducts[product.id] || false}
                  onChange={(e) =>
                    setSelectedProducts({
                      ...selectedProducts,
                      [product.id]: e.target.checked
                    })
                  }
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>{product.expiryDate}</td>
              <td>{product.costPrice}</td>
              <td>{product.sellPrice}</td>
              <td>{product.discount}%</td>
              <td>{product.discountedSellPrices}</td>
              <td>{product.discountedSellPrices}</td>
              <td style={{ display: "flex" }}>
                <button onClick={() => openConfirmationModal(product)}>
                  Delete
                </button>
                <Link to={`/edit/${product.id}`} state={{ product }}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onConfirm={confirmDelete}
        onClose={closeConfirmationModal}
      />
      {
        showSelectModal &&
        <ConfirmationModal
        isOpen={showSelectModal}
        onConfirm={handleBulkDelete}
        onClose={closeSelectedModal}
      />
      }
    </div>
  );
};

export default ProductList;
