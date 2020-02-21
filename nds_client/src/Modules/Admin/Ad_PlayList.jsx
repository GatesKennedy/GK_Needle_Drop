import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
//  REDUX
import { connect } from 'react-redux';
import { getPlayAll, getPlaylist } from '../Library/rdx_axn/axn_playlist';
//  COMPS
import Navi from '../Admin/Ad_Navi';
import Trk from '../Library/TrkList';
import Browse from './Ad_Browse';
import Spinner from '../Notify/Spin';
import Ad_Navi from '../Admin/Ad_Navi';
import { selectPlist } from '../Library/rdx_axn/axn_library';

const Ad_Playlist = ({
  getPlaylist,
  getPlayAll,
  admin: { pListChosen, trkChosen },
  library: { trkData },
  playlist: { allListData, plistData, loading }
}) => {
  useEffect(() => {
    getPlayAll();
  }, []);

  return (
    <Fragment>
      <Ad_Navi />
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='row'>
            {/* ALLLIST */}
            <section id='ad-menu'>
              <div className='col bg-gry2 menu'>
                <p className=''>Choose Me</p>
                <div className=''>
                  {allListData.map(plist => (
                    <button
                      className='col'
                      onClick={() => getPlaylist(plist.list_name)}
                    >
                      {plist.list_name}
                    </button>
                  ))}
                </div>
              </div>
            </section>
            {/* PLAYLIST */}
            <section id='ad-playlist'>
              <p>Change Me</p>
              <div className='stack' id='brow-list'>
                {pListChosen ? (
                  <ul className='stack'>
                    {pListChosen.map(trk => (
                      <li key={trk.id}>
                        <Trk trk={trk} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h4>No Playlist Selected</h4>
                )}
              </div>
            </section>

            <section id='ad-browse'>
              <div className='col'>
                <Browse />
              </div>
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Ad_Playlist.propTypes = {};

const mapStateToProps = state => ({
  admin: state.admin,
  library: state.library,
  playlist: state.playlist
});

export default connect(mapStateToProps, { getPlaylist, getPlayAll })(
  Ad_Playlist
);
