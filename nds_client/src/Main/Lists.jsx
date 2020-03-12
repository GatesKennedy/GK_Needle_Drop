import React, { Fragment } from 'react';
//  REDUX
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//  Comps
import { ReactComponent as Add } from '../Modules/NDS/assets/vex/Add.svg';

const Lists = ({ title, list, isAuth }) => {
  return (
    <Fragment>
      <section className='menu stack Lists' id='fitler-cont'>
        <div className='menu-head bg-blu2'>
          <h2 className='menu-title row'>MY LISTS</h2>
          <Add className='menu-title row  menu-btn' />
        </div>
        <div className='menu stack'>
          <p>Cool good songs</p>
          <p>project dundee</p>
          <p>sad fun songs</p>
          <p>Favorites</p>
        </div>
      </section>
    </Fragment>
  );
};

Lists.propTypes = {
  title: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  isAuth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Lists);
