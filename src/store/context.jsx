// /store/context.js

import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

  export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({});


  const setFilter = (newFilters) => {
    const cleanedFilters = Object.entries(newFilters)
      .filter(([_, value]) => value !== undefined && value !== "") // Only include valid filters
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...cleanedFilters };
      console.log("Updated Filters:", updatedFilters); // Log the updated state
      return updatedFilters;
    });
  };
  
  
  const applyFilters = () => filters;

  return (
    <FilterContext.Provider value={{ filters, setFilter, applyFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
