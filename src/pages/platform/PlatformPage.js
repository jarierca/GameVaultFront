// src/components/platform/PlatformPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../components/util/pagination/Pagination';
import Grid from '../../components/util/items/Grid';
import Card from '../../components/util/items/Card';
import { useNavigate } from 'react-router-dom';
import './PlatformPage.css';

const PlatformPage = () => {
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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/platforms`);
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

  const handlePlatformClick = (platformId) => {
    navigate(`/videogames/platform/${platformId}`);
  };

  if (loading) {
    return <div className="platform-container"><h1>Loading...</h1></div>;
  }

  return (
    <div className="container-f">
      <h1>Console Platforms</h1>
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
            type="platform"
            data={{
              name: console.name,
              description: console.description,
              releaseDate: console.releaseDate,
            }}
            onClick={() => handlePlatformClick(console.id)}
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

export default PlatformPage;

