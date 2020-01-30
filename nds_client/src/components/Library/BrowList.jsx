import React, { Fragment, useEffect, useState } from 'react';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLibrary, getArtists } from './rdx_axn/axn_library';
//  Comps
import Trk from './Trk';
import Spinner from '../Notify/Spin';

const BrowList = ({ getLibrary, library: { libData, loading } }) => {
  useEffect(() => {
    getLibrary();
  }, []);

<<<<<<< HEAD
  const Trks =
    libData.length > 0 ? (
      libData.map(trk => {
        return (
          <li>
            <Trk
              key={trk.id}
              song={trk.song}
              artist={trk.artist}
              time={trk.time}
            />
          </li>
        );
      })
    ) : (
      <h4> No Tracks found</h4>
    );
  return (
    <Fragment>
      <div className='stack-list' id='trk-list'>
        {Trks}
      </div>
=======
  const TrackList = props => {
    const Trks = props.libData.map(trk => {
      return (
        <li>
          <Trk
            key={trk.id}
            song={trk.song}
            artist={trk.artist}
            time={trk.time}
          />
        </li>
      );
    });
    return <ul>{Trks}</ul>;
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='stack-list' id='trk-list'>
            {libData ? <Trk libData={libData} /> : <h4>No Tracks found...</h4>}
          </div>
        </Fragment>
      )}
>>>>>>> dev_gk
    </Fragment>
  );

  // return (
  //   <Fragment>
  //     {loading ? (
  //       <Spinner />
  //     ) : (
  //       <Fragment>
  //         <h1>Track Party</h1>
  //         <div className='stack-list' id='trk-list'>
  //           {libData.length > 0 ? (
  //             <Trk libData={libData} />
  //           ) : (
  //             <h4>No Tracks found...</h4>
  //           )}
  //         </div>
  //       </Fragment>
  //     )}
  //   </Fragment>
  // );
};

BrowList.propTypes = {
  getLibrary: PropTypes.func.isRequired,
  library: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  library: state.library
});

export default connect(mapStateToProps, { getLibrary })(BrowList);
