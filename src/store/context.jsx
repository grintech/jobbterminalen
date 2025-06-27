import{ createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({});

  // const setFilter = (newFilter) => {
  //   setFilters((prevFilters) => {
  //     const updatedFilters = { ...prevFilters, ...newFilter };
  
  //     // Remove empty filters (when unchecking)
  //     Object.keys(updatedFilters).forEach((key) => {
  //       if (updatedFilters[key] === "" || updatedFilters[key] === null || updatedFilters[key] === undefined) {
  //         delete updatedFilters[key];
  //       }
  //     });
  
  //     return updatedFilters;
  //   });
  // };

 const setFilter = (newFilter) => {
  setFilters((prevFilters) => {
    const merged = { ...prevFilters, ...newFilter };

    // Clean out empty/undefined/null filters
    Object.keys(merged).forEach((key) => {
      if (!merged[key]) {
        delete merged[key];
      }
    });

    return merged;
  });
};



  const resetFilters = () => setFilters({});

  

  return <FilterContext.Provider value={{ filters, setFilter, resetFilters  }}>{children}</FilterContext.Provider>;
};

export const useFilterContext = () => useContext(FilterContext);
