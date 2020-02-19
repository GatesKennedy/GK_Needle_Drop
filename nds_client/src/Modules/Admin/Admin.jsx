import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//  Comps
import Navi from './Ad_Navi';
import Playlist from './Ad_Playlist';
import Browse from './Ad_Browse';
import Spinner from '../Notify/Spin';
import Collapse from '../../Main/Collapse';
//  Assets
import { ReactComponent as Add } from '../NDS/assets/vex/Add.svg';

const Admin = ({ admin: { loading } }) => {
  return (
    <Fragment>
      <Navi />
      <div className='row'>
        <div className='col'>
          <Playlist />
        </div>
        <div className='col'>
          <Browse />
        </div>
      </div>
    </Fragment>
  );
};

Admin.propTypes = {};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(mapStateToProps)(Admin);
