// src/pages/videogame/VideogameDetailPage

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
            }
            setLoading(false);
        };

        fetchVideogame();
    }, [gameId]);

    if (loading) {
        return <div className="platform-container"><h1>Loading...</h1></div>;
    }

    if (!videogame) {
        return <div className="platform-container"><h1>Videogame not found</h1></div>;
    }

    return (
        <div className="videogame-detail-container">
            <img src={videogame.image} alt={videogame.title} className="videogame-image" />
            <h1 className="videogame-title">{videogame.title}</h1>
            <div className="videogame-description-container">
                <div className="videogame-description">
                    <h3>Alternative Names</h3>
                    <p>{videogame.alternativeNames}</p>
                    <h3>Description</h3>
                    <p>{videogame.overview}</p>
                </div>

                <div className="additional-info">
                    <div className="detail-box">
                        <h4>Release Date</h4>
                        <p>{new Date(videogame.releaseDate).toLocaleDateString()}</p>
                    </div>
                    <div className="detail-box">
                        <h4>Platform</h4>
                        <p>{videogame.platform.name}</p>
                    </div>
                    <div className="detail-box">
                        <h4>Game Type</h4>
                        <p>{videogame.gameType}</p>
                    </div>
                    <div className="detail-box">
                        <h4>Max Players</h4>
                        <p>{videogame.maxPlayers}</p>
                    </div>
                    <div className="detail-box">
                        <h4>Genre</h4>
                        <p>{videogame.genre.name}</p>
                    </div>
                    <div className="detail-box">
                        <h4>Developer</h4>
                        <p>{videogame.developer.name}</p>
                    </div>
                    <div className="detail-box">
                        <h4>Publisher</h4>
                        <p>{videogame.publisher.name}</p>
                    </div>
                </div>
            </div>

            <div className="links-info">
                <div className="link-box">
                    <h4>Alternative URL</h4>
                    <a href={videogame.urlAlt} target="_blank" rel="noopener noreferrer">{videogame.urlAlt}</a>
                </div>
                <div className="link-box">
                    <h4>Video</h4>
                    <a href={videogame.video} target="_blank" rel="noopener noreferrer">Watch Video</a>
                </div>
            </div>
        </div>
    );
};

export default VideogameDetailPage;

