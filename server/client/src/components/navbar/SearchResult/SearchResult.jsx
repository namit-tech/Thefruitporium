import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardData from "../../Cards/CardData";


const SearchResult = () => {
   const location = useLocation();
  const filteredProducts = location.state?.filteredProducts || []; // 
  console.log("filteredproducts", filteredProducts);
  
  return (
<>
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<div>
      <h2>Search Results</h2>
      <CardData products={filteredProducts} /> {/* Pass filtered products */}
    </div>

        </>
  );
};

export default SearchResult;
