import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlayAll } from './rdx_axn/axn_adLib';
import { selectPlist } from '../Library/rdx_axn/axn_library';
//  Compsl\
import Navi from './Ad_Navi';
import Playlist from './Ad_Playlist';
import Browse from './Ad_Browse';
import Spinner from '../Notify/Spin';
import Collapse from '../../Main/Collapse';
//  Assets
import { ReactComponent as Add } from '../NDS/assets/vex/Add.svg';

const Admin = ({ getPlayAll, admin: { pListAll, pListSelect, loading } }) => {
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
          <div className='row'>
            <div className='col bg-gry2 menu'>
              <p className=''>Choose Me</p>
              <div className=''>
                {pListAll.map(plist => (
                  <button className='col'>{plist.list_name}</button>
                ))}
              </div>
            </div>
            <div className='col'>
              <Playlist />
            </div>
            <div className='col'>
              <Browse />
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

export default connect(mapStateToProps, { getPlayAll, selectPlist })(Admin);
