import React, { useState, useEffect } from 'react';

const SearchBar = ({ data, onSelect, onAutocompleteVisibility }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (inputValue.length >= 3) {
      const filtered = data
        .filter(item => item.County.toLowerCase().includes(inputValue.toLowerCase()))
        .slice(0, 3);
      setFilteredData(filtered);
      onAutocompleteVisibility(true);
    } else {
      setFilteredData([]);
      onAutocompleteVisibility(false);
    }
  }, [inputValue, data, onAutocompleteVisibility]);

  const handleSearch = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelect = (item) => {
    onSelect(item);
    setInputValue('');
    setFilteredData([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && filteredData.length > 0) {
      handleSelect(filteredData[0]);
    }
  };

  const renderAutocomplete = () => {
    return (
      <ul className="autocomplete-list">
        {filteredData.map((item, index) => (
          <li key={index} onClick={() => handleSelect(item)}>
            {item.County}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        placeholder="Enter your county..."
      />
      {filteredData.length > 0 && renderAutocomplete()}
    </div>
  );
};

export default SearchBar;