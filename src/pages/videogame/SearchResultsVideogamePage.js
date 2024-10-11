// src/pages/videogame/SearchResultsVideogamePage

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import axios from 'axios';
import Pagination from '../../components/pagination/Pagination';
import Grid from '../../components/items/Grid';
import Card from '../../components/items/Card';
import './VideogamePage.css';

const SearchResultsVideogamePage = () => {
  const { querySearch } = useParams();
  const [videogames, setVideogames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(null);
  const { showMessage } = useAlert(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideogames = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/videogames/search`, {
                params: { title: querySearch },
            });
            setVideogames(response.data);
        } catch (err) {
            setError(err);
            showMessage('Error getting game results with this query search.', -1, 5000);
        } finally {
            setLoading(false);
        }
    };

    fetchVideogames();
  }, [querySearch]); 

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
    return <div className="container-f"><h1>Loading...</h1></div>;
  }

  return (
    <div className="container-f">
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

export default SearchResultsVideogamePage;

