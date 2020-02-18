import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
//  REDUX
import { connect } from 'react-redux';
import { getPlaylist } from './rdx_axn/axn_adLib';
//  COMPS
import Trk from '../Library/TrkList';

const Ad_PlayList = ({
  getPlaylist,
  admin: { pListSelect, trkChosen, loading }
}) => {
  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className='stack'>
          <p>Change Me</p>
          <div className='stack' id='brow-list'>
            {pListSelect ? (
              <ul className='stack'>
                {pListSelect.map(trk => (
                  <li key={trk.id}>
                    <Trk trk={trk} />
                  </li>
                ))}
              </ul>
            ) : (
              <h4>No Tracks found...</h4>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

Ad_PlayList.propTypes = {};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(mapStateToProps, { getPlaylist })(Ad_PlayList);
