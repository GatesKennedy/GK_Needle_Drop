//  React
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../User/rdx_axn/axn_auth';
//  Asset
import { ReactComponent as ND_logo } from './assets/vex/ND_logo1.svg';
import { ReactComponent as Cart } from './assets/vex/Cart.svg';

const NavStd = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <nav className='bg-blu2' id='navi-cont'>
      <div className='center menu'>
        <Link to='/hello' id='menuAOE' className='center'>
          {' '}
          <ND_logo />
        </Link>
      </div>
      <div className='center main menu-head navi-links'>
        {' '}
        <Link to='/hello'>
          <btn className='btn '>ABOUT</btn>
        </Link>
        <Link to='/library'>
          <btn className='btn '>BROWSE MUSIC</btn>
        </Link>
        <Link to='/purchase'>
          <btn className='btn '>PLAYLISTS</btn>
        </Link>{' '}
        <Link to='/profile'>
          <btn className='btn '>ACCOUNT</btn>
        </Link>
        <Link to='/purchase'>
          <btn className='btn '>CONTACT</btn>
        </Link>
        <Cart className='menu-btn' />
      </div>
      <div className='center menu'>
        <Link to='/library'>
          <a onClick={logout} href='#!'>
            <i name='logout' className='dark fas fa-sign-out-alt' />
          </a>
        </Link>
      </div>
    </nav>
  );

  const guestLinks = (
    <nav className='navi dark'>
      <div className='center menu'>
        <Link to='/hello' id='menuAOE' className='center'>
          {' '}
          <i className='fas fa-infinity' />
        </Link>
      </div>
      <div className='center menu'>
        <Link to='/login'>
          <btn className='btn dark'>Profile</btn>
        </Link>
        <Link to='/library'>
          <btn className='btn dark'>Library</btn>
        </Link>
        <Link to='/purchase'>
          <btn className='btn dark'>Checkout</btn>
        </Link>
      </div>
      <div className='center menu'>
        <Link to='/login' className=''>
          {' '}
          <i className='fas fa-wave-square' />
        </Link>
      </div>
    </nav>
  );

  return (
    <Fragment>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Fragment>
  );
};

NavStd.propTypes = {
  //logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavStd);
