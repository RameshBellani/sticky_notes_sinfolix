
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AddNoteForm from './AddNote';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  List,
  ListItem,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  CircularProgress,
} from '@mui/material';
import {SearchIcon} from '@mui/icons-material'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const Notes = () => {
  const [notesdata, setNotesdata] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    // Apply search and filter logic when notesdata changes
    filterAndSearchNotes();
  }, [notesdata, searchTerm, filterTerm]);

  const getNotes = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    const authToken = Cookies.get('jwt_token');
    const apiUrl = 'http://localhost:3004/';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const response = await fetch(apiUrl, options);

      if (response.ok) {
        const data = await response.json();
        setNotesdata(data);
        setApiStatus(apiStatusConstants.success);
      } else if (response.status === 500) {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      const authToken = Cookies.get('jwt_token');
      if (!authToken) {
        // Handle case where user is not authenticated
        return;
      }

      const response = await fetch(`http://localhost:3004/delete/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log('Note deleted successfully:', data);
        // Update the state or trigger a re-fetch of notes
        getNotes();
      } else {
        console.error('Failed to delete note:', data);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = async (noteId) => {
    // Add your edit logic here
  };

  const filterAndSearchNotes = () => {
    // Apply filter and search logic to notesdata
    const filteredNotes = notesdata.filter((note) => {
      // Implement your filter conditions here
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterTerm === '' || note.category === filterTerm;

      return matchesSearch && matchesFilter;
    });

    setFilteredNotes(filteredNotes);
  };

  return (
    <Container maxWidth="md">
      <div>
        <AddNoteForm getNotes={getNotes} />
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Filter"
          variant="outlined"
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
        />
        <Typography variant="h4" gutterBottom>
          Notes
        </Typography>

        <List sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {filteredNotes.map((note) => (
            <ListItem key={note._id} sx={{ width: 'calc(33.33% - 16px)', marginBottom: '20px' }}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '60%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={note.imageUrl}
                  alt="image"
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h5" component="div" gutterBottom>
                    {note.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {note.description}
                  </Typography>
                  <div style={{ marginTop: 'auto' }}>
                    <IconButton
                      color="primary"
                      aria-label="Edit"
                      onClick={() => handleEdit(note._id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      aria-label="Delete"
                      onClick={() => handleDelete(note._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </div>
    </Container>
  );
};

export default Notes;

