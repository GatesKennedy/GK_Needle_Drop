//  React
import React, { Fragment, useEffect } from 'react';
//  REDUX
import { connect } from 'prop-types';
import PropTypes from 'prop-types';
import { getLibrary } from './rdx_axn/axn_library';
//  Comps
import Header from '../NDS/Header';
import Carol from '../../Main/Carol';
//import BrowList from './BrowList';
import TrkList from './TrkList';
import Search from './Search';
import Filter from './Filter';
import MyLists from '../Library/MyLists';
import Spinner from '../Notify/Spin';

//  Assets
import { ReactComponent as Add } from './assets/vex/menu-add.svg';

const Library = () => {
  // useEffect(() => {
  //   getLibrary();
  // }, []);

  return (
    <Fragment>
      <div className='bg-crm2'>
        <Header title='Browse Music' />
        <Carol />
        <div className='cont menu' id='brow-cont'>
          <div className='cont menu bg-crm3' id='browser-menu'>
            <Search />
            <Filter />
            <MyLists />
          </div>
          <TrkList />
        </div>
      </div>
    </Fragment>
  );
};

export default Library;
