import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login, companyLogin } from '../../actions/auth';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link as MuiLink,
  Grid,
  Box,
  Typography,
  Paper,
  createTheme,
  ThemeProvider,
} from '@mui/material';

function Login({ login, isAuthenticated, isCompanyAuthenticated, companyLogin }) {
  const [formData, setFormData] = useState({
    type: 'user',
    email: '',
    password: '',
  });

  const { type, email, password } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === 'company') {
      companyLogin({ email, password });
    } else {
      login({ email, password });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitchType = () => {
    setFormData({ ...formData, type: type === 'user' ? 'company' : 'user' });
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  if (isCompanyAuthenticated) {
    return <Navigate to="/company-dashboard" />;
  }

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh', mt: 0.1 }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              {type === 'company' ? 'Company Login' : 'User Login'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0.1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => handleChange(e)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                sx={{ mt: 1, mb: 2 }}
                onClick={handleSwitchType}
              >
                {type === 'user' ? 'Switch to Company Login' : 'Switch to User Login'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <MuiLink href="#" variant="body2">
                    Forgot password?
                  </MuiLink>
                </Grid>
                <Grid item>
                  <MuiLink href="#" variant="body2">
                    {type === 'user'
                      ? "Don't have an account? Sign Up"
                      : "Don't have a company account? Sign Up"}
                  </MuiLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  companyLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isCompanyAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isCompanyAuthenticated: state.auth.isCompanyAuthenticated,
});

export default connect(mapStateToProps, { login, companyLogin })(Login);
