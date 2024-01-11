import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { register, companyRegister } from '../../actions/auth';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

function Register({ setAlert, register, isAuthenticated, isCompanyAuthenticated, companyRegister }) {
  const [formData, setFormData] = useState({
    type: 'user',
    name: '',
    email: '',
    password: '',
    password2: '',
    companyName: '',
  });

  const [showCompanyFields, setShowCompanyFields] = useState(false);
  const navigate = useNavigate();

  const { type, name, email, password, password2, companyName } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password does not match', 'danger');
    } else {
      if (type === 'company') {
        await companyRegister({ name: companyName, email, password });
      } else {
        await register({ name, email, password });
        navigate('/create-profile');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleRegistrationType = () => {
    setShowCompanyFields((prev) => !prev);
    setFormData((prevFormData) => ({
      ...prevFormData,
      type: prevFormData.type === 'user' ? 'company' : 'user',
    }));
  };

  if (isAuthenticated || isCompanyAuthenticated) {
    return isCompanyAuthenticated ? <Navigate to="/company-dashboard" /> : <Navigate to="/dashboard" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {type === 'company' ? 'Company Registration' : 'User Sign Up'}
        </Typography>
        <Box component="form" noValidate onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
          {showCompanyFields && (
            <TextField
              autoComplete="off"
              name="companyName"
              required
              fullWidth
              id="companyName"
              label="Company Name"
              autoFocus
              value={companyName}
              onChange={(e) => handleChange(e)}
              sx={{ mb: 2 }} // Add margin-bottom for spacing
            />
          )}
          {!showCompanyFields && (
            <TextField
              autoComplete="off"
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
              value={name}
              onChange={(e) => handleChange(e)}
              sx={{ mb: 2 }} // Add margin-bottom for spacing
            />
          )}
          <TextField
            autoComplete="off"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
            sx={{ mb: 2 }} // Add margin-bottom for spacing
          />
          <TextField
            autoComplete="off"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleChange(e)}
            sx={{ mb: 2 }} // Add margin-bottom for spacing
          />
          <TextField
            autoComplete="off"
            fullWidth
            name="password2"
            label="Confirm Password"
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => handleChange(e)}
            sx={{ mb: 2 }} // Add margin-bottom for spacing
          />
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions, and updates via email."
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Button onClick={toggleRegistrationType} fullWidth variant="outlined" sx={{ mt: 1, mb: 2 }}>
            {type === 'user' ? 'Switch to Company Registration' : 'Switch to User Registration'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  companyRegister: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isCompanyAuthenticated: state.auth.isCompanyAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register, companyRegister })(Register);
