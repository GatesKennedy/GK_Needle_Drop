//  React
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../Modules/User/rdx_axn/axn_auth';
//  Asset
import { ReactComponent as ND_logo } from '../Modules/NDS/assets/vex/Logo_ND-header.svg';
import { ReactComponent as Cart } from '../Modules/NDS/assets/vex/Cart.svg';

const NavStd = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <nav className='bg-blu2' id='navi-cont'>
      <div className='center menu'>
        <Link to='/hello' className='center'>
          {' '}
          <ND_logo id='navi-logo' />
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
        <Cart className='menu-btn' />
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
          <div className='btn dark'>Profile</div>
        </Link>
        <Link to='/library'>
          <div className='btn dark'>Library</div>
        </Link>
        <Link to='/purchase'>
          <div className='btn dark'>Checkout</div>
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
