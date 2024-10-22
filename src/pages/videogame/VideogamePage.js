// src/pages/videogame/VideogamePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';
import Loading from '../../components/loading/Loading';
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
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page')) || 1;
    setCurrentPage(page);
  }, [location.search]);

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

        url += `?page=${currentPage - 1}&size=${itemsPerPage}`;

        const response = await axios.get(url);
        setVideogames(response.data.content);
        setTotalItems(response.data.totalElements);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videogames:', error);
        setLoading(false);
      }
    };

    fetchVideogames();
  }, [platform, developer, publisher, genre, currentPage]);

  const filteredVideogames = Array.isArray(videogames) && videogames !== null
    ? videogames.filter((videogame) =>
      videogame && typeof videogame === 'object' && 'title' in videogame &&
      videogame.title.toLowerCase().includes(filter.toLowerCase())
    ) : [];

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleVideogameClick = (gameId, gameName) => {
    navigate(`/videogames/${gameId}-${gameName}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
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
            totalItems={totalItems}
            paginate={handlePageChange}
            currentPage={currentPage}
          />

          <Grid>
            {filteredVideogames.map((videogame) => (
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
            totalItems={totalItems}
            paginate={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
};

export default VideogamePage;

