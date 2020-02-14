import React, { Fragment, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import Search from './Search';
import Filter from './Filter';
import Lists from '../Main/Lists';

const BrowMenu = props => {
  useState();

  const submitSearch = event => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <div className='cont menu bg-crm3' id='browser-menu'>
        <Search />
        <Filter />
        <Lists />
      </div>
    </Fragment>
  );
};

BrowMenu.prototypes = {
  search: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  search: state.search,
  filter: state.filter
});

export default BrowMenu;
