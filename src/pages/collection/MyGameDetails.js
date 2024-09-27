import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MyGameDetails.css';

const MyGameDetails = ({ gameId, onClose }) => {
  const { collectionId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/collection-videogames/${gameId}`);

        setGameDetails(response.data);
        setEditedDetails(response.data);

      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGameDetails();
  }, [collectionId, gameId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/collection-videogames/${gameId}`, editedDetails);
      setGameDetails(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating game details:', error);
    }
  };

  const handleCancel = () => {
    setEditedDetails(gameDetails);
    setIsEditing(false);
  };

  const handleRemoveCurrentVideogame = async () => {

    const confirmDelete = window.confirm(`Are you sure you want to delete the collection "${editedDetails.videogame.title}"?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/collection-videogames/${editedDetails.id}`);
      
      onClose();
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };


  if (!gameDetails) {
    return <div>Loading...</div>;
  }

  const { videogame, digital, status, completed, timesCompleted, hoursPlayed, rating, notes, dateAdded, physicalStatus, purchaseDate } = gameDetails;

  return (
    <div className="game-details-container">
      <div className="header-container">
        <div className="close-icon" onClick={onClose} aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12 10.586l-4.293-4.293-1.414 1.414L10.586 12l-4.293 4.293 1.414 1.414L12 13.414l4.293 4.293 1.414-1.414L13.414 12l4.293-4.293-1.414-1.414z" />
          </svg>
        </div>
        {isEditing && <div className="editing-notice">Editing Video Game</div>}
        <div className="buttons-container">
          {!isEditing ? (
            <>
              <button onClick={handleEditToggle} className="edit-button">Edit</button>
              <button onClick={handleRemoveCurrentVideogame} className="edit-remove">Remove</button>
            </>
          ) : (
            <>
              <button onClick={handleCancel} className="cancel-button">Cancel</button>
              <button onClick={handleUpdate} className="save-button">Save</button>
            </>
          )}
        </div>
      </div>
      <h2>{videogame.title}</h2>

      <div>
        <label>Description:</label>
        <input
          type="text"
          value={videogame.overview || ""}
          readOnly
          className="readonly-input"
          placeholder="Description"
        />
      </div>
      <div>
        <label>Release Date:</label>
        <input
          type="date"
          value={videogame.releaseDate || ""}
          readOnly
          className="readonly-input"
          placeholder="Release Date"
        />
      </div>
      <div>
        <label>Platform:</label>
        <input
          type="text"
          value={videogame.platform?.name || ""}
          readOnly
          className="readonly-input"
          placeholder="Platform"
        />
      </div>
      <div>
        <label>Genre:</label>
        <input
          type="text"
          value={videogame.genre?.name || ""}
          readOnly
          className="readonly-input"
          placeholder="Genre"
        />
      </div>
      <div>
        <label>Developer:</label>
        <input
          type="text"
          value={videogame.developer?.name || ""}
          readOnly
          className="readonly-input"
          placeholder="Developer"
        />
      </div>
      <div>
        <label>Publisher:</label>
        <input
          type="text"
          value={videogame.publisher?.name || ""}
          readOnly
          className="readonly-input"
          placeholder="Publisher"
        />
      </div>

      <div>
        <label>Date Added:</label>
        <input
          type="date"
          value={dateAdded ? dateAdded.split('T')[0] : ""}
          readOnly
          className="readonly-input"
        />
      </div>

      {isEditing ? (
        <>
          <div>
            <label>Digital:</label>
            <input
              type="checkbox"
              name="digital"
              checked={editedDetails.digital}
              onChange={(e) => handleChange({ target: { name: 'digital', value: e.target.checked } })}
            />
          </div>
          <div>
            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={editedDetails.status || ""}
              onChange={handleChange}
              placeholder="Status"
            />
          </div>
          <div>
            <label>Completed:</label>
            <input
              type="checkbox"
              name="completed"
              checked={editedDetails.completed}
              onChange={(e) => handleChange({ target: { name: 'completed', value: e.target.checked } })}
            />
          </div>
          <div>
            <label>Times Completed:</label>
            <input
              type="number"
              name="timesCompleted"
              value={editedDetails.timesCompleted || ""}
              onChange={handleChange}
              placeholder="Times Completed"
            />
          </div>
          <div>
            <label>Hours Played:</label>
            <input
              type="number"
              name="hoursPlayed"
              value={editedDetails.hoursPlayed || ""}
              onChange={handleChange}
              placeholder="Hours Played"
            />
          </div>
          <div>
            <label>Rating:</label>
            <input
              type="number"
              name="rating"
              value={editedDetails.rating || ""}
              onChange={handleChange}
              placeholder="Rating"
            />
          </div>
          <div>
            <label>Notes:</label>
            <input
              type="text"
              name="notes"
              value={editedDetails.notes || ""}
              onChange={handleChange}
              placeholder="Notes"
            />
          </div>
          <div>
            <label>Physical Status:</label>
            <input
              type="text"
              name="physicalStatus"
              value={editedDetails.physicalStatus || ""}
              onChange={handleChange}
              placeholder="Physical Status"
            />
          </div>
          <div>
            <label>Purchase Date:</label>
            <input
              type="date"
              name="purchaseDate"
              value={editedDetails.purchaseDate ? editedDetails.purchaseDate.split('T')[0] : ""}
              onChange={handleChange}
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <label>Digital:</label>
            <input
              type="checkbox"
              checked={digital}
              readOnly
              className="readonly-input"
              placeholder="Digital"
            />
          </div>
          <div>
            <label>Status:</label>
            <input
              type="text"
              value={status || ""}
              readOnly
              className="readonly-input"
              placeholder="Status"
            />
          </div>
          <div>
            <label>Completed:</label>
            <input
              type="checkbox"
              checked={completed}
              readOnly
              className="readonly-input"
              placeholder="Completed"
            />
          </div>
          <div>
            <label>Times Completed:</label>
            <input
              type="number"
              value={timesCompleted || ""}
              readOnly
              className="readonly-input"
              placeholder="Times Completed"
            />
          </div>
          <div>
            <label>Hours Played:</label>
            <input
              type="number"
              value={hoursPlayed || ""}
              readOnly
              className="readonly-input"
              placeholder="Hours Played"
            />
          </div>
          <div>
            <label>Rating:</label>
            <input
              type="number"
              value={rating || ""}
              readOnly
              className="readonly-input"
              placeholder="Rating"
            />
          </div>
          <div>
            <label>Notes:</label>
            <input
              type="text"
              value={notes || ""}
              readOnly
              className="readonly-input"
              placeholder="Notes"
            />
          </div>
          <div>
            <label>Physical Status:</label>
            <input
              type="text"
              value={physicalStatus || ""}
              readOnly
              className="readonly-input"
              placeholder="Physical Status"
            />
          </div>
          <div>
            <label>Purchase Date:</label>
            <input
              type="date"
              value={purchaseDate ? purchaseDate.split('T')[0] : ""}
              readOnly
              className="readonly-input"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MyGameDetails;

