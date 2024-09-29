import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchGames.css';

const SearchGames = ({ onGameSelect, showSearchButton }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate();

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
    setSelectedGame(game);
  };

  const openGameDetail = async () => {
    setIsDropdownVisible(false);
    if (selectedGame != null){
      navigate(`/videogames/${selectedGame.id}`);
      setSelectedGame(null);
 
   } else if (query != "") {
      navigate(`/videogames/search/${query}`);
      setQuery('');
      setSelectedGame(null);
    }
  };

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a game"
        className="search-inpt"
      />
      {showSearchButton &&
        <span className="search-btn" onClick={openGameDetail}>
          <svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em">
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
          </svg>
        </span>
      }
      {isDropdownVisible && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((game) => (
            <li key={game.id} onClick={() => handleSelect(game)}>
              {game.title}{game.platform?.code ? ` (${game.platform.code})` : ''}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchGames;

