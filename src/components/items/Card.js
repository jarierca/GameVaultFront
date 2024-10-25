// src/components/util/items/Card.js

import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ type, data, onClick }) => {
  const images = Array.isArray(data.images) ? data.images : [];
  const banner = images.find(img => img.imageType === 'BANNER');
  const cover = images.find(img => img.imageType === 'COVER');

  return (
    <div className="card" onClick={onClick}>
      <div className="card-banner-container">
        {banner ? (
          <div className="card-banner" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/images/p/${banner.name})` }}>
            {cover ? (<img className="card-cover" src={`${process.env.REACT_APP_API_URL}/images/p/${cover.name}`} alt={cover.altName} />) 
              : ( <div className="card-cover-placeholder"></div> )}
          </div>
        ) : (
          <div className="card-banner-placeholder">
            {cover ? (<img className="card-cover" src={`${process.env.REACT_APP_API_URL}/images/p/${cover.name}`} alt={cover.altName} />) 
              : ( <div className="card-cover-placeholder"></div> )}
          </div>
        )}
      </div>
      {type === 'videogame' && (
        <>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <small>{data.releaseDate? data.releaseDate.split('T')[0] : ""}</small>
        </>
      )}
      {type === 'collection-videogame' && (
        <>
          {banner && <div className="card-banner" style={{ backgroundImage: `url(${banner.url})` }}></div>}
          {cover && <img className="card-cover" src={cover.url} alt={cover.altName} />}
          <h3>{data.name} ({data.platformName})</h3>
          <p>{data.description}</p>
          <small>{data.releaseDate ? data.releaseDate.split('T')[0] : ""}</small>
        </>
      )}
      {type === 'platform' && (
        <>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <small>{data.releaseDate ? data.releaseDate.split('T')[0] : ""}</small>
        </>
      )}
      {type === 'developer' && (
        <>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <small>{data.foundedDate ? data.foundedDate.split('T')[0] : ""}</small>
        </>
      )}
      {type === 'publisher' && (
        <>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <small>{data.foundedDate ? data.foundedDate.split('T')[0] : ""}</small>
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
    images: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      altName: PropTypes.string.isRequired,
      imageType: PropTypes.string.isRequired,
    })),
    foundedDate: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;

