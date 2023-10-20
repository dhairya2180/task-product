import React, { useState } from "react";

const Filter = ({ filterProducts }) => {
  const [filters, setFilters] = useState({
   
    expiryDate: "",
    costPrice: "",
    sellPrice: "",
    discount: "",
  });

  const handleFilterChange = (e, columnName) => {
    const updatedFilters = { ...filters, [columnName]: e.target.value };
    setFilters(updatedFilters);
  };

  const handleApplyFilter = () => {
    filterProducts(filters);
  };

  const handleResetFilter = () => {
    setFilters({
     
      expiryDate: "",
      costPrice: "",
      sellPrice: "",
      discount: "",
    });
    filterProducts({});
  };

  return (
    <div>
      <h3>Filter Products</h3>
      <div style={{display:"flex"}}>
        {Object.keys(filters).map((column) => (
          <div key={column} >
            <label>{column}:</label>
            <input
              type={column==="expiryDate" ?"date":"text"}
              style={{width:`${column=="expiryDate"?"75%":"75%"}`}}
              value={filters[column]}
              onChange={(e) => handleFilterChange(e, column)}
            />
          </div>
        ))}
  
     <div> <button style={{padding:"10px",marginTop:"25px"}} onClick={handleResetFilter}>Reset </button> </div>
     <div> <button style={{padding:"10px",marginTop:"25px"}} onClick={handleApplyFilter}>Apply </button> </div>
      </div>
    </div>
  );
};

export default Filter;
