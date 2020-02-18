import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
//  REDUX
import { connect } from 'react-redux';
import { getPlaylist } from './rdx_axn/axn_adLib';
//  COMPS
import Trk from '../Library/TrkList';
import Spinner from '../Notify/Spin';

const Ad_Playlist = ({
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
        <Fragment>
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
        </Fragment>
      )}
    </Fragment>
  );
};

Ad_Playlist.propTypes = {};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(mapStateToProps, { getPlaylist })(Ad_Playlist);
