// src/components/util/items/Card.js

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ type, data, linkTo, onClick }) => {
  const images = Array.isArray(data.images) ? data.images : [];
  const banner = images.find(img => img.imageType === 'BANNER');
  const cover = images.find(img => img.imageType === 'COVER');

  const CardContainer = linkTo ? Link : 'div';
  const cardProps = linkTo ? { to: linkTo } : { onClick };

  return (
    <CardContainer {...cardProps} className={type === 'random-game' ? "game-item" : "card" }>
      <div className="card-banner-container">
        {banner ? (
          <div className="card-banner" style={{ background: `linear-gradient(rgba(3, 18, 22, 0.5), rgba(3, 18, 22, 0.7)),url(${process.env.REACT_APP_API_URL}/images/p/${encodeURIComponent(banner?.url)})`,backgroundSize: 'cover', backgroundPosition: 'center', }}>
            {cover ? (<img className="card-cover" src={`${process.env.REACT_APP_API_URL}/images/p/${encodeURIComponent(cover?.url || "no-image.jpeg")}`} alt={cover?.altName} />) 
              : ( <></> )}
          </div>
        ) : (
          <div className="card-banner" style={{ background: `linear-gradient(rgba(3, 18, 22, 0.5), rgba(3, 18, 22, 0.7)),url(${process.env.REACT_APP_API_URL}/images/p/${encodeURIComponent(cover?.url || "no-image.jpeg")})`,backgroundSize: 'cover', backgroundPosition: 'center', }}>
            {cover ? (<img className="card-cover" src={`${process.env.REACT_APP_API_URL}/images/p/${encodeURIComponent(cover?.url || "no-image.jpeg")}`} alt={cover?.altName} />) 
              : ( <></> )}
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
      {type === 'random-game' && (
        <>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <small>{data.releaseDate? data.releaseDate.split('T')[0] : ""}</small>
        </>
      )}
      {type === 'collection-videogame' && (
        <>
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
    </CardContainer>
  );
};

Card.propTypes = {
  type: PropTypes.oneOf(['videogame', 'random-game', 'collection-videogame', 'platform', 'publisher', 'developer', 'genre']).isRequired,
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
};

export default Card;

