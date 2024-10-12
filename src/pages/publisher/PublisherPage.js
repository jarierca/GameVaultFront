// src/components/publisher/PublisherPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../components/pagination/Pagination';
import Grid from '../../components/items/Grid';
import Card from '../../components/items/Card';
import Loading from '../../components/loading/Loading'
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

  const handlePublisherClick = (publisherId, publisherName) => {
    navigate(`/videogames/publisher/${publisherId}-${publisherName}`);
  };

  if (loading) {
    return <Loading />;
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
        {currentConsoles.map((publisher) => (
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
        totalItems={filteredConsoles.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default PublisherPage;

