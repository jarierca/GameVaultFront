// src/components/genre/GenrePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../components/pagination/Pagination';
import Grid from '../../components/items/Grid';
import Card from '../../components/items/Card';
import Loading from '../../components/loading/Loading'
import { useNavigate } from 'react-router-dom';

const GenrePage = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsoles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/genres`);
        setGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
      setLoading(false);
    };

    fetchConsoles();
  }, []);

  const filteredConsoles = genres.filter((genre) =>
    genre.name.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentConsoles = filteredConsoles.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleGenreClick = (genreId) => {
    navigate(`/videogames/genre/${genreId}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-f">
      <h1>Console Genres</h1>
      <input
        type="text"
        placeholder="Search by genre name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="search-input"
      />

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredConsoles.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      <Grid>
        {currentConsoles.map((genre) => (
          <Card
            key={genre.id}
            type="genre"
            data={{
              name: genre.name,
            }}
            onClick={() => handleGenreClick(genre.id)}
          />
        ))}
      </Grid>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredConsoles.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default GenrePage;

