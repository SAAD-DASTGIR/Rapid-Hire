import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { logout } from '../../actions/auth';
import React, { Fragment } from 'react';
// ... (other imports)

import './sidebar.css';

function Sidebar({ auth: { isAuthenticated, isCompanyAuthenticated, isAdminAuthenticated, user, loading, company }, logout }) {
  const location = useLocation();

  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        {user && (
          <Link to={`/profile/${user._id}`}>
            <span> My Profile</span>
          </Link>
        )}
      </li>
      <li>
        <Link to="/edit-cv">
          <span>Build CV</span>
        </Link>
      </li>
      <li>
        <Link to="/jobs">
          <span>Jobs</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <span>Posts</span>
        </Link>
      </li>
      <li>
        <Link to="/profiles">
          <span>Profiles</span>
        </Link>
      </li>
      <li>
        <Link to="/video">
          <span>Interviews</span>
        </Link>
      </li>
    </ul>
  );

  const companyAuthLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <span> Dashboard</span>
        </Link>
      </li>
      <li>
        {company && (
          <Link to={`/company-profile/${company._id}`}>
            <span> My Profile</span>
          </Link>
        )}
      </li>
      <li>
        <Link to="/post-job">
          <span>Post Job</span>
        </Link>
      </li>
      <li>
        <Link to="/profiles">
          <span>Profiles</span>
        </Link>
      </li>
      <li>
        <Link to="/resumes">
          <span>Resumes</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Profiles</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  const adminLinks = (
    <ul>
      <li>
      </li>
    </ul>
  );

  return (
    isAuthenticated || isCompanyAuthenticated ? (
      <div className='sidebar'>
        <div>
          {!loading && (
            <Fragment>
              {isAuthenticated && authLinks}
              {isCompanyAuthenticated && companyAuthLinks}
              {isAdminAuthenticated && adminLinks}
              {!isCompanyAuthenticated && !isAuthenticated && !isAdminAuthenticated && guestLinks}
            </Fragment>
          )}
        </div>
      </div>
    ) : (
      null
    )
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
});

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { logout })(Sidebar);