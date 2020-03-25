// import React, { Fragment, useEffect } from 'react';
// //  REDUX
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { getLibData } from './rdx_axn/axn_library';
// //import { getLibTraits, getFiltered } from './rdx_axn/axn_filter';
// //  Comps
// import Trk from './Trk';
// import Spinner from '../Notify/Spin';

// const BrowList = ({ getLibData, library: { libData, loading } }) => {
//   useEffect(() => {
//     getLibData();
//   }, []);

//   return (
//     <Fragment>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <Fragment>
//           <div className='stack' id='brow-list'>
//             {libData ? (
//               <ul className='stack'>
//                 {libData.map(trk => (
//                   <li key={trk.id}>
//                     <Trk trk={trk} />
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <h4>No Tracks found...</h4>
//             )}
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// BrowList.propTypes = {
//   getLibData: PropTypes.func.isRequired,
//   library: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   library: state.library
// });

// export default connect(mapStateToProps, {
//   getLibData
// })(BrowList);
