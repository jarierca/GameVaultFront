// src/components/util/Card.js

import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ type, data, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      {type === 'videogame' && (
        <>
          <div className="card-image" style={{ backgroundImage: `url(${data.image})` }}></div>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <small>Release Date: {data.releaseDate}</small>
        </>
      )}
      {type === 'collection-videogame' && (
        <>
          <div className="card-image" style={{ backgroundImage: `url(${data.image})` }}></div>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <small>Release Date: {data.releaseDate}</small>
        </>
      )}
      {type === 'platform' && (
        <>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <small>Release Date: {data.releaseDate}</small>
        </>
      )}
      {type === 'developer' && (
        <>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <small>Founded Date: {data.foundedDate}</small>
        </>
      )}
      {type === 'publisher' && (
        <>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <small>Founded Date: {data.foundedDate}</small>
        </>
      )}
      {type === 'genre' && (
        <>
          <h3>{data.name}</h3>
        </>
      )}
    </div>
  );
};

Card.propTypes = {
  type: PropTypes.oneOf(['videogame', 'collection-videogame', 'platform', 'publisher', 'developer', 'genre']).isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    releaseDate: PropTypes.string,
    image: PropTypes.string,
    foundedDate: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;

