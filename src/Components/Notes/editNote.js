import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  TextField,
} from '@mui/material';

const NoteItem = ({ note, onDelete, onEdit }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedDescription, setEditedDescription] = useState(note.description);

  const handleEditToggle = () => {
    setIsEditOpen(!isEditOpen);
  };

  const handleEdit = async () => {
    try {
      const authToken = Cookies.get('jwt_token');
      if (!authToken) {
        // Handle case where user is not authenticated
        return;
      }

      const response = await fetch(`http://localhost:3004/edit/${note._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
          imageUrl: note.imageUrl,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log('Note updated successfully:', data);
        // You might want to update the state or trigger a re-fetch of notes
        setIsEditOpen(false); // Close the edit form after editing
      } else {
        console.error('Failed to update note:', data);
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <li>
      <Card>
        <CardContent>
          {isEditOpen ? (
            <>
              <TextField
                label="Title"
                fullWidth
                required
                margin="normal"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <TextField
                label="Description"
                fullWidth
                required
                margin="normal"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </>
          ) : (
            <>
              <Typography variant="h5">{note.title}</Typography>
              <Typography variant="body2">{note.description}</Typography>
            </>
          )}
        </CardContent>
        <CardMedia component="img" height="140" image={note.imageUrl} alt="image" />
        <Button onClick={handleEditToggle}>
          {isEditOpen ? 'Cancel' : 'Edit'}
        </Button>
        {isEditOpen && <Button onClick={handleEdit}>Save</Button>}
        <Button onClick={() => onDelete(note._id)}>Delete</Button>
      </Card>
    </li>
  );
};

export default NoteItem;
