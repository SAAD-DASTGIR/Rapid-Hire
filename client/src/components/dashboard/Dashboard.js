import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getAppliedJobs, getFavoriteJobs } from '../../actions/job';
import { getUserInterviews } from '../../actions/interview';
import Sidebar from '../layout/Sidebar';
import { Spinner } from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { DashboardActions } from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import AppliedJobs from './AppliedJobs';
import FavoriteJobs from './FavoriteJobs';
import ScheduledInterview from './ScheduledInterview';
import './dashboard.css'; // Import the CSS file

const Dashboard = ({
  interview,
  getAppliedJobs,
  getFavoriteJobs,
  getUserInterviews,
  job,
  getCurrentProfile,
  auth,
  profile,
  deleteAccount,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfile();
      await getAppliedJobs();
      await getFavoriteJobs();
      await getUserInterviews();
    };

    fetchData();
  }, [getCurrentProfile, getAppliedJobs, getFavoriteJobs, getUserInterviews]);

  return (
    <>
      <Sidebar />

      {profile.loading && profile.profile === null ? (
        <Spinner />
      ) : (
        <div className="custom-dashboard-container">
          <div>
            <h1 className="custom-heading">Dashboard</h1>
            <div className="custom-user-info">
              {auth.user && (
                <div className="custom-user-info-left">
                  <div className="custom-welcome-container">
                    <p className="custom-welcome-text">
                      Welcome{' '}
                      <span className='capitalize'>
                        {auth.user && auth.user.name}!!!
                      </span>
                    </p>
                    {profile.profile !== null ? (
                      auth.user && <DashboardActions id={auth.user._id} />
                    ) : (
                      <div>
                        <p className='no-profile'>You have not created a profile.</p>
                        <Link to='/create-profile' className="custom-action-btn">
                          Create Profile
                        </Link>
                      </div>
                    )}
                  </div>
                  <img className="custom-avatar" src={auth.user.avatar} alt='' />
                </div>
              )}

              {profile.profile && (
                <Link to={`/profile/${auth.user._id}`} className="custom-action-btn">
                  View Profile
                </Link>
              )}
            </div>
            <div className="custom-stats-container">
              <HashLink smooth to='#favorite_jobs' className="custom-stat-box">
                <p className="custom-stat-heading">Favorite Jobs</p>
                <div>
                  <i className='custom-stat-icon fa fa-heart' aria-hidden='true'></i>
                  <p className='custom-stat-count'>{job.favorite_jobs.length}</p>
                </div>
              </HashLink>
              <HashLink smooth to='#applied_jobs' className="custom-stat-box">
                <p className="custom-stat-heading">Applied Jobs</p>
                <div>
                  <i className='custom-stat-icon fa fa-briefcase' aria-hidden='true'></i>
                  <p className='custom-stat-count'>{job.applied_jobs.length}</p>
                </div>
              </HashLink>
              <HashLink smooth to='#scheduled_interviews' className="custom-stat-box">
                <p className="custom-stat-heading">Scheduled Interviews</p>
                <div>
                  <i className='custom-stat-icon fa fa-video-camera' aria-hidden='true'></i>
                  <p className='custom-stat-count'>{interview.interviews.length}</p>
                </div>
              </HashLink>
              <div className="custom-stat-box">
                <p className="custom-stat-heading">Job Experiences</p>
                <div>
                  <i className='custom-stat-icon fa fa-briefcase' aria-hidden='true'></i>
                  <p className='custom-stat-count'>1</p>
                </div>
              </div>
            </div>

            {profile.profile !== null ? (
              <Fragment>
                <Experience experience={profile.profile.experience} />
                <Education education={profile.profile.education} />
                <AppliedJobs jobs={job.applied_jobs} />
                <ScheduledInterview interviews={interview.interviews} user={auth.user} />
                <FavoriteJobs jobs={job.favorite_jobs} />
                <div>
                  <button onClick={() => deleteAccount()} className="custom-action-btn">
                    Delete Account
                  </button>
                </div>
              </Fragment>
            ) : (
              null
            )}
          </div>
        </div>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getAppliedJobs: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  job: state.job,
  interview: state.interview,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getAppliedJobs,
  getFavoriteJobs,
  getUserInterviews,
})(Dashboard);
