// src/components/developer/DeveloperPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../components/pagination/Pagination';
import Grid from '../../components/items/Grid';
import Card from '../../components/items/Card';
import Loading from '../../components/loading/Loading';
import { useNavigate, useLocation } from 'react-router-dom';

const DeveloperPage = () => {
  const [developers, setDevelopers] = useState([]);
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
    const fetchDevelopers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/developers`, {
          params: {
            page: currentPage - 1,
            size: itemsPerPage
          }
        });
        setDevelopers(response.data.content);
        setTotalItems(response.data.totalElements);
      } catch (error) {
        console.error('Error fetching developers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, [currentPage, itemsPerPage]);

  const filteredDevelopers = Array.isArray(developers) && developers !== null
    ? developers.filter((developer) =>
      developer && typeof developer === 'object' && 'name' in developer &&
      developer.name.toLowerCase().includes(filter.toLowerCase())
    ) : [];

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  const handleDeveloperClick = (developerId, developerName) => {
    navigate(`/videogames/developer/${developerId}-${developerName}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-f">
      <h1>Developers</h1>
      <input
        type="text"
        placeholder="Search by developer name..."
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
        {filteredDevelopers.map((developer) => (
          <Card
            key={developer.id}
            type="developer"
            data={{
              name: developer.name,
              description: developer.description,
              releaseDate: developer.releaseDate,
            }}
            onClick={() => handleDeveloperClick(developer.id, developer.name)}
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

export default DeveloperPage;

