import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getSearched } from './rdx_axn/axn_filter';

import { ReactComponent as Find } from '../Main/assets/vex/Search.svg';

const Search = React.memo(props => {
  const [inputSearch, setInputSearch] = useState('');

  useEffect(() => {
    getSearched();
  }, [inputSearch]);

  return (
    <Fragment>
      <section className='cont  row search'>
        <Find className='menu-title row' id='vex-find' />
        <input
          type='text'
          value={inputSearch}
          onChange={event => setInputSearch(event.target.value)}
          className='menu-title row form'
        />
      </section>
    </Fragment>
  );
});

Search.propTypes = {};

export default Search;
