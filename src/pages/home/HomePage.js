// src/pages/home/HomePage.js

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/loading/Loading';
import Icon from '../../components/icon/Icon';
import './HomePage.css';

const HomePage = () => {
  const [stats, setStats] = useState({
    totalVideogames: 0,
    totalDevelopers: 0,
    totalGenres: 0,
    totalPublishers: 0,
    totalPlatforms: 0,
  });

  const [loading, setLoading] = useState(true);
  const [randomGames, setRandomGames] = useState([]);
  const [topPlatforms, setTopPlatforms] = useState([]);
  const [topDevelopers, setTopDevelopers] = useState([]);
  const [topPublishers, setTopPublishers] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const navigate = useNavigate();
  const gameListRef = useRef();

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await fetchStats();
      await fetchRandomGames();
      await fetchTopPlatforms();
      await fetchTopDevelopers();
      await fetchTopPublishers();
      await fetchTopGenres();
      setLoading(false);
    };

    fetchAllData();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stats`);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching statistics", error);
    }
  };

  const fetchRandomGames = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/random?limit=10`);
      setRandomGames(response.data);
    } catch (error) {
      console.error("Error fetching random games", error);
    }
  };

  const fetchTopPlatforms = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/platforms/top?limit=5`);
      setTopPlatforms(response.data);
    } catch (error) {
      console.error("Error fetching top platforms", error);
    }
  };

  const fetchTopDevelopers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/developers/top?limit=5`);
      setTopDevelopers(response.data);
    } catch (error) {
      console.error("Error fetching top developers", error);
    }
  };

  const fetchTopPublishers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/publishers/top?limit=5`);
      setTopPublishers(response.data);
    } catch (error) {
      console.error("Error fetching top publishers", error);
    }
  };

  const fetchTopGenres = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/genres/top?limit=5`);
      setTopGenres(response.data);
    } catch (error) {
      console.error("Error fetching top genres", error);
    }
  };

  const handleVideogameClick = (gameId, gameName) => {
    navigate(`/videogames/${gameId}-${gameName}`);
  };

  const handlePlatformClick = (platformId, platformName) => {
    navigate(`/videogames/platform/${platformId}-${platformName}`);
  };
  
  const handleDeveloperClick = (developerId, developerName) => {
    navigate(`/videogames/developer/${developerId}-${developerName}`);
  };

  const handlePublisherClick = (publisherId, publisherName) => {
    navigate(`/videogames/publisher/${publisherId}-${publisherName}`);
  };

  const handleGenreClick = (genreId, genreName) => {
    navigate(`/videogames/genre/${genreId}-${genreName}`);
  };

  const scrollLeft = () => {
    if (gameListRef.current) {
      gameListRef.current.scrollBy({
        left: -250,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (gameListRef.current) {
      gameListRef.current.scrollBy({
        left: 250,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h1>Welcome to GameVault</h1>
      <div>
        <h2>Video Game Statistics</h2>
        <div className="stats">
          <div className="stat-item" key="videogames">
            <h3>Total Videogames</h3>
            <p>{stats.totalVideogames}</p>
          </div>
          <div className="stat-item" key="platforms">
            <h3>Total Platforms</h3>
            <p>{stats.totalPlatforms}</p>
          </div>
          <div className="stat-item" key="developers">
            <h3>Total Developers</h3>
            <p>{stats.totalDevelopers}</p>
          </div>
          <div className="stat-item" key="publishers">
            <h3>Total Publishers</h3>
            <p>{stats.totalPublishers}</p>
          </div>
          <div className="stat-item" key="genres">
            <h3>Total Genres</h3>
            <p>{stats.totalGenres}</p>
          </div>
        </div>
      </div>

      <div className="dynamic-sections">
        <div className="random-games-section">
          <h2>Random Games</h2>
          <div className="game-list" ref={gameListRef}>
            {randomGames.map((game) => (
              <div key={game.id} className="game-item" onClick={() => handleVideogameClick(game.id, game.title)}>
                <h3>{game.title}</h3>
                <p>Release Date: {new Date(game.releaseDate).toLocaleDateString()}</p>
              </div>
            ))}
            <div className="scroll-buttons">
              <button className="scroll-button left-button" onClick={scrollLeft}><Icon iconName="LeftArrowIcon" /></button>
              <button className="scroll-button right-button" onClick={scrollRight}><Icon iconName="RightArrowIcon" /></button>
            </div>
          </div>
        </div>


        <section className="top-stats-section">
          <h2>Top 5 Platforms</h2>
          <div className="stats-list">
            {topPlatforms.length > 0 ? (
              topPlatforms.map((platform) => (
                <div key={platform[0]} className="stats-item" onClick={() => handlePlatformClick(platform[0],platform[1])}>
                  <h3>{platform[1]}</h3>
                  <p>{platform[2]}</p>
                </div>
              ))
            ) : (
              <p>No platforms available</p>
            )}
          </div>
        </section>

        <section className="top-stats-section">
          <h2>Top 5 Developers</h2>
          <div className="stats-list">
            {topDevelopers.length > 0 ? (
              topDevelopers.map((developer) => (
                <div key={developer[0]} className="stats-item" onClick={() => handleDeveloperClick(developer[0],developer[1])}>
                  <h3>{developer[1]}</h3>
                  <p>{developer[2]}</p>
                </div>
              ))
            ) : (
              <p>No developers available</p>
            )}
          </div>
        </section>

        <section className="top-stats-section">
          <h2>Top 5 Publishers</h2>
          <div className="stats-list">
            {topPublishers.length > 0 ? (
              topPublishers.map((publisher) => (
                <div key={publisher[0]} className="stats-item" onClick={() => handlePublisherClick(publisher[0],publisher[1])}>
                  <h3>{publisher[1]}</h3>
                  <p>{publisher[2]}</p>
                </div>
              ))
            ) : (
              <p>No publishers available</p>
            )}
          </div>
        </section>

        <section className="top-stats-section">
          <h2>Top 5 Genres</h2>
          <div className="stats-list">
            {topGenres.length > 0 ? (
              topGenres.map((genre) => (
                <div key={genre[0]} className="stats-item" onClick={() => handleGenreClick(genre[0],genre[1])}>
                  <h3>{genre[1]}</h3>
                  <p>{genre[2]}</p>
                </div>
              ))
            ) : (
              <p>No genres available</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;



