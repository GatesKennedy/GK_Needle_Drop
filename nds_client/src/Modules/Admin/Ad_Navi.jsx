//  React
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../User/rdx_axn/axn_auth';
//  Asset
import { ReactComponent as ND_logo } from '../NDS/assets/vex/Logo_ND-header.svg';

const NavStd = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <nav className='bg-gry4' id='navi-cont'>
      <div className='center menu'>
        <Link to='/hello' className='center'>
          {' '}
          <ND_logo id='admin navi-logo' />
        </Link>
      </div>
      <div className='center main menu-head navi-links'>
        {' '}
        <Link to='/hello'>
          <div className='btn navi'>ABOUT</div>
        </Link>
        <Link to='/library'>
          <div className='btn navi'>BROWSE MUSIC</div>
        </Link>
        <Link to='/playlists'>
          <div className='btn navi'>PLAYLISTS</div>
        </Link>{' '}
        <Link to='/profile'>
          <div className='btn navi'>ACCOUNT</div>
        </Link>
        <Link to='/purchase'>
          <div className='btn navi'>CONTACT</div>
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
