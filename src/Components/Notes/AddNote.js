import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const AddNoteForm = ({ getNotes }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [url, setUrl] = useState('');
  const [apiStatus, setApiStatus] = useState({
    status: 'idle',
    error: null,
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const authToken = Cookies.get('jwt_token');

    if (!authToken) {
      // Handle case where user is not authenticated
      Navigate('/login');
      return;
    }

    try {
      setApiStatus({ status: 'loading', error: null });

      const response = await fetch('http://localhost:3004/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log('Note added successfully:', data);
        setApiStatus({ status: 'success', error: null });
        // Clear the form fields after a successful submission
        setTitle('');
        setDescription('');
        setImageUrl('');
        setUrl('');
        // Refresh notes after adding a new one
        getNotes();
      } else {
        console.error('Failed to add note:', data);
        setApiStatus({ status: 'error', error: 'Failed to add note' });
      }
    } catch (error) {
      console.error('Error adding note:', error);
      setApiStatus({ status: 'error', error: 'Network error' });
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        label="Title"
        type="text"
        id='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        type="text"
        id='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Image URL"
        type="text"
        id='Image URL'
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="URL"
        type="text"
        id='URL'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary">
        Add Note
      </Button>

      {/* Display loading or error message based on the API status */}
      {apiStatus.status === 'loading' && <CircularProgress />}
      {apiStatus.status === 'error' && <p>Error: {apiStatus.error}</p>}
    </form>
  );
};

export default AddNoteForm;
