//  React
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../User/rdx_axn/axn_auth';

const NavStd = ({ auth: { isAuthenticated, loading }, logout }) => {
  /*
  let btns = {
    btn1: {
      title: 'Needle Drop',
      link: '/Hello'
    },
    btn2: {
      title: 'Library',
      link: '/library'
    },
    btn3: {
      title: 'Checkout',
      link: '/ecomm'
    }
  };
  */

  const authLinks = (
    <nav className='navi light'>
      <div className='center menu'>
        <Link to='/hello' id='menuAOE' className='center'>
          {' '}
          <i className='dark fas fa-infinity' />
        </Link>
      </div>
      <div className='center main'>
        <Link to='/profile'>
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