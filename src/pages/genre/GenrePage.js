// src/components/genre/GenrePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../components/pagination/Pagination';
import Grid from '../../components/items/Grid';
import Card from '../../components/items/Card';
import Loading from '../../components/loading/Loading';
import { useNavigate, useLocation } from 'react-router-dom';

const GenrePage = () => {
  const [genres, setGenres] = useState([]);
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
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/genres`, {
          params: {
            page: currentPage - 1,
            size: itemsPerPage
          }
        });
        setGenres(response.data.content);
        setTotalItems(response.data.totalElements);
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [currentPage, itemsPerPage]);

  const filteredGenres = Array.isArray(genres) && genres !== null
    ? genres.filter((genre) =>
      genre && typeof genre === 'object' && 'name' in genre &&
      genre.name.toLowerCase().includes(filter.toLowerCase())
    ) : [];

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  const handleGenreClick = (genreId, genreName) => {
    navigate(`/videogames/genre/${genreId}-${genreName}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-f">
      <h1>Genres</h1>
      <input
        type="text"
        placeholder="Search by genre name..."
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
        {filteredGenres.map((genre) => (
          <Card
            key={genre.id}
            type="genre"
            data={{
              name: genre.name,
            }}
            onClick={() => handleGenreClick(genre.id, genre.name)}
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
  );
};

export default GenrePage;

