// src/pages/videogame/VideogameDetailPage

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/loading/Loading';
import { useParams } from 'react-router-dom';
import Icon from '../../components/icon/Icon';
import './VideogameDetailPage.css';

const VideogameDetailPage = () => {
  const { gameId } = useParams();
  const [videogame, setVideogame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideogame = async () => {
      setLoading(true);
      try {
        const videgameId = gameId.split('-')[0];
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/videogames/${videgameId}`);
        setVideogame(response.data);
      } catch (error) {
        console.error('Error fetching videogame:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideogame();
  }, [gameId]);

  if (loading) return <Loading />;

  if (!videogame) {
    return (
      <div className="platform-container">
        <h1>Videogame not found</h1>
      </div>
    );
  }

  const bannerImage = videogame.images.find(image => image.imageType === 'BANNER');
  const coverImage = videogame.images.find(image => image.imageType === 'COVER');

  return (
    <div className="videogame-detail-container">
      {bannerImage && (
        <div className="banner-image" style={{ background: `linear-gradient(to bottom, rgba(3, 18, 22, 0.5), rgba(3, 18, 22, 0.7)), url(${process.env.REACT_APP_API_URL}/images/p/${encodeURIComponent(bannerImage.url)})`, }}>
          <h1 className="banner-title">{videogame.title}</h1>
        </div>
      )}


      <div className="videogame-description-container">
        {coverImage && (
          <span>
            <img
              src={`${process.env.REACT_APP_API_URL}/images/p/${encodeURIComponent(coverImage.url)}`}
              alt={coverImage.altName}
              className="cover-image"
            />
            <div className="links-info">
              <div className="link-box">
                <a href={videogame.urlAlt} target="_blank" rel="noopener noreferrer">
                  More Info
                </a>
              </div>
              <div className="link-box">
                <a href={videogame.video} target="_blank" rel="noopener noreferrer">
                  Watch Video
                </a>
              </div>
            </div>
          </span>
        )}
        
        <div className="videogame-description">
          <h3>Description</h3>
          <p>{videogame.overview}</p>
          <h3>Alternative Names</h3>
          <p>{videogame.alternativeNames}</p>

          <div className="additional-info">
            <div className="info-grid">
              <div className="detail-box-hidden">
                <h4><Icon iconName="CalendarIcon"/> Release Date</h4>
                <p>{new Date(videogame.releaseDate).toLocaleDateString()}</p>
              </div>
              <div className="detail-box-hidden">
                <h4><Icon iconName="GameControllerIcon"/> Game Type</h4>
                <p>{videogame.gameType}</p>
              </div>
              <div className="detail-box-hidden">
                <h4><Icon iconName="AccountDetailIcon"/> Max Players</h4>
                <p>{videogame.maxPlayers}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="additional-info-container">
          <div className="info-grid">
            <div className="detail-box">
              <h4>Platform</h4>
              <p>{videogame.platformName}</p>
            </div>
            <div className="detail-box">
              <h4>Genre</h4>
              <p>{videogame.genreNames}</p>
            </div>
            <div className="detail-box">
              <h4>Developer</h4>
              <p>{videogame.developerName}</p>
            </div>
            <div className="detail-box">
              <h4>Publisher</h4>
              <p>{videogame.publisherName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideogameDetailPage;

