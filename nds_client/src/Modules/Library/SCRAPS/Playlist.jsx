// import React, { Fragment, useEffect } from 'react';
// import PropTypes from 'prop-types';
// //  REDUX
// import { connect } from 'react-redux';
// import { clrLibResult } from '../rdx_axn/axn_library';
// import { getPListNames } from '../rdx_axn/axn_playlist';
// //  COMPS
// import Trk from '../LibTrk';
// import Header from '../../NDS/Header';

// const Playlist = ({
//   library: { LibResult, loading },
//   clrLibResult,
//   getPListNames
// }) => {
//   useEffect(() => {
//     getPListNames();
//     clrLibResult();
//   }, []);

//   return (
//     <Fragment>
//       <Header title='Playlists' />
//       {LibResult && !loading ? (
//         <div className='stack'>
//           <ul className='stack'>
//             {LibResult.map(trk => (
//               <li key={trk.song_id}>
//                 <Trk trk={trk} />
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <h3>Select a Playlist</h3>
//       )}
//     </Fragment>
//   );
// };

// Playlist.propTypes = {};

// const mapStatToProps = state => ({
//   library: state.library,
//   playlist: state.playlist
// });

// export default connect(mapStatToProps, { clrLibResult, getPListNames })(
//   Playlist
// );
