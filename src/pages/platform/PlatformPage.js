// src/components/platform/PlatformPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../components/pagination/Pagination';
import Grid from '../../components/items/Grid';
import Card from '../../components/items/Card';
import Loading from '../../components/loading/Loading';
import { useNavigate, useLocation } from 'react-router-dom';
import './PlatformPage.css';

const PlatformPage = () => {
  const [consoles, setConsoles] = useState([]);
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
    const fetchConsoles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/platforms`, {
          params: {
            page: currentPage - 1,
            size: itemsPerPage
          }
        });
        setConsoles(response.data.content);
        setTotalItems(response.data.totalElements);
      } catch (error) {
        console.error('Error fetching consoles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsoles();
  }, [currentPage, itemsPerPage]);

  const filteredConsoles = Array.isArray(consoles) && consoles !== null
    ? consoles.filter((console) =>
      console && typeof console === 'object' && 'name' in console &&
      console.name.toLowerCase().includes(filter.toLowerCase())
    ) : [];

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  const handlePlatformClick = (platformId, platformName) => {
    navigate(`/videogames/platform/${platformId}-${platformName}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-f">
      <h1>Platforms</h1>
      <input
        type="text"
        placeholder="Search by console name..."
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
        {filteredConsoles.map((platform) => (
          <Card
            key={platform.id}
            type="platform"
            data={{
              name: platform.name,
              description: platform.description,
              releaseDate: platform.releaseDate,
            }}
            onClick={() => handlePlatformClick(platform.id, platform.name)}
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

export default PlatformPage;

