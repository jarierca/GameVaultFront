// src/components/videogame/VideogamePage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Pagination from '../../components/util/pagination/Pagination';
import Grid from '../../components/util/items/Grid';
import Card from '../../components/util/items/Card';
import './VideogamePage.css';

const VideogamePage = () => {
  const { platformId } = useParams();
  const [videogames, setVideogames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideogames = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/videogames/platform/${platformId}`);
        setVideogames(response.data);
      } catch (error) {
        console.error('Error fetching videogames:', error);
      }
      setLoading(false);
    };

    fetchVideogames();
  }, [platformId]);

  const filteredVideogames = videogames.filter((videogame) =>
    videogame.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleVideogameClick = (id) => {
    navigate(`/videogames/${id}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVideogames = filteredVideogames.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="platform-container"><h1>Loading...</h1></div>;
  }

  return (
    <div className="videogame-container">
      <h1>Videogames</h1>
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
            onClick={() => handleVideogameClick(videogame.id)}
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

