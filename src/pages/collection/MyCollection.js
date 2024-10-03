import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchGames from '../../components/search/SearchGames';
import Grid from '../../components/items/Grid';
import Card from '../../components/items/Card';
import Loading from '../../components/loading/Loading'
import MyGameDetails from "./MyGameDetails"
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
  const [selectedGame, setSelectedGame] = useState(null);
  const [gamesInCollection, setGamesInCollection] = useState([]);
  const [selectedGameDetails, setSelectedGameDetails] = useState(null);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [showGamesInCollection, setShowGamesInCollection] = useState(true);
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('platform');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchCollections();
  }, []);

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

    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/collection-videogames/${collection.id}/videogames`);
    
      setGamesInCollection(response.data);

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

  const handleGameClick = (gameId) => {
    setSelectedGameId(gameId);
    setShowGamesInCollection(false);
  };

  const handleCloseGameDetails = () => {
    setSelectedGameId(null);
    setShowGamesInCollection(true);
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

  const closeGameDialog = () => {
    setIsGameDialogOpen(false);
    setSelectedGame(null);
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
    if (!selectedGame || selectedCollections.length === 0) return;

    const collectionId = selectedCollections[0].id;
    const gameId = selectedGame.id;

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/collection-videogames/${collectionId}/add-game`, { gameId });
      closeGameDialog();
      setGamesInCollection(prevGames => [...prevGames, response.data]);
    } catch (error) {
      console.error('Error adding game to collection:', error);
    }
  };

  const filterGames = gamesInCollection.filter((game) =>
    game.videogame.title.toLowerCase().includes(filter.toLowerCase())
  );

  const sortGames = (games) => {
    const sortedGames = [...games];
    sortedGames.sort((a, b) => {
      if (filterType === "platform") {
        return a.videogame.platform.name.localeCompare(b.videogame.platform.name);
      } else if (filterType === "developer") {
        return a.videogame.developer.name.localeCompare(b.videogame.developer.name);
      } else if (filterType === "publisher") {
        return a.videogame.publisher.name.localeCompare(b.videogame.publisher.name);
      } else if (filterType === "genre") {
        return a.videogame.genre.name.localeCompare(b.videogame.genre.name);
      }
      return 0;
    });

    return sortOrder === "asc" ? sortedGames : sortedGames.reverse();
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
            {loading && collections.length == 0 ? (
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
                  <h2>{collection.name}</h2>
                  {collection.description ? <p>{collection.description}</p> : <p>&nbsp;</p>}
                </div>
                <div className="collection-actions">
                  <button onClick={openGameDialog} className="add-game-button" title="Add new videogame">+</button>
                  <button onClick={() => {
                    setEditingCollectionId(selectedCollections[0].id);
                    setEditingCollectionName(selectedCollections[0].name);
                    setEditingCollectionDescription(selectedCollections[0].description || '');
                    setIsDialogOpen(true);
                  }} title="Edit current collection details">Edit</button>
                  <button onClick={removeCurrentCollection} className="add-game-button" title="Remove current collection">Remove</button>
                </div>
              </div>
            ))
          ) : (
            <h2>No collections selected</h2>
          )}
        </div>

        <div className="filter-section">
          <input type="text" className="search-input" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search games..." />
          <div className="filter-select">
            <select onChange={(e) => setFilterType(e.target.value)}>
              <option value="platform">Platform</option>
              <option value="developer">Developer</option>
              <option value="publisher">Publisher</option>
              <option value="genre">Genre</option>
            </select>
            <select onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Sort Ascending</option>
              <option value="desc">Sort Descending</option>
            </select>
          </div>
        </div>

        {showGamesInCollection && gamesInCollection.length > 0 ? (
          <Grid>
            {sortGames(filterGames).map(game => (
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
                onClick={() => handleGameClick(game.id)}
              />
            ))}
          </Grid>
        ) : gamesInCollection && loading ? (
            <Loading />
        ) : (showGamesInCollection && 
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
            setSelectedGame(game);
          }} />
          <div className="dialog-actions">
            <button onClick={handleAddGameToCollection}>Add Game</button>
            <button onClick={closeGameDialog}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCollection;

