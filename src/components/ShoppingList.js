

import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items ,setItems}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  // Combine both filters (category and search) in a single operation
  const itemsToDisplay = items.filter((item) => {
    // First apply category filter
    const categoryMatch = 
      selectedCategory === "All" || 
      item.category === selectedCategory;
    
    // Then apply search filter if there's a search term
    const searchMatch = 
      searchTerm.trim() === "" || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  });
  
   const handleItemFormSubmit = (newItem) => {
      setItems([...items, newItem]);}
   

  return (
    <div className="ShoppingList">
       <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter 
        onCategoryChange={handleCategoryChange} 
        onSearchChange={handleSearchChange}
        search={searchTerm}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;