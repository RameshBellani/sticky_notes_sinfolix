import './App.css';
import ButtonAppBar from './Components/Home/switch'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import ProtectedRoute from './Components/ProtectorRoute/protector';
import Login from './Components/Login/Login';
import Notes from './Components/Notes/Notes';
import Register from './Components/SignIn/Register'
import Home from './Components/Home/Home';


const App = () => {
  const [theme, setTheme] = useState(false);
  
  const darkTheme = createTheme({
    palette: {
      mode: theme ? 'dark' : 'light',
    },
  });

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ButtonAppBar check={theme} change={() => setTheme(!theme)} />
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Notes/>} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};


      //<Route exact path="/login" component={Login} />
      //<ProtectedRoute exact path="/" component={Notes} />
     // <ProtectedRoute exact path="/register" component={Register} />
      //<Route path="/not-found" component={NotFound} />
      //<Redirect to="not-found" />


export default App;
