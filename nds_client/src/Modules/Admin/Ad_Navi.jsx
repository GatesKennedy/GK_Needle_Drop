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
  return (
    <nav className='bg-gry4' id='navi-cont'>
      <div className='center menu'>
        <Link to='/hello' className='center'>
          {' '}
          <ND_logo id='admin navi-logo' />
        </Link>
      </div>
      <div className='center main menu-head navi-links'>
        {' '}
        <Link to='/admin/strapi'>
          <div className='btn navi'>Strapi (CMS)</div>
        </Link>
        <Link to='/admin/library'>
          <div className='btn navi'>Library</div>
        </Link>
        <Link to='/admin/playlist'>
          <div className='btn navi'>Playlists</div>
        </Link>{' '}
        <Link to='/admin/account'>
          <div className='btn navi'>Accounts</div>
        </Link>
      </div>
    </nav>
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
