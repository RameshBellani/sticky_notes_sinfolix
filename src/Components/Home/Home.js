import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
} from '@mui/material';


const Home = () => {
  return (
    <Container maxWidth="xl" style={{ textAlign: 'center', marginTop: '80px' }}>
<Typography variant="h4" gutterBottom sx={{ fontFamily: 'cursive', color: '#ff4081', fontWeight: 'bold' }}>
  Sticky Notes
</Typography>
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
      <Paper style={{ padding: '20px', textAlign: 'left' }}>
      <p style={{ marginTop: '20px' }}>
      Sticky notes are a versatile and popular tool for organizing ideas, tasks,
      and reminders. They are like digital paper notes that you can easily
      create, edit, and organize. Whether you need to jot down quick thoughts,
      create to-do lists, or capture important information, sticky notes provide
      a convenient and visually appealing way to keep track of your notes.
    </p>
        </Paper>
      </Grid>
    </Grid>
    
    <Button variant="contained" color="primary" style={{ margin: '10px' }}>
      <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>
        Sign In
      </Link>
    </Button>
    <Button variant="contained" color="primary" style={{ margin: '10px' }}>
      <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
        Login
      </Link>
    </Button>
  </Container>
  );
};

export default Home;
