import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Navbar({ auth: { isAuthenticated, isCompanyAuthenticated, isAdminAuthenticated, loading }, logout }) {
  const renderAuthLinks = () => (
    <Fragment>
      <Button color="inherit" onClick={logout}>
        <i className='fas fa-sign-out-alt' />
        <span className='hide-sm'>Logout</span>
      </Button>
    </Fragment>
  );

  const renderGuestLinks = () => (
    <Fragment>
      <Button color="inherit" component={Link} to="/register">Register</Button>
      <Button color="inherit" component={Link} to="/login">Login</Button>
    </Fragment>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1289a7', color: 'white' }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          <Link className='flex items-center' to="/">
            <i className="fas fa-code"></i>
            <Box ml={1} fontSize="2xl" fontWeight="bold">
              RAPID HIRE
            </Box>
          </Link>
        </Typography>
        {!loading && (
          <Fragment>
            <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
              {isAuthenticated && renderAuthLinks()}
              {isCompanyAuthenticated && renderAuthLinks()}
              {isAdminAuthenticated && renderAuthLinks()}
              {!isCompanyAuthenticated && !isAuthenticated && !isAdminAuthenticated && renderGuestLinks()}
            </Box>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { logout })(Navbar);
