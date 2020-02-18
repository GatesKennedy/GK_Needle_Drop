import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlayAll } from './rdx_axn/axn_adLib';
//  Comps
import Navi from './Ad_Navi';
import Playlist from './Ad_Playlist';
import Spinner from '../Notify/Spin';
import Collapse from '../../Main/Collapse';
//  Assets
import { ReactComponent as Add } from '../NDS/assets/vex/Add.svg';

const Admin = ({ getPlayAll, admin: { pListAll, loading } }) => {
  useEffect(() => {
    getPlayAll();
  }, []);

  console.log(pListAll);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Navi />
          <Playlist />
          <div className='stack'>
            <p>Control Me</p>
            <div className='stack'>
              {pListAll.map(plist => (
                <button className='stack'>{plist.list_name}</button>
              ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Admin.propTypes = {
  getPlayAll: PropTypes.func.isRequired,
  pListAll: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(mapStateToProps, { getPlayAll })(Admin);
