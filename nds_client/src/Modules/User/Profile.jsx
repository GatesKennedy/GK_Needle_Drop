import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//  COMPS
import CardApprove from '../../Main/CardApprove';
import Header from '../NDS/Header';
import { logout } from './rdx_axn/axn_auth';

const Profile = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  if (!isAuthenticated) {
    return <Redirect to='/library' />;
  }
  const title = 'Hello! ';

  const headTitle = title.concat(user[0].name);

  return (
    <Fragment>
      <Header title='Hello! ' text={user[0].name} />
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

export default connect(mapStateToProps, { logout })(Profile);
