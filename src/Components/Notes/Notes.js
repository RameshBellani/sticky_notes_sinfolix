import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AddNoteForm from "./AddNote";
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
  Button,
  Box,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";

const Notes = () => {
  const [notesdata, setNotesdata] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  //useEffect(() => {
  //  filterAndSearchNotes();
  //}, []);

  const getNotes = async () => {
    const authToken = Cookies.get("jwt_token");
    const apiUrl = "http://localhost:3004/";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const response = await fetch(apiUrl, options);

      if (response.ok) {
        const data = await response.json();
        setNotesdata(data);
      } else if (response.status === 500) {
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      const authToken = Cookies.get("jwt_token");

      const response = await fetch(`http://localhost:3004/delete/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log("Note deleted successfully:", data);

        getNotes();
      } else {
        console.error("Failed to delete note:", data);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = async (noteId) => {};

  const filterAndSearchNotes = () => {
    const filteredNotes = notesdata.filter((note) => {
      const matchesSearch = note.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    setFilteredNotes(filteredNotes);
  };

  return (
    <Container maxWidth="md">
      <div>
        <AddNoteForm getNotes={getNotes} />
        <Container
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
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
          <Button
            variant="contained"
            sx={{ marginLeft: "20px" }}
            onClick={() => filterAndSearchNotes()}
          >
            Search
          </Button>
        </Container>
        <Typography variant="h4" gutterBottom>
          Notes
        </Typography>

        <List sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {(searchTerm.trim() === "" ? notesdata : filteredNotes).map(
            (note) => (
              <ListItem
                key={note._id}
                sx={{ width: "calc(33.33% - 16px)", marginBottom: "20px" }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "200px",
                    width: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={note.imageUrl}
                    alt="image"
                    sx={{
                      borderRadius: "50%",
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      alignSelf: "center",
                      marginTop: "5px",
                    }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h5" component="div" gutterBottom>
                      {note.title}
                    </Typography>
                    <Tooltip
                      arrow
                      placement="top"
                      enterTouchDelay={0}
                      leaveTouchDelay={150}
                      title={note.description}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          maxHeight: "60px",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {note.description}
                      </Typography>
                    </Tooltip>
                    <Typography variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          maxHeight: "60px",
                          textOverflow: "ellipsis",
                        }}><a href={note.url} target="_blank" rel="noopener noreferrer">{note.title}</a></Typography>
                    <Box
                      mt="auto"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-end"
                    >
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
                    </Box>
                  </CardContent>
                </Card>
              </ListItem>
            )
          )}
        </List>
      </div>
    </Container>
  );
};

export default Notes;
