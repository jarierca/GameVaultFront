// src/components/publisher/PublisherPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../components/util/pagination/Pagination';
import Grid from '../../components/util/items/Grid';
import Card from '../../components/util/items/Card';
import { useNavigate } from 'react-router-dom';

const PublisherPage = () => {
  const [consoles, setConsoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsoles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/publishers`);
        setConsoles(response.data);
      } catch (error) {
        console.error('Error fetching consoles:', error);
      }
      setLoading(false);
    };

    fetchConsoles();
  }, []);

  const filteredConsoles = consoles.filter((console) =>
    console.name.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentConsoles = filteredConsoles.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePublisherClick = (publisherId) => {
    navigate(`/videogames/publisher/${publisherId}`);
  };

  if (loading) {
    return <div className="publisher-container"><h1>Loading...</h1></div>;
  }

  return (
    <div className="container-f">
      <h1>Console Publishers</h1>
      <input
        type="text"
        placeholder="Search by console name..."
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
        {currentConsoles.map((console) => (
          <Card
            key={console.id}
            type="publisher"
            data={{
              name: console.name,
              description: console.description,
              releaseDate: console.releaseDate,
            }}
            onClick={() => handlePublisherClick(console.id)}
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

export default PublisherPage;

