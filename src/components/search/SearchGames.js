import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Icon from '../icon/Icon';
import './SearchGames.css';

const SearchGames = ({ onGameSelect, showSearchButton }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const dropdownRef = useRef(null);
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
    if (selectedGame != null) {
      navigate(`/videogames/${selectedGame.id}`);
      setSelectedGame(null);
    } else if (query !== "") {
      navigate(`/videogames/search/${query}`);
      setQuery('');
      setSelectedGame(null);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="search-component">
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onClick={() => setIsDropdownVisible(true)}
          placeholder="Search for a game"
          className="search-inpt"
        />
        {showSearchButton && (
          <span className="search-btn" onClick={openGameDetail}>
            <Icon iconName="SearchIcon" />
          </span>
        )}
      </div>
      {isDropdownVisible && suggestions.length > 0 && (
        <ul className={showSearchButton ? "suggestions-list-status" : "suggestions-list"}>
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

