
"use client"
import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilter = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [activeFilter, setActiveFilter] = useState("car");

  return (
    <FilterContext.Provider value={{ activeFilter, setActiveFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
