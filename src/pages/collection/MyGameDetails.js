import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Icon from '../../components/icon/Icon'; 
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
        console.log(response.data);
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
          <Icon iconName="CloseXIcon" />
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

      <div className="row">
        <div className="column">
          <label>Description:</label>
          <input
            type="text"
            value={videogame.overview || ""}
            readOnly
            className="readonly-input txt-collection-detail"
            placeholder="Description"
            disabled={!isEditing}
          />
        </div>
        <div className="column">
          <label>Release Date:</label>
          <input
            type="date"
            value={videogame.releaseDate ? videogame.releaseDate.split('T')[0] : ""}
            readOnly
            className="readonly-input txt-collection-detail"
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <label>Platform:</label>
          <input
            type="text"
            value={videogame.platform?.name || ""}
            readOnly
            className="readonly-input txt-collection-detail"
            disabled={!isEditing}
          />
        </div>
        <div className="column">
          <label>Developer:</label>
          <input
            type="text"
            value={videogame.developer?.name || ""}
            readOnly
            className="readonly-input txt-collection-detail"
            disabled={!isEditing}
          />
        </div>
        <div className="column">
          <label>Genre:</label>
          <input
            type="text"
            value={videogame.genre?.name || ""}
            readOnly
            className="readonly-input txt-collection-detail"
            disabled={!isEditing}
          />
        </div>
        <div className="column">
          <label>Date Added:</label>
          <input
            type="date"
            value={dateAdded ? dateAdded.split('T')[0] : ""}
            readOnly
            className="readonly-input txt-collection-detail"
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="separator" />

      <div className="row">
        <div className="column checkbox-column">
          <label>
            <input
              type="checkbox"
              name="completed"
              checked={isEditing ? editedDetails.completed : completed}
              onChange={(e) => {
                if (isEditing) {
                  handleChange({ target: { name: 'completed', value: e.target.checked } });
                }
              }}
              className="txt-collection-detail"
              disabled={!isEditing}
            />
            Completed
          </label>
        </div>
        {(isEditing && editedDetails.completed) || (!isEditing && completed) ? (
          <div className="column">
            <label>Times Completed:</label>
            <input
              type="number"
              name="timesCompleted"
              value={editedDetails.timesCompleted || ""}
              onChange={handleChange}
              className="txt-collection-detail"
              placeholder="Times Completed"
              disabled={!isEditing}
            />
          </div>
        ) : null}
        <div className="column">
          <label>Hours Played:</label>
          <input
            type="number"
            name="hoursPlayed"
            value={isEditing ? editedDetails.hoursPlayed || "" : hoursPlayed || ""}
            onChange={isEditing ? handleChange : null}
            placeholder="Hours Played"
            className="txt-collection-detail"
            disabled={!isEditing}
          />
        </div>
        <div className="column">
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={isEditing ? editedDetails.rating || "" : rating || ""}
            onChange={isEditing ? handleChange : null}
            placeholder="Rating"
            className="txt-collection-detail"
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="row">
        <div className="column checkbox-column">
          <label>
            <input
              type="checkbox"
              name="digital"
              checked={isEditing ? editedDetails.digital : digital}
              onChange={(e) => {
                if (isEditing) {
                  handleChange({ target: { name: 'digital', value: e.target.checked } });
                }
              }}
              className="txt-collection-detail"
              disabled={!isEditing}
            />
            Digital
          </label>
        </div>
        {(!isEditing && !digital) || (isEditing && !editedDetails.digital) ? (
          <div className="column">
            <label>Times Completed:</label>
            <input
              type="number"
              name="timesCompleted"
              onChange={handleChange}
              className="txt-collection-detail"
              placeholder="Times Completed"
              disabled={!isEditing}
            />
          </div>
        ) : null}
        <div className="column">
          <label>Purchase Date:</label>
          <input
            type="date"
            name="purchaseDate"
            value={isEditing ? editedDetails.purchaseDate ? editedDetails.purchaseDate.split('T')[0] : "" : purchaseDate ? purchaseDate.split('T')[0] : ""}
            onChange={isEditing ? handleChange : null}
            className="txt-collection-detail"
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <label>Status:</label>
          <textarea
            name="status"
            value={isEditing ? editedDetails.status || "" : status || ""}
            onChange={isEditing ? handleChange : null}
            placeholder="Status"
            rows={3}
            className="txt-collection-detail textarea-collection-detail"
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <label>Notes:</label>
          <textarea
            name="notes"
            value={isEditing ? editedDetails.notes || "" : notes || ""}
            onChange={isEditing ? handleChange : null}
            placeholder="Notes"
            rows={3}
            className="txt-collection-detail textarea-collection-detail"
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default MyGameDetails;

