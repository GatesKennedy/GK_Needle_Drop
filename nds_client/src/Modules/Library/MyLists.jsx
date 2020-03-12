import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCollapse from 'react-collapsed';
//  REDUX
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//  Comps
import { ReactComponent as Add } from '../NDS/assets/vex/Add.svg';
import Spinner from '../Notify/Spin';

const Lists = ({ isAuth, lists }) => {
  const [isOpen, setOpen] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });

  return (
    <Fragment>
      <section
        className='menu stack Lists'
        id='mylist-cont'
        {...getToggleProps({
          onClick: () => setOpen(oldOpen => !oldOpen)
        })}
      >
        <div className='menu-head bg-blu2'>
          <h2 className='menu-title row'>MY LISTS</h2>
          <Add className='menu-title row  menu-btn' />
        </div>
      </section>

      <section {...getCollapseProps()}>
        {isAuth ? (
          <div className='menu-title'>My Lists</div>
        ) : (
          <div className='menu-title stack center'>
            <h5 className='stack'>login to view your playlists</h5>
            <Link to='/login' className='stack center'>
              <div className=' btn'>Login</div>
            </Link>
          </div>
        )}
      </section>
    </Fragment>
  );
};

Lists.propTypes = {
  lists: PropTypes.object.isRequired,
  isAuth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Lists);
