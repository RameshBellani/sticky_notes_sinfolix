import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { TextField, Button, Typography, Paper, Grid, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get('jwt_token');
    if (authToken !== undefined) {
      navigate('/');
    }
  }, [navigate]);

  const onChangeEmail = event => {
    setEmail(event.target.value);
  };

  const onChangePassword = event => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = authToken => {
    Cookies.set('jwt_token', authToken, { expires: 30, path: '/', sameSite: 'None', secure: true });
    navigate('/');
  };

  const onSubmitFailure = errorMsg => {
    console.log(errorMsg);
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };
  

  const submitForm = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:3004/auth/login';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
  
      console.log('Login response:', data);
  
      if (data.status === "ok") {
        const authToken = data.data.authToken;
        const user = data.data.existUser;
  
        
        if (user) {
          const userId = user._id;
          console.log('User ID:', userId);
          console.log('User Email:', user.email);
          
  
          
          onSubmitSuccess(authToken);
        } else {
          console.log('User not found.');
          
          onSubmitFailure('Invalid email or password. Please try again.');
        }
      } else {
        console.log('Login failed.');
        
        onSubmitFailure(data.err);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      onSubmitFailure('Something went wrong. Please try again.');
    }
  };
  
  


  /*const submitForm = async event => {
    event.preventDefault();
    const userDetails = { email, password };
    const url = 'http://localhost:3004/auth/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.response === true) {
        onSubmitSuccess(data.data.authToken);
      } else {
        onSubmitFailure(data.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      onSubmitFailure('Something went wrong. Please try again.');
    }
  };*/

  const renderPasswordField = () => (
    <TextField
      type="password"
      label="Password"
      id="password"
      className="password-input-field"
      value={password}
      onChange={onChangePassword}
      fullWidth
      required
      margin="normal"
    />
  );

  const renderUsernameField = () => (
    <TextField
      type="text"
      label="Email"
      id="email"
      className="username-input-field"
      value={email}
      onChange={onChangeEmail}
      fullWidth
      required
      margin="normal"
    />
  );

  return (
    <Grid container justifyContent="center" style={{ marginTop: '80px' }}>
      <Grid item xs={12} sm={6}>
        <Box display="flex" justifyContent="center">
          <img
            src="https://res.cloudinary.com/dwffepf9q/image/upload/v1699961393/h7fr1l4jjofnojussgfs.png"
            alt="website logo"
            style={{ width: '60%' }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display="flex" justifyContent="center">
          <Paper elevation={6} style={{ padding: '20px', maxWidth: '600px', marginTop:'60px' }}>
            <form onSubmit={submitForm}>
              <Typography style={{fontSize:'30px', textAlign:'center'}}>Login</Typography>
              <div>{renderUsernameField()}</div>
              <div>{renderPasswordField()}</div>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
              {showSubmitError && (
                <Typography variant="caption" color="error" style={{ marginTop: '10px' }}>
                  *{errorMsg}
                </Typography>
              )}
              <Link to="/register" style={{marginLeft:'auto'}}>Go to Register</Link>
            </form>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );

};

export default Login;
