import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  

  const onChangeUsername = event => {
    setUsername(event.target.value);
  };

  const onChangeEmail = event => {
    setEmail(event.target.value);
  };

  const onChangePassword = event => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = () => {
    setErrorMsg("User Added")
  }

  const onSubmitFailure = errorMsg => {
    console.log(errorMsg);
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };
  
  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:3004/auth/register';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
  
      console.log('Login response:', data);
  
      if (response.status === 200) {
        onSubmitSuccess()
        navigate('/login');
        } 
    } catch (error) {
      console.error('Error submitting form:', error);
      onSubmitFailure('Something went wrong. Please try again.');
    }
  };
  
  


  const renderPasswordField = () => (
    <TextField
      type="password"
      label="Password"
      id="password"
      fullWidth
      required
      margin="normal"
      value={password}
      onChange={onChangePassword}
      variant="outlined"
    />
  );

  const renderUsernameField = () => (
    <TextField
      type="text"
      label="Username"
      id="username"
      fullWidth
      required
      margin="normal"
      value={username}
      onChange={onChangeUsername}
      variant="outlined"
    />
  );

  const renderEmailField = () => (
    <TextField
      type="text"
      label="Email"
      id="email"
      fullWidth
      required
      margin="normal"
      value={email}
      onChange={onChangeEmail}
      variant="outlined"
    />
  );

  return (
    <Container maxWidth="sm" style={{marginTop:'80px'}}>
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={submitForm} style={{ width: '100%' }}>
          <div style={{ marginBottom: '15px' }}>{renderUsernameField()}</div>
          <div style={{ marginBottom: '15px' }}>{renderEmailField()}</div>
          <div style={{ marginBottom: '15px' }}>{renderPasswordField()}</div>
          <Button type="submit" style={{width:'100%'}} variant="contained" color="primary">
            Signin
          </Button>
          {showSubmitError && (
            <Typography variant="caption" color="error" style={{ marginTop: '10px' }}>
              *{errorMsg}
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
