import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../User/rdx_axn/axn_auth';
//  COMPS
import CardApprove from '../../Main/CardApprove';
import Header from '../NDS/Header';
import { logout } from './rdx_axn/axn_auth';

const Profile = ({
  auth: { user, isAuthenticated, loading },
  logout,
  loadUser
}) => {
  useEffect(() => {
    loadUser();
  }, []);

  if (!isAuthenticated) {
    return <Redirect to='/library' />;
  }

  const title = `Hello! ${user[0].name}`;

  return (
    <Fragment>
      {user ? <Header title={title} /> : <Header title='Welcome, friend!' />}

      <section>
        <div className='row bg-pnk2'>
          <button onClick={logout}>Logout</button>
        </div>
      </section>

      <section></section>
      <div>
        <CardApprove />
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout, loadUser })(Profile);
