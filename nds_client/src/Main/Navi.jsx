//  React
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../Modules/User/rdx_axn/axn_auth';
//  Asset
import { ReactComponent as LogoNd } from '../Modules/NDS/assets/vex/Logo_ND-header.svg';
import { ReactComponent as Cart } from '../Modules/NDS/assets/vex/Cart.svg';

const NavStd = ({ auth: { isAuthenticated, loading }, logout }) => {
  //  AUTH links
  const authLinks = (
    <nav className='bg-blu2' id='navi-cont'>
      <div className='center menu'>
        <Link to='/hello' className='center'>
          {' '}
          <LogoNd id='navi-logo' />
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

  //  GUEST links
  const guestLinks = (
    <nav className='bg-blu2' id='navi-cont'>
      <div className='center menu'>
        <Link to='/hello' className='center'>
          {' '}
          <LogoNd id='navi-logo' />
        </Link>
      </div>
      <div className='center main menu-head navi-links'>
        <Link to='/hello'>
          <div className='btn navi'>About</div>
        </Link>
        <Link to='/library'>
          <div className='btn navi'>Browse Music</div>
        </Link>
        <Link to='/playlists'>
          <div className='btn navi'>Playlists</div>
        </Link>
        <Link to='/user'>
          <div className='btn navi'>Login / Register</div>
        </Link>
      </div>
    </nav>
  );

  return <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>;
};
NavStd.propTypes = {
  //logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavStd);
