import React, { useState } from 'react';
import axios from 'axios';
import './SearchGames.css';

const SearchGames = ({ onGameSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) { // Minimum 2 characters to start searching
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/videogames/search`, {
          params: { title: value },
        });
        setSuggestions(response.data);
        setIsDropdownVisible(true);
      } catch (error) {
        console.error('Error fetching video game suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setIsDropdownVisible(false);
    }
  };

  const handleSelect = (game) => {
    setQuery(game.title);
    setSuggestions([]);
    setIsDropdownVisible(false);
    onGameSelect(game);
  };

  return (
    <div className="search-component">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a game"
      />
      {isDropdownVisible && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((game) => (
            <li key={game.id} onClick={() => handleSelect(game)}>
              {game.title}{game.platform?.code ? ` (${game.platform.code})` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchGames;

