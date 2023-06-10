import React from 'react';
import './Searchbar.scss';

export default function Searchbar({searchText, setSearchText}) {
  

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };


  return (
    <div className="searchbar-container">
      <input
        className="search-input"
        type="text"
        placeholder="Ürün adını giriniz..."
        value={searchText}
        onChange={handleInputChange}
      />
    </div>
  );
}
