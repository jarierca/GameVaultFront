import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SearchGames from '../../components/search/SearchGames';
import Grid from '../../components/items/Grid';
import Card from '../../components/items/Card';
import Loading from '../../components/loading/Loading';
import MyGameDetails from "./MyGameDetails";
import Icon from '../../components/icon/Icon';
import './MyCollection.css';

const MyCollection = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [editingCollectionId, setEditingCollectionId] = useState(null);
  const [editingCollectionName, setEditingCollectionName] = useState('');
  const [editingCollectionDescription, setEditingCollectionDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGameDialogOpen, setIsGameDialogOpen] = useState(false);
  const [selectedGameToAdd, setSelectedGameToAdd] = useState(null);
  const [gamesInCollection, setGamesInCollection] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [showGame, setShowGame] = useState(false);
  const [filter, setFilter] = useState('');
  const [sortOrderBy, setSortOrderBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isGridView, setIsGridView] = useState(() => {
    const savedView = localStorage.getItem('isGridView');
    return savedView !== null ? JSON.parse(savedView) : true;
  });
  const [platforms, setPlatforms] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { collectionName, gameInfo } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    localStorage.setItem('isGridView', JSON.stringify(isGridView));
  }, [isGridView]);

  useEffect(() => {
    fetchCollections();
  }, []);

  useEffect(() => {
    if (collectionName) {
      const collection = collections.find(c => c.name === collectionName);
      if (collection) {
         toggleCollection(collection);
      }
    }
  }, [collectionName, collections]);

  useEffect(() => {
    if (gameInfo && collectionName) {
     const gameId = gameInfo.split('-')[0];
     const game = gamesInCollection.find(game => game.id === parseInt(gameId));
     if (game) {
      setSelectedGameId(game.id);
      setShowGame(true);
     }
    }
  }, [gameInfo, collectionName, gamesInCollection]);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/my-collections`);
      setCollections(response.data);
    } catch (error) {
      console.error('Error fetching my collections:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isDialogOpen || isGameDialogOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isDialogOpen, isGameDialogOpen]);

  const toggleCollection = async (collection) => {
    handleCloseGameDetails();
    setSelectedCollections([collection]);
    
    if (!collectionName != collection && !gameInfo){
      navigate(`/my-collection/${collection.name}`);
    }

    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/collection-videogames/${collection.id}/videogames`);
      setGamesInCollection(response.data);

      const uniquePlatforms = [...new Set(response.data.map(game => game.videogame.platform.name))];
      const uniqueDevelopers = [...new Set(response.data.map(game => game.videogame.developer.name))];
      const uniquePublishers = [...new Set(response.data.map(game => game.videogame.publisher.name))];
      const uniqueGenres = [...new Set(response.data.map(game => game.videogame.genre.name))];
      
      setPlatforms(uniquePlatforms);
      setDevelopers(uniqueDevelopers);
      setPublishers(uniquePublishers);
      setGenres(uniqueGenres);

    } catch (error) {
      console.error('Error fetching games for collection:', error);
    }
    setLoading(false);
  };

  const handleAddCollection = async () => {
    if (!newCollectionName) return;
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/my-collections`, {
        name: newCollectionName,
        description: newCollectionDescription,
      });
      setCollections([...collections, response.data]);
      setNewCollectionName('');
      setNewCollectionDescription('');
      setIsDialogOpen(false);
      fetchCollections();
    } catch (error) {
      console.error('Error adding new collection:', error);
    }
  };

  const handleEditCollection = async () => {
    if (!editingCollectionName || !editingCollectionId) return;
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/my-collections/${editingCollectionId}`, {
        name: editingCollectionName,
        description: editingCollectionDescription,
      });

      setCollections(collections.map(collection =>
        collection.id === editingCollectionId ? response.data : collection
      ));

      setSelectedCollections(selectedCollections.map(collection =>
        collection.id === editingCollectionId ? response.data : collection
      ));
      
      setEditingCollectionId(null);
      setEditingCollectionName('');
      setEditingCollectionDescription('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error editing collection:', error);
    }
  };

  const handleGameClick = (game) => {
    setSelectedGameId(game.id);
    setShowGame(true);
    const collection = selectedCollections[0];
    navigate(`/my-collection/${collection.name}/${game.id}-${game.videogame.title.replace(/\s+/g, '-')}`);
  };

  const handleCloseGameDetails = () => {
    setSelectedGameId(null);
    setShowGame(false);

    if(collectionName) {
      navigate(`/my-collection/${collectionName}`);
    }
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setNewCollectionName('');
    setNewCollectionDescription('');
    setEditingCollectionId(null);
    setEditingCollectionName('');
    setEditingCollectionDescription('');
  };

  const openGameDialog = () => {
    setIsGameDialogOpen(true);
  };

  const closeAddGameDialog = () => {
    setIsGameDialogOpen(false);
    setSelectedGameToAdd(null);
  };

  const removeCurrentCollection = async () => {
    if (selectedCollections.length === 0) return;
    const collectionToDelete = selectedCollections[0];
    const confirmDelete = window.confirm(`Are you sure you want to delete the collection "${collectionToDelete.name}"?`);
    if (!confirmDelete) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/my-collections/${collectionToDelete.id}`);
      setCollections(collections.filter(collection => collection.id !== collectionToDelete.id));
      setSelectedCollections([]);
      setGamesInCollection([]);
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  const handleAddGameToCollection = async () => {
    if (!selectedGameToAdd || selectedCollections.length === 0) return;
    const collectionId = selectedCollections[0].id;
    const gameId = selectedGameToAdd.id;
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/collection-videogames/${collectionId}/add-game`, { gameId });
      closeAddGameDialog();
      setGamesInCollection(prevGames => [...prevGames, response.data]);
    } catch (error) {
      console.error('Error adding game to collection:', error);
    }
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatforms(prevSelectedPlatforms => {
      if (prevSelectedPlatforms.includes(platform)) {
        return prevSelectedPlatforms.filter(p => p !== platform);
      } else {
        return [...prevSelectedPlatforms, platform];
      }
    });
  };

  const handleDeveloperChange = (developer) => {
    setSelectedDevelopers(prevSelectedDevelopers => {
      if (prevSelectedDevelopers.includes(developer)) {
        return prevSelectedDevelopers.filter(d => d !== developer);
      } else {
        return [...prevSelectedDevelopers, developer];
      }
    });
  };

  const handlePublisherChange = (publisher) => {
    setSelectedPublishers(prevSelectedPublishers => {
      if (prevSelectedPublishers.includes(publisher)) {
        return prevSelectedPublishers.filter(p => p !== publisher);
      } else {
        return [...prevSelectedPublishers, publisher];
      }
    });
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres(prevSelectedGenres => {
      if (prevSelectedGenres.includes(genre)) {
        return prevSelectedGenres.filter(g => g !== genre);
      } else {
        return [...prevSelectedGenres, genre];
      }
    });
  };

  const filteredAndSortedGames = gamesInCollection
    .filter(game => {
      const matchesTitle = game.videogame.title.toLowerCase().includes(filter.toLowerCase());
      const matchesPlatform = selectedPlatforms.length === 0 || selectedPlatforms.includes(game.videogame.platform.name);
      const matchesDeveloper = selectedDevelopers.length === 0 || selectedDevelopers.includes(game.videogame.developer.name);
      const matchesPublisher = selectedPublishers.length === 0 || selectedPublishers.includes(game.videogame.publisher.name);
      const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(game.videogame.genre.name);
      return matchesTitle && matchesPlatform && matchesDeveloper && matchesPublisher && matchesGenre;
    })
    .sort((a, b) => {
      const compareValue = sortOrder === 'asc' 
        ? (a.videogame[sortOrderBy] < b.videogame[sortOrderBy] ? -1 : 1) 
        : (a.videogame[sortOrderBy] > b.videogame[sortOrderBy] ? -1 : 1);

      return compareValue;
    });

  const toggleSortOrder = () => {
    setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleSortByTitle = () => {
    if (sortOrderBy === 'title') {
      setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortOrderBy('title');
      setSortOrder('asc');
    }
  };

  const handleSortByReleaseDate = () => {
    if (sortOrderBy === 'releaseDate') {
      setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortOrderBy('releaseDate');
      setSortOrder('asc');
    }
  };

  const clearFilters = () => {
    setFilter('');
    setSelectedPlatforms([]);
    setSelectedDevelopers([]);
    setSelectedGenres([]);
    setSelectedPublishers([]);
    setSortOrder('asc');
    setSortOrderBy('title');
  };

  return (
    <div className="my-collection-wrapper">
      {(isDialogOpen || isGameDialogOpen) && <div className="overlay" onClick={closeDialog}></div>}
      <div className="my-collection-container">
        <div className="collection-list">
          <h2>
            Collections 
            <button onClick={openDialog} className="add-collection-button" title="Create a new game collection">+</button>
          </h2>
           <ul>
            {loading && collections.length === 0 ? (
              <Loading />
            ) : (
              collections.map(collection => (
                <li
                  key={collection.id}
                  onClick={() => toggleCollection(collection)}
                  className={selectedCollections.includes(collection) ? 'collection-selected' : ''}
                  title={collection.name}
                >
                  {collection.name}
                </li>
              ))
            )}
          </ul>
        </div>

        {isDialogOpen && (
          <div className="dialog">
            <h3>{editingCollectionId ? 'Edit Collection' : 'Add New Collection'}</h3>
            <input
              type="text"
              value={editingCollectionId ? editingCollectionName : newCollectionName}
              onChange={(e) => editingCollectionId ? setEditingCollectionName(e.target.value) : setNewCollectionName(e.target.value)}
              placeholder={editingCollectionId ? 'Enter new collection name' : 'Enter collection name'}
            />

            <input
              type="text"
              value={editingCollectionId ? editingCollectionDescription : newCollectionDescription}
              onChange={(e) => editingCollectionId ? setEditingCollectionDescription(e.target.value) : setNewCollectionDescription(e.target.value)}
              placeholder={editingCollectionId ? 'Enter new collection name' : 'Enter collection name'}
            />
            <div className="dialog-actions">
              <button onClick={editingCollectionId ? handleEditCollection : handleAddCollection}>
                {editingCollectionId ? 'Update Collection' : 'Add Collection'}
              </button>
              <button onClick={closeDialog}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      <div className="right-container">
        <div className="selected-collections">
          {selectedCollections.length > 0 ? (
            selectedCollections.map((collection, index) => (
              <div key={index} className="collection-header">
                <div className="collection-title">
                  <span className="collection-name-year">
                    <h2 title={collection.name}>{collection.name}</h2>
                    <small title="Created at "> 
                      {(() => {
                        const date = new Date(collection.createdDate);
                        return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric',
                            hour: '2-digit', minute: '2-digit', hour12: false
                        });
                      })()}
                    </small>
                  </span>                  
                  {collection.description ? <p title={collection.description}>{collection.description}</p> : <p>&nbsp;</p>}
                </div>
                <div className="collection-actions">
                  <div onClick={openGameDialog} className="btn-generic-action add-game-button" title="Add new videogame"><Icon iconName="PlusIcon" /></div>
                  <div onClick={() => {
                    setEditingCollectionId(selectedCollections[0].id);
                    setEditingCollectionName(selectedCollections[0].name);
                    setEditingCollectionDescription(selectedCollections[0].description || '');
                    setIsDialogOpen(true);
                  }} className="btn-generic-action edit-button" title="Edit current collection details"><Icon iconName="EditIcon" /></div>
                  <div onClick={removeCurrentCollection} className="btn-generic-action remove-button" title="Remove current collection"><Icon iconName="TrashIcon" /></div>
                </div>
              </div>
            ))
          ) : (
            <>
              <h2>No collections selected</h2>
              <p>&nbsp;</p>
            </>
          )}
        </div>

        {selectedCollections.length > 0 && !selectedGameId && gamesInCollection.length > 0 &&
          <div className="filter-section">
            <div className="filter-select">
              <div>
                <div className="dropdown">
                  <button className="dropbtn">
                    Platforms
                    {selectedPlatforms.length > 0 ? (<span className="filter-num-checked">{selectedPlatforms.length}</span>)
                     : (<span className="filter-num-empty">&nbsp;&nbsp;</span>)}
                  </button>
                  <div className="dropdown-content">
                    {platforms.map(platform => (
                      <label key={platform}>
                        <input
                          type="checkbox"
                          value={platform}
                          checked={selectedPlatforms.includes(platform)}
                          onChange={() => handlePlatformChange(platform)}
                        />
                        {platform}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="dropdown">
                  <button className="dropbtn">
                    Developers
                    {selectedDevelopers.length > 0 ? (<span className="filter-num-checked">{selectedDevelopers.length}</span>)
                      : (<span className="filter-num-empty">&nbsp;&nbsp;</span>)}
                  </button>
                  <div className="dropdown-content">
                    {developers.map(developer => (
                      <label key={developer}>
                        <input
                          type="checkbox"
                          value={developer}
                          checked={selectedDevelopers.includes(developer)}
                          onChange={() => handleDeveloperChange(developer)}
                        />
                        {developer}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="dropdown">
                  <button className="dropbtn">
                    Publishers
                    {selectedPublishers.length > 0 ? (<span className="filter-num-checked">{selectedPublishers.length}</span>)
                     : (<span className="filter-num-empty">&nbsp;&nbsp;</span>)}
                  </button>
                  <div className="dropdown-content">
                    {publishers.map(publisher => (
                      <label key={publisher}>
                        <input
                          type="checkbox"
                          value={publisher}
                          checked={selectedPublishers.includes(publisher)}
                          onChange={() => handlePublisherChange(publisher)}
                        />
                        {publisher}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="dropdown">
                  <button className="dropbtn">
                    Genres
                    {selectedGenres.length > 0 ? (<span className="filter-num-checked">{selectedGenres.length}</span>)
                     : (<span className="filter-num-empty">&nbsp;&nbsp;</span>)}
                  </button>
                  <div className="dropdown-content">
                    {genres.map(genre => (
                      <label key={genre}>
                        <input
                          type="checkbox"
                          value={genre}
                          checked={selectedGenres.includes(genre)}
                          onChange={() => handleGenreChange(genre)}
                        />
                        {genre}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

            <input type="text" className="search-input-collection" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search games..." />
              <div className="btn-generic-action" onClick={clearFilters} title="Clear filters">
                <Icon iconName="CloseXIcon"/>
              </div>
              <div className="btn-generic-action" onClick={handleSortByTitle}>
                {sortOrderBy === 'title' ? (sortOrder === 'asc' ? <span title="Sort by game title A to Z"><Icon iconName="AZAscIcon"/></span> : <span title="Sort by game title  Z to A"><Icon iconName="ZADescIcon"/></span>) 
                  : <span title="Sort by game title A to Z"><Icon iconName="AZAscIcon"/></span>} 
              </div>
              <div className="btn-generic-action" onClick={handleSortByReleaseDate}>
                {sortOrderBy === 'releaseDate' 
                  ? (sortOrder === 'asc' ? <span title="Sort by release date desc"><Icon iconName="CalendarDescIcon"/></span> : <span title="Sort by release date asc"><Icon iconName="CalendarAscIcon"/></span>)
                  : <span title="Sort by release date asc"><Icon iconName="CalendarAscIcon"/></span>}
              </div>
              <div className="btn-generic-action" onClick={() => setIsGridView(!isGridView)}>
                  {isGridView ? (
                    <span title="Switch to list view">
                      <Icon iconName="RowViewIcon"/>
                    </span>
                  ) : (
                    <span title="Switch to gallery view">
                      <Icon iconName="GridViewIcon"/>
                    </span>
                  )}
              </div>
            </div>  
          </div>
        }

        {isGridView && !showGame && gamesInCollection.length > 0 ? (
          <Grid>
            {filteredAndSortedGames.map(game => (
              <Card
                key={game.id}
                type="collection-videogame"
                data={{
                  name: game.videogame.title,
                  platformName: game.videogame.platform.name,
                  description: game.videogame.description,
                  releaseDate: game.videogame.releaseDate.split('T')[0],
                  image: game.videogame.image,
                }}
                onClick={() => handleGameClick(game)}
              />
            ))}
          </Grid>
        ) : !isGridView && !showGame && gamesInCollection.length > 0 ? (
          <div className="list-view">
            {filteredAndSortedGames.map(game => (
              <div key={game.id} className="list-item" onClick={() => handleGameClick(game)}>
                <div >
                  <span className="game-title">{game.videogame.title}</span> 
                   -
                  <span className="game-release-date"> {game.videogame.releaseDate.split('T')[0]}</span>
                </div>                
                <span className="game-platform">{game.videogame.platform.name}</span>
              </div>
            ))}
          </div>
        ): gamesInCollection && loading ? (
            <Loading />
        ) : (!showGame && selectedCollections.length > 0 && 
            <span className="container"><h3>No games in this collection</h3></span>
        )}

        {selectedGameId && (
          <div className="game-details">
            <MyGameDetails gameId={selectedGameId} onClose={handleCloseGameDetails} />
          </div>
        )}
      </div>

      {isGameDialogOpen && (
        <div className="dialog">
          <h3>Add Game to Collection</h3>
          <SearchGames onGameSelect={(game) => {
            setSelectedGameToAdd(game);
          }} />
          <div className="dialog-actions">
            <button onClick={handleAddGameToCollection}>Add Game</button>
            <button onClick={closeAddGameDialog}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCollection;

