// src/pages/videogame/VideogamePage

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';
import Grid from '../../components/items/Grid';
import Card from '../../components/items/Card';
import './VideogamePage.css';

const VideogamePage = () => {
  const { platform, developer, publisher, genre } = useParams();
  const [videogames, setVideogames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [filter, setFilter] = useState('');
  const [titlePage, setTitlePage] = useState('Videogames');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideogames = async () => {
      setLoading(true);
      try {

        let url = `${process.env.REACT_APP_API_URL}/videogames`;
        if (platform) {
          const platformId = platform.split('-')[0];
          url += `/platform/${platformId}`;

        } else if (developer) {
          const developerId = developer.split('-')[0];
          url += `/developer/${developerId}`;

        } else if (publisher) {
          const publisherId = publisher.split('-')[0];
          url += `/publisher/${publisherId}`;

        } else if (genre) {
          const genreId = genre.split('-')[0];
          url += `/genre/${genreId}`;

        }

        const response = await axios.get(url);
        setVideogames(response.data);
      } catch (error) {
        console.error('Error fetching videogames:', error);
      }
      setLoading(false);
    };

    fetchVideogames();
  }, [platform, developer, publisher, genre]);

  const filteredVideogames = videogames.filter((videogame) =>
    videogame.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleVideogameClick = (gameId, gameName) => {
    navigate(`/videogames/${gameId}-${gameName}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVideogames = filteredVideogames.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="platform-container"><h1>Loading...</h1></div>;
  }

  return (
    <div className="container">
      <h1>{titlePage}</h1>
      <input
        type="text"
        placeholder="Search by videogame name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="search-input"
      />

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredVideogames.length}
        paginate={paginate}
        currentPage={currentPage}
        color="black"
      />

      <Grid>
        {currentVideogames.map((videogame) => (
          <Card
            key={videogame.id}
            type="videogame"
            data={{
              name: videogame.title,
              description: videogame.description,
              releaseDate: videogame.releaseDate,
              image: videogame.image,
            }}
            onClick={() => handleVideogameClick(videogame.id, videogame.title)}
          />
        ))}
      </Grid>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredVideogames.length}
        paginate={paginate}
        currentPage={currentPage}
        color="black"
      />
    </div>
  );
};

export default VideogamePage;

