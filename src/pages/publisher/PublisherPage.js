// src/components/publisher/PublisherPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../components/pagination/Pagination';
import Grid from '../../components/items/Grid';
import Card from '../../components/items/Card';
import Loading from '../../components/loading/Loading';
import { useNavigate, useLocation } from 'react-router-dom';

const PublisherPage = () => {
  const [publishers, setPublishers] = useState([]);
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
    const fetchPublishers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/publishers`, {
          params: {
            page: currentPage - 1,
            size: itemsPerPage
          }
        });
        setPublishers(response.data.content);
        setTotalItems(response.data.totalElements);
      } catch (error) {
        console.error('Error fetching publishers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishers();
  }, [currentPage, itemsPerPage]);

  const filteredPublishers = Array.isArray(publishers) && publishers !== null
    ? publishers.filter((publisher) =>
      publisher && typeof publisher === 'object' && 'name' in publisher &&
      publisher.name.toLowerCase().includes(filter.toLowerCase())
    ) : [];

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  const handlePublisherClick = (publisherId, publisherName) => {
    navigate(`/videogames/publisher/${publisherId}-${publisherName}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-f">
      <h1>Publishers</h1>
      <input
        type="text"
        placeholder="Search by publisher name..."
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
        {filteredPublishers.map((publisher) => (
          <Card
            key={publisher.id}
            type="publisher"
            data={{
              name: publisher.name,
              description: publisher.description,
              releaseDate: publisher.releaseDate,
            }}
            onClick={() => handlePublisherClick(publisher.id, publisher.name)}
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

export default PublisherPage;

