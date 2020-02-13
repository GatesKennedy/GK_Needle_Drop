import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//  COMPS
import CardApprove from '../Main/CardApprove';
import Login from './Login';
import Register from './Register';

const Profile = props => {
  return (
    <div>
      <CardApprove />
    </div>
  );
};

Profile.propTypes = {};

export default Profile;
